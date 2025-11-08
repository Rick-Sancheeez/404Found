const modal = document.querySelector('.order-modal');
const closeBtn = document.querySelector('.order-close');

closeBtn.addEventListener('click', () => modal.style.display = 'none');
modal.addEventListener('click', (e) => {
	if (e.target === modal) modal.style.display = 'none';
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		modal.style.display = 'none';
	}
});

body.addEventListener('click', (e) => {
	document.querySelector('.order-modal').classList.add('hidden');
})