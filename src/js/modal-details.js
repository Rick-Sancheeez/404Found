import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function addEventDetailButtons() {
  const detailButtons = document.querySelectorAll(".our-furniture .furniture-items .item .details-button");

  detailButtons.forEach(button => {
    button.addEventListener("click", async () => {
      const id = button.dataset.id;
      const itemData = await getFurnitureById(id);
      if (itemData) openModal(itemData);
    });
  });
}

async function getFurnitureById(id) {
  const url = `https://furniture-store-v2.b.goit.study/api/furnitures/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    iziToast.error({
      position: "topRight",
      message: "Не вдалося отримати дані про товар 😕",
    });
    return null;
  }
}

function openModal(item) {
  const modal = document.querySelector(".modal");
  const body = modal.querySelector(".modal-body");
  const closeBtn = modal.querySelector(".modal-close");
  const overlay = modal.querySelector(".modal-overlay");

  const colorsHTML = item.color?.map(color => `
    <button class="color-dot" style="background-color:${color}"></button>
  `).join("") || "";

  const thumbnails = item.images?.slice(1).map(img => `
    <img src="${img}" alt="${item.name}" class="thumb">
  `).join("") || "";

  body.innerHTML = `
    <div class="modal-inner">
      <div class="modal-left">
        <img src="${item.images?.[0] || ''}" alt="${item.name}" class="main-image">
        <div class="thumbnail-list">${thumbnails}</div>
      </div>
      <div class="modal-right">
        <h2 class="title">${item.name}</h2>
        <p class="category">${item.category}</p>
        <p class="price">${item.price.toLocaleString("uk-UA")} грн</p>
        <div class="rating">★★★★☆</div>

        <p class="color-label">Колір</p>
        <div class="color-list">${colorsHTML}</div>

        <p class="description">${item.description}</p>
        <p class="size"><strong>Розміри:</strong> ${item.size || "—"}</p>

        <button class="order-btn">Перейти до замовлення</button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");

  const closeModal = () => modal.classList.add("hidden");
  closeBtn.onclick = closeModal;
  overlay.onclick = closeModal;

  const mainImg = body.querySelector(".main-image");
  body.querySelectorAll(".thumb").forEach(thumb => {
    thumb.addEventListener("click", () => (mainImg.src = thumb.src));
  });
}
