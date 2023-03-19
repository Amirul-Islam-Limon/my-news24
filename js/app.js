async function loadNewsMenu(){
const res = await fetch("https://openapi.programming-hero.com/api/news/categories");
const data = await res.json();
showDataOnNewsMenu(data.data.news_category);
}


function showDataOnNewsMenu(newsData){
    const div = document.getElementById("menu-container")
    newsData.forEach(news => {
        const ul = document.createElement("ul");
        ul.classList.add("d-flex");
        ul.innerHTML = `
            <li onclick="showIndividualDetails(${news.category_id})">${news.category_name}</li>
        `;
        div.appendChild(ul);
    });
}

// show individual News one by one

function showIndividualDetails(id){
    async function loadNewsIndividualData(){
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`);
        const data = await res.json();
        const newsCategory = data.data;
        console.log(data);
        
        const newsCategoryContainer = document.getElementById("new-category-container");
        newsCategoryContainer.innerHTML = "";
        newsCategory.forEach(news=>{
            const div = document.createElement("div");

            div.classList.add("card");
            div.classList.add("mb-3")
            div.innerHTML = `
                <div id="" class="row g-0 mt-3">
                <div class="col-md-3">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-9">
                <div class="card-body">
                    <h4 onclick="showNewsDetails('${news._id}')" class="card-title showNewsDetails" data-bs-toggle="modal" data-bs-target="#staticBackdrop">${news.title}</h4>
                    
                    <p class="card-text">${news.details.slice(0,300)}${"..."}</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                </div>

                <div class="d-flex justify-content-between">
                  <div class="d-flex px-4 align-items-center">
                    <img src="${news.author.img}" class="rounded-circle pb-1" width="60" alt="">
                    <div class="px-2">
                      <div>
                        <p class="mb-0">${news.author.name}</p>
                      </div>
                      <div>
                        <p><small>${news.author.published_date}</small></p>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center pe-5">
                    <p><i class="fa-solid fa-eye"></i></p>
                    <p class="ps-1">${news.total_view? news.total_view + "K":"Data not found"}</p>
                  </div>
                  <div class="d-flex align-items-center mx-3 fs-3">
                    <p><i onclick="showNewsDetails('${news._id}')" class="fa-solid fa-arrow-right showNewsDetails" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i></p>
                  </div>
                </div>
                </div>
            </div>
            `;
            newsCategoryContainer.appendChild(div);
            console.log(news.total_view);
        })
        document.getElementById("new-show-count-input-field").value = `${newsCategory.length} Item founds in your category`;
    }

    loadNewsIndividualData();
}

// Show News Details on modals

function showNewsDetails(id){
  const modalSection = document.getElementById("modal-section-news");
  modalSection.innerHTML = " ";
  fetch(`https://openapi.programming-hero.com/api/news/${id}`)
  .then(res=>res.json())
  .then(data => showNewsDetailsOnModal(data.data[0]));
}

function showNewsDetailsOnModal(news){
  console.log(news.title);
  const  modalSection = document.getElementById("modal-section-news");
    modalSection.innerHTML = `
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>
  `;
}


loadNewsMenu();
showIndividualDetails(01);