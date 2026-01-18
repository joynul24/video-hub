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
        btn.classList.add("btn", "btn-active", "border-none")
        btn.textContent = item.category;
        cagetoryBtnContainer.append(btn)
    });
};


const loadAllVideos = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos`);
    const data = await res.json();
    displayAllVideos(data.videos)
};


const displayAllVideos = (videos) => {
    const videosContainer = document.getElementById("videos-container");
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