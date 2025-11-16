// Open modal window - 
// document.querySelector('.order-modal').classList.remove('hidden')
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const modal = document.querySelector('.order-modal');
const form = document.querySelector('.order-form');
const closeBtn = document.querySelector('.order-close');

let pageTitle = '';
if (modal && !modal.classList.contains('hidden')) {
	pageTitle = document.title;
	document.title = "Замовити зворотний зв’язок.";
	document.body.style.overflow = 'hidden';
}

closeBtn.addEventListener('click', () => closeModal());

let isDownOnBackdrop = false;

modal.addEventListener('mousedown', e => {
	isDownOnBackdrop = (e.target === modal);
});

modal.addEventListener('mouseup', e => {
	if (e.target === modal && isDownOnBackdrop) {
		closeModal();
	}
	isDownOnBackdrop = false;
});

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') closeModal();
});

function closeModal() {
	modal.classList.add('hidden');
	document.title = pageTitle;
	document.body.style.overflow = '';
	if ('selectedFurnitureId' in localStorage) {
		localStorage.removeItem('selectedFurnitureId');
	};
	if ('selectedFurnitureColor' in localStorage) {
		localStorage.removeItem('selectedFurnitureColor');
	};
}

form.addEventListener('submit', async e => {
	e.preventDefault();

	const nameInput = form.elements.name;
	const phoneInput = form.elements.phone;
	const commentInput = form.elements.comment;

	let valid = true;
	[nameInput, phoneInput, commentInput].forEach(input => {
		input.classList.remove('error');
		if (!input.value.trim()) {
			input.classList.add('error');
			valid = false;
		}
	});

	const phonePattern = /^\+?\d{10,15}$/;
	if (!phonePattern.test(phoneInput.value.trim())) {
		phoneInput.classList.add('error');
		iziToast.error({
			title: 'Помилка',
			message: 'Введіть правильний номер телефону у форматі +380XXXXXXXXX',
			position: 'center',
			timeout: 3000,
		});
		return;
	}

	const comment = commentInput.value.trim();
	const commentPattern = /^[a-zA-Zа-яА-ЯїЇіІєЄґҐ0-9\s.,!?'"()\-:;]{5,300}$/u;

	if (!commentPattern.test(comment)) {
		commentInput.classList.add('error');
		iziToast.error({
			title: 'Помилка',
			message: 'Коментар має містити від 5 до 300 символів і не містити заборонених знаків.',
			position: 'center',
			timeout: 3000,
		});
		return;
	}

	if (!valid) {
		iziToast.error({
			title: 'Помилка',
			message: 'Заповніть усі обовʼязкові поля!',
			position: 'center',
			timeout: 3000,
		});
		return;
	}

	const demo_product_id = '682f9bbf8acbdf505592ac36';
	const demo_color = '#1212ca';

	const payload = {
		name: nameInput.value.trim(),
		phone: phoneInput.value.trim(),
		modelId: localStorage.getItem('selectedFurnitureId') || demo_product_id,
		color: localStorage.getItem('selectedFurnitureColor') || demo_color,
		comment: comment,
	};

	try {
		const response = await fetch('https://furniture-store-v2.b.goit.study/api/orders', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const errorData = await response.json();
			iziToast.error({
				title: 'Помилка сервера',
				message: errorData.message || 'Не вдалося зробити замовлення.',
				position: 'center',
				timeout: 3000,
			});
			return;
		}

		iziToast.success({
			title: 'Успішно!',
			message: 'Вашу заявку відправлено.',
			position: 'center',
			timeout: 3000,
		});

		form.reset();
		closeModal();

	} catch (error) {
		iziToast.error({
			title: 'Помилка',
			message: error.message || 'Не вдалося відправити заявку',
			position: 'topRight',
		});
	}
});
