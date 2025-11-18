import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {addEventDetailButtons} from "./modal-details";

let page = 1;
let totalPages = 0;
let per_page = 8;
let query = "";

let furnitureGallery = document.querySelector(".our-furniture .furniture-items");
let categoryList = document.querySelector(".our-furniture .options");
const showMoreButton = document.querySelector(".our-furniture .show-more");
let loader = document.querySelector(".loader");
let loaderOfCategoty = document.querySelector(".loader-category");

loader.style.display = "none";
loaderOfCategoty.style.display = "none";

categoryList.addEventListener("click", async (event) => {
    furnitureGallery.innerHTML = "";
    showMoreButton.style.display = "none";
    loaderOfCategoty.style.display = "block";
    const option = event.target.closest(".option");
    if (!option) return; 

    document.querySelectorAll(".our-furniture .options .option").forEach(li => li.classList.remove("active"));
    option.classList.add("active");

    query = option.dataset.category;

    page = 1;
    const data = await getImagesByQuery(query, page);

    const items = data.furnitures;
    //furnitureGallery.innerHTML = "";
    loaderOfCategoty.style.display = "none";
    createGallery(items);   

    totalPages = Math.ceil(data.totalItems / per_page);

    showMoreButton.style.display = page < totalPages ? "block" : "none";
});

showMoreButton.addEventListener("click", async () => {
    showMoreButton.style.display = "none";
    loader.style.display = "block"; 

    showMoreButton.classList.add("active");
    page++;
    const data = await getImagesByQuery(query, page);
    const items = data.furnitures;
    createGallery(items);


    showMoreButton.classList.remove("active");
    showMoreButton.style.display = page < totalPages ? "block" : "none";

    loader.style.display = "none";
    
});


window.addEventListener("DOMContentLoaded", async () => {
    let furnitureType = document.querySelector(".our-furniture .options .option:first-child");
    furnitureType.classList.add("active");

    query = furnitureType.dataset.category;
    let data = await getImagesByQuery(query, page);

    let items = data.furnitures;
    furnitureGallery.innerHTML = "";
    createGallery(items);

    totalPages = Math.ceil(data.totalItems / per_page);
});

async function getImagesByQuery(query, page) {

    const url = query === "All furniture"
      ? `https://furniture-store-v2.b.goit.study/api/furnitures?page=${page}&limit=${per_page}`
      : `https://furniture-store-v2.b.goit.study/api/furnitures?category=${query}&page=${page}&limit=${per_page}`;

        try {
            let response = await axios.get(url);
            return response.data;
        } catch(error) {
            iziToast.info({
                position: 'topRight',
                message: error.message,
            });
            return {furnitures: [],
                totalItems: 0,
            };
        }
    
}


function createGallery (items) {
    let markUp = items.map((item) => {
        return `<li class="item" data-id="${item._id}">
        <div class="item-image-container">
            <img src="${item.images[0]}"/>
        </div>
            <p class="item-name">${item.name}</p>
            <div class="color-options">
                <button class="color" type="button" data-color = "${item.color[0]}" data-img="${item.images[0]}"></button>
                <button class="color" type="button" data-color = "${item.color[1]}" data-img="${item.images[1]}"></button>
                <button class="color" type="button" data-color = "${item.color[2]}" data-img="${item.images[2]}"></button>
            </div>

            <p class="item-price"><span>${item.price}</span> грн</p>
            <button class="details-button" data-id="${item._id}">Детальніше</button>
        
        </li>`
    }).join("");
    
    furnitureGallery.insertAdjacentHTML("beforeend", markUp);

    let colorButtons = document.querySelectorAll(".our-furniture .furniture-items .item .color-options .color");

    colorButtons.forEach((button)=> {
        button.style.backgroundColor = button.dataset.color;
    });

    attachColorSwitch();
    addEventDetailButtons ();
}

function attachColorSwitch() {
    const colorButtons = document.querySelectorAll(".color-options .color");

    colorButtons.forEach(button => {
        button.addEventListener("click", () => {
            const imgSrc = button.dataset.img;
            const item = button.closest(".item");
            const imgElement = item.querySelector(".item-image-container img");

            imgElement.src = imgSrc;
        });
    });
}

//.our-furniture .furniture-items .item .details-button

