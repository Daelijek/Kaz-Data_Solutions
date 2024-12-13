//! Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".btn-close");

// Close modal function
const closeModal = function () {
	modal.classList.remove("show");
	overlay.classList.remove("show");
	setTimeout(() => {
		modal.classList.add("hidden");
		overlay.classList.add("hidden");
	}, 300);
};

// Open modal function with dynamic content
const openModal = function (title, price, description, imageSrc) {
	modal.querySelector(".modal_title").textContent = title;
	modal.querySelector(".modal_price").textContent = price;
	modal.querySelector(".modal_description").textContent = description;
	modal.querySelector("img").src = imageSrc; // Set the image source

	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
	setTimeout(() => {
		modal.classList.add("show");
		overlay.classList.add("show");
	}, 10);
};

// Event listeners for each "Order" button
document.querySelectorAll(".card_btn").forEach(button => {
	button.addEventListener("click", function () {
		const title = this.getAttribute("data-title");
		const price = this.getAttribute("data-price");
		const description = this.getAttribute("data-description");
		const imageSrc = this.getAttribute("data-image"); // Get the image source
		openModal(title, price, description, imageSrc);
	});
});

// Event listeners for close actions
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && modal.classList.contains("show")) {
		closeModal();
	}
});

//! Pointing on map
// Координаты для каждого города (примерные значения)
const cityCoordinates = {
	astana: { x: 890, y: 115 }, // Координаты для Astana
	almaty: { x: 978, y: 305 }, // Координаты для Almaty
	karaganda: { x: 910, y: 140 } // Координаты для Karaganda
};

const citySelect = document.getElementById('city');
const point = document.getElementById('point');

// Функция для обновления положения указателя
function updatePointerPosition(city) {
	if (cityCoordinates[city]) {
		const { x, y } = cityCoordinates[city];
		point.style.left = `${x}px`;
		point.style.top = `${y}px`;

		// Плавно показываем указатель
		point.style.display = 'block'; // Делает элемент доступным для отображения
		setTimeout(() => { point.style.opacity = 1; }, 10); // Задержка перед началом анимации для плавного появления
	}
}

// Обработчик события выбора города
citySelect.addEventListener('change', function () {
	const selectedCity = this.value.toLowerCase(); // Получаем выбранный город

	if (selectedCity === 'city') {
		// Плавно скрываем указатель
		point.style.opacity = 0; // Устанавливаем прозрачность в 0 для скрытия
		setTimeout(() => { point.style.display = 'none'; }, 500); // Скрываем элемент после окончания анимации
	} else {
		updatePointerPosition(selectedCity); // Обновляем позицию указателя
	}
});



//! Search function
document.getElementById("search_button").addEventListener("click", function () {
	// Получаем значение из поля ввода
	const query = document.getElementById("search_flowers").value.toLowerCase();

	// Получаем список результатов
	const resultsList = document.getElementById("results_list");

	// Получаем все карточки
	const items = resultsList.getElementsByClassName("card");

	// Скрываем все элементы списка
	for (let i = 0; i < items.length; i++) {
		items[i].style.display = "none"; // Скрываем элемент
	}

	// Проверяем, есть ли совпадения и показываем их
	let found = false; // Флаг для отслеживания совпадений
	for (let i = 0; i < items.length; i++) {
		const title = items[i].getElementsByClassName("card_title")[0].textContent.toLowerCase();
		if (title.includes(query)) {
			items[i].style.display = "block"; // Показываем элемент
			found = true; // Устанавливаем флаг совпадения
		}
	}

	// Если ничего не найдено, можно сделать дополнительные действия
	if (!found) {
		console.log("Ничего не найдено");
		alert("No matching products found!")
	}
});