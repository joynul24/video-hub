

const loadCategorybtns = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories");
    const data = await res.json();
    const categorys = data.categories;
    categorys.forEach(item => {
        const cagetoryBtnContainer = document.getElementById("category-btns");
        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-active", "border-none")
        btn.innerText = item.category;
        cagetoryBtnContainer.append(btn)
    });
}



loadCategorybtns()