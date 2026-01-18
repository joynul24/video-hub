function convertSeconds(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}hr ${minutes} min ${seconds} sec ago`
}



const loadCategorybtns = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
    const data = await res.json();
    const categories = data.categories;
    const cagetoryBtnContainer = document.getElementById("category-btns");
    categories.forEach(item => {
        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-active", "border-none");
        btn.textContent = item.category;

        btn.addEventListener("click", () => {
            document.querySelectorAll("#category-btns button").forEach(b => {
                b.style.backgroundColor = "";
                b.style.color = "";
            });
            btn.style.backgroundColor = "#FF1F3D";
            btn.style.color = "white"; loadVideosByCategory(item.category_id);
        });

        cagetoryBtnContainer.append(btn)
    });
};


const loadAllVideos = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`);
    const data = await res.json();
    displayAllVideos(data.videos)
};



const handleAllVideoBtn = async () => {
    document.querySelectorAll("#category-btns button").forEach(b => {
        b.style.backgroundColor = "";
        b.style.color = "";
    });

    const allBtn = document.getElementById("allVideosBtn");
    allBtn.style.backgroundColor = "#FF1F3D";
    allBtn.style.color = "white";

    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/videos");
    const data = await res.json();
    displayAllVideos(data.videos);
};




const loadVideosByCategory = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${categoryId}`);
    const data = await res.json();
    displayAllVideos(data.category);
};


const displayAllVideos = (videos) => {
    const videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = "";

    if (!videos || videos.length === 0) {
    const noDataDiv = document.createElement("div");
    noDataDiv.classList.add("flex", "flex-col", "justify-center", "items-center", "gap-8", "mt-30")
    noDataDiv.innerHTML = `
     <img 
      src="./assets/error-img.png" 
      alt="no data" 
      class="w-24 h-24 md:w-40 md:h-40 object-contain"
    />
    <h2 class="text-lg sm:text-2xl md:text-3xl font-bold text-gray-700">
      Oops!! Sorry, There is no content here
    </h2>
        `
        videosContainer.appendChild(noDataDiv);
        videosContainer.classList.remove("grid");
        return;
    } else {
        videosContainer.classList.add("grid");
    }

    videos.forEach(video => {
        const div = document.createElement("div");
        div.classList.add("card")
        div.innerHTML = `
   <figure class="relative h-[200px]">
    <img class="h-full w-full object-cover"
      src="${video.thumbnail}"
      alt="Video" />
     <span> ${video.others.posted_date ? `<span class="absolute right-2 bottom-2 bg-black text-white p-2 rounded text-sm">${convertSeconds(video.others?.posted_date)}</span>` : ""} </span>
  </figure>
  <div class="flex gap-2 py-5">
     <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" alt="Profile Picture"/>
     <div class="flex flex-col gap-1 md:gap-2">
       <h3 class="font-bold">${video.title}</h3>
       <p class="flex items-center gap-1 text-gray-600">${video.authors[0].profile_name} <span> ${video.authors[0].verified ? `<img src="./assets/verifed.png" alt="verifed-icon"/>` : ""} </span></p>
       <p class="text-gray-600">${video.others.views} Views</p>
     </div>
  </div>
       `
        videosContainer.append(div);
    });
};



loadCategorybtns();
loadAllVideos();