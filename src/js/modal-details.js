// modal-details.js

// Посилання на контейнер, куди буде рендеритися модалка (з index.html)
const modalArea = document.querySelector('.modal-wrapper');

// --- API ФУНКЦІЇ ---

async function getFurnitureById(id) {
    const url = `https://furniture-store-v2.b.goit.study/api/furnitures/${id}`;
    try {
        let response = await axios.get(url);
        return response.data;
    } catch(error) {
        iziToast.error({
            position: 'topRight',
            message: `Помилка завантаження деталей товару: ${error.message}`,
        });
        return null;
    }
}

// --- ФУНКЦІЇ МОДАЛЬНОГО ВІКНА ---

export function addEventDetailButtons() {
    // Ця функція експортується, щоб викликатися у script.js після рендерингу галереї
    const detailButtons = document.querySelectorAll(".details-button");

    detailButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const itemId = event.target.dataset.id; 

            // Отримуємо повні дані про товар
            const furnitureDetails = await getFurnitureById(itemId);

            if (furnitureDetails) {
                // Рендеримо та показуємо модальне вікно
                renderModal(furnitureDetails);
            }
        });
    });
}

function renderModal(item) {
    // Створюємо розмітку модального вікна, використовуючи дані з 'item'
    const modalMarkup = `
        <div class="modal-backdrop" id="productModal">
            <div class="modal-content" data-product-id="${item._id}">
                <button class="close-button" id="closeModalButton">&times;</button>

                <div class="product-details">
                    <div class="image-column">
                        <div class="main-image-container">
                            <img src="${item.images[0]}" alt="${item.name}" class="main-image" id="modalMainImage">
                        </div>
                        <div class="additional-images">
                            ${item.images[1] ? `<div class="image-thumb"><img src="${item.images[1]}" alt="Додаткове зображення 1" class="thumb-image"></div>` : ''}
                            ${item.images[2] ? `<div class="image-thumb"><img src="${item.images[2]}" alt="Додаткове зображення 2" class="thumb-image"></div>` : ''}
                        </div>
                    </div>

                    <div class="product-info-column">
                        <h1 class="product-title">${item.name}</h1>
                        <p class="product-category">${item.type}</p>
                        <p class="product-price">${item.price} грн</p>
                        <div class="product-rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                        
                        <div class="color-options">
                            <p class="color-label">Колір</p>
                            <div class="color-swatches" id="modalColorOptions">
                                ${item.color.slice(0, 3).map((colorValue, index) => {
                                    return `<div 
                                        class="color-swatch ${index === 0 ? 'selected' : ''}" 
                                        data-color-id="${item._id}-${index}" 
                                        data-img-index="${index}"
                                        style="background-color: ${colorValue};"
                                    ></div>`;
                                }).join('')}
                            </div>
                        </div>

                        <p class="product-description">${item.description || "Класичний диван з м'якими подушками та високою спинкою, ідеальний для сімейного відпочинку. Оббивка з якісної зносостійкої тканини."}</p>
                        <p class="product-size"><span class="size-label">Розміри:</span> ${item.dimensions || '280х80х85'}</p>

                        <button class="order-button" id="submitOrderButton">Перейти до замовлення</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Додаємо розмітку до DOM та показуємо модальне вікно
    modalArea.innerHTML = modalMarkup;
    const modal = document.getElementById('productModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Додаємо обробники подій для новоствореного контенту
    attachModalHandlers(item);
}

/* function attachModalHandlers(item) {
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('closeModalButton');
    const colorSwatches = modal.querySelectorAll('.color-swatch');
    const mainImage = document.getElementById('modalMainImage');
    const submitBtn = document.getElementById('submitOrderButton');

    // Логіка закриття модального вікна
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modalArea.innerHTML = ''; // Очищаємо контейнер
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Логіка перемикання кольору та зображення
    let selectedColorId = colorSwatches[0] ? colorSwatches[0].dataset.colorId : null;

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            // Оновлення стилів
            colorSwatches.forEach(s => s.classList.remove('selected'));
            swatch.classList.add('selected');
            
            // Оновлення зображення
            const imgIndex = parseInt(swatch.dataset.imgIndex);
            if (item.images[imgIndex]) {
                mainImage.src = item.images[imgIndex];
            }

            // Зберігання ID для відправки на сервер
            selectedColorId = swatch.dataset.colorId;
        });
    });
    
    // Обробник кнопки замовлення
    submitBtn.addEventListener('click', () => {
        const orderData = {
            product_id: item._id,
            product_name: item.name,
            color_id: selectedColorId, 
            price: item.price,
        };

        console.log('Дані для відправки на сервер:', orderData);
        // Тут має бути ваш POST запит на сервер з orderData
        
        iziToast.success({
            position: 'topRight',
            message: 'Замовлення відправлено до консолі!',
        });
        
        closeModal();
    });
} */

    function attachModalHandlers(item) {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    // Безпечніше шукати елементи всередині модального вікна
    const closeBtn = modal.querySelector('#closeModalButton');
    const colorSwatches = modal.querySelectorAll('.color-swatch');
    const mainImage = modal.querySelector('#modalMainImage');
    const submitBtn = modal.querySelector('#submitOrderButton');

    // -------------------------------
    // 🔹 Закриття модального вікна
    // -------------------------------
    const closeModal = () => {
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.style.display = 'none';
            modal.classList.remove('fade-out');
            document.body.style.overflow = 'auto';
            if (typeof modalArea !== 'undefined') modalArea.innerHTML = ''; // очищення, якщо потрібно
        }, 150); // плавне закриття
    };

    // Закриття при кліку на ✖ або поза вікном
    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) closeModal();
    });

    // -------------------------------
    // 🎨 Робота з кольорами
    // -------------------------------
    let selectedColorElement = modal.querySelector('.color-swatch.selected');
    let selectedColorId = selectedColorElement?.dataset.colorId || null;
    let selectedColorValue = selectedColorElement?.style.backgroundColor || null;

    colorSwatches.forEach((swatch) => {
        swatch.addEventListener('click', () => {
            modal.querySelector('.color-swatch.selected')?.classList.remove('selected');
            swatch.classList.add('selected');

            // Зміна головного зображення
            const imgIndex = parseInt(swatch.dataset.imgIndex);
            if (item.images?.[imgIndex]) {
                mainImage.src = item.images[imgIndex];
            }

            // Оновлення вибраного кольору
            selectedColorId = swatch.dataset.colorId;
            selectedColorValue = swatch.style.backgroundColor;
        });
    });

    // -------------------------------
    // 🛒 Кнопка "Перейти до замовлення"
    // -------------------------------
    submitBtn?.addEventListener('click', () => {
        if (!selectedColorValue) {
            alert("Будь ласка, оберіть колір перед продовженням!");
            return;
        }

        // Зберігаємо дані у LocalStorage
        localStorage.setItem('selectedFurnitureId', item._id);
        localStorage.setItem('selectedFurnitureColor', selectedColorValue);

        // Закриваємо поточне модальне вікно
        closeModal();

        // Відкриваємо модальне вікно замовлення
        const orderModal = document.querySelector('.order-modal');
        if (orderModal) {
            orderModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            console.error("Елемент '.order-modal' не знайдено.");
        }

        /*
        // Приклад структури для подальшого POST-запиту:
        const orderData = {
            product_id: item._id,
            product_name: item.name,
            color_id: selectedColorId,
            price: item.price,
        };
        */
    });
}
