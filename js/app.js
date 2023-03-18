async function loadNewsMenu(){
const res = await fetch("https://openapi.programming-hero.com/api/news/categories");
const data = await res.json();
showDataOnNewsMenu(data.data.news_category);
console.log(data.data.news_category);
}


function showDataOnNewsMenu(newsData){
    // const div = document.getElementById("menu-container")
    console.log(newsData)
    // const ul = document.createElement("ul");
    // newsData.forEach(news => {
    //     console.log(news.category_name);
    //     ul.innerHTML = `
    //         <li>${news.category_name}</li>
    //     `;
    //     div.appendChild(ul);
    // });

    const div = document.getElementById("menu-container")
    newsData.forEach(news => {
        const ul = document.createElement("ul");
        ul.classList.add("d-flex");
        console.log(news);
        ul.innerHTML = `
            <li onclick="showIndividualDetails()">${news.category_name}</li>
        `;
        div.appendChild(ul);
    });
}

function showIndividualDetails(){
    console.log("amir, jau ghumao");
}


loadNewsMenu();