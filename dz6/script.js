"use strict";
// 1. Доработать модуль корзины.
// a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
// b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида
const catalog = {
  catalogBlock: null,
  cart: null,
  list: [
    {
      id_product: 123,
      product_name: "Ноутбук",
      price: 45600,
    },
    {
      id_product: 456,
      product_name: "Мышка",
      price: 1000,
    },
    {
      id_product: 245,
      product_name: "Клавиатура",
      price: 1500,
    },
  ],

  /**
   * Инициальзация каталога.
   * @param catalogBlockClass - класс блока каталога
   * @param cart - корзина
   */
  init(catalogBlockClass, cart) {
    this.catalogBlock = document.querySelector(`.${catalogBlockClass}`);
    this.cart = cart;
    this.render();
    this.addEventHandlers();
  },

  /**
   * Рендер каталога
   */
  render() {
    if (this.getCatalogListLength() > 0) {
      this.renderCatalogList();
    } else {
      this.renderEmptyCatalog();
    }
  },

  /**
   * Добавляем обработку событий
   */
  addEventHandlers() {
    this.catalogBlock.addEventListener("click", event => this.addToBasket(event));
  },

  /**
   * Метод добавления в корзину
   */
  addToBasket(event) {
    if (!event.target.classList.contains("product__add-to-cart")) return;
    const id_product = +event.target.dataset.id_product;
    const productToAdd = this.list.find(product => product.id_product === id_product);
    this.cart.addToBasket(productToAdd);
  },

  /**
   * Метод получения количества товаров в каталоге
   * @returns {number}
   */
  getCatalogListLength() {
    return this.list.length;
  },

  /**
   * Рендер списка товаров
   */
  renderCatalogList() {
    this.catalogBlock.innerHTML = "";
    this.list.forEach(item => {
      this.catalogBlock.insertAdjacentHTML("beforeend", this.renderCatalogItem(item));
    });
  },

  /**
   * Рендер отдельного товара из списка
   * @param item - товар
   * @returns {string} - сгенерированая строка разметки
   */
  renderCatalogItem(item) {
    return `<div class="product">
                <h3>${item.product_name}</h3>
                <p>${item.price} руб.</p>
                <button class="product__add-to-cart" data-id_product="${item.id_product}">В корзину</button>
            </div>`;
  },

  /**
   * Рендер пустого каталога
   */
  renderEmptyCatalog() {
    this.catalogBlock.innerHTML = "";
    this.catalogBlock.textContent = "Каталог товаров пуст.";
  },
};

/**
 *  Объект корзины
 */
const cart = {
  cartBlock: null,
  clrCartButton: null,
  goods: [
    {
      id_product: 123,
      product_name: "Ноутбук",
      price: 45600,
      quantity: 2,
    },
  ],

  /**
   * Метод инициальзации корзины
   * @param cartBlockClass - класс блока корзины
   * @param clrCartButton - класс кнопки очистки корзины
   */
  init(cartBlockClass, clrCartButton) {
    this.cartBlock = document.querySelector(`.${cartBlockClass}`);
    this.clrCartButton = document.querySelector(`.${clrCartButton}`);

    this.addEventHandlers();
    this.render();
  },

  /**
   * Метод установки обработчиков событий
   */
  addEventHandlers() {
    this.clrCartButton.addEventListener("click", this.dropCart.bind(this));
  },

  /**
   * Метод очистки корзины
   */
  dropCart() {
    this.goods = [];
    this.render();
  },

  /**
   * Рендер корзины
   */
  render() {
    if (this.getCartGoodsLength() > 0) {
      this.renderCartList();
    } else {
      this.renderEmptyCart();
    }
  },

  /**
   * Добавить товар
   */
  addToBasket(product) {
    if (product) {
      const findInBasket = this.goods.find(item => product.id_product === item.id_product);
      if (findInBasket) {
        findInBasket.quantity++;
      } else {
        this.goods.push({ ...product, quantity: 1 });
        // this.goods.push(Object.assign({quantity: 1}, product));
      }
      this.render();
    } else {
      alert("Ошибка добавления!");
    }
  },

  /**
   * Получение количества товаров в корзине
   * @returns {number}
   */
  getCartGoodsLength() {
    return this.goods.length;
  },

  /**
   * Рендер пустой корзины
   */
  renderEmptyCart() {
    this.cartBlock.innerHTML = "";
    this.cartBlock.textContent = "Корзина пуста.";
  },

  /**
   * Рендер списка товаров в корзине
   */
  renderCartList() {
    this.cartBlock.innerHTML = "";
    this.goods.forEach(item => {
      this.cartBlock.insertAdjacentHTML("beforeend", this.renderCartItem(item));
    });
  },

  /**
   * Рендер отдельного товара в корзине
   * @param item - товар
   * @returns {string} - сгененрированая строка разметки
   */
  renderCartItem(item) {
    return `<div>
                <h3>${item.product_name}</h3>
                <p>${item.price} руб.</p>
                <p>${item.quantity} шт.</p>
            </div>`;
  },
};

/**
 * Подключение каталога и корзины
 */
catalog.init("catalog", cart);
cart.init("cart", "clr-cart");

// 2 *У товара может быть несколько изображений. Нужно:
// a. Реализовать функционал показа полноразмерных картинок товара в модальном окне
// b. Реализовать функционал перехода между картинками внутри модального окна ("листалка")
/**
 * @property {Object} settings Объект с настройками галереи.
 * @property {string} settings.previewSelector Селектор обертки для миниатюр галереи.
 * @property {string} settings.openedImageWrapperClass Класс для обертки открытой картинки.
 * @property {string} settings.openedImageClass Класс открытой картинки.
 * @property {string} settings.openedImageScreenClass Класс для ширмы открытой картинки.
 * @property {string} settings.openedImageCloseBtnClass Класс для картинки кнопки закрыть.
 * @property {string} settings.openedImageCloseBtnSrc Путь до картинки кнопки открыть.
 * @property {string} settings.openedImageNextBtnSrc Путь до картинки со стрелкой вправо.
 * @property {string} settings.openedImageNextBtnClass Класс картинки со стрелкой вправо.
 * @property {string} settings.openedImageBackBtnSrc Путь до картинки со стрелкой влево.
 * @property {string} settings.openedImageBackBtnClass Класс картинки со стрелкой влево.
 * @property {string} settings.imageNotFoundSrc Путь до стандартной картинки-заглушки.
 */
const gallery = {
  openedImageEl: null,

  settings: {
    previewSelector: ".mySuperGallery",
    openedImageWrapperClass: "galleryWrapper",
    openedImageClass: "galleryWrapper__image",
    openedImageScreenClass: "galleryWrapper__screen",
    openedImageCloseBtnClass: "galleryWrapper__close",
    openedImageCloseBtnSrc: "images/gallery/close.png",
    openedImageNextBtnSrc: "images/gallery/next.png",
    openedImageNextBtnClass: "galleryWrapper__next",
    openedImageBackBtnSrc: "images/gallery/back.png",
    openedImageBackBtnClass: "galleryWrapper__back",
    imageNotFoundSrc: "images/gallery/duck.gif",
  },

  /**
   * Инициализирует галерею, ставит обработчик события.
   * @param {Object} settings Объект настроек для галереи.
   */
  init(settings) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    this.settings = Object.assign(this.settings, settings);

    // Находим элемент, где будут превью картинок и ставим обработчик на этот элемент,
    // при клике на этот элемент вызовем функцию containerClickHandler в нашем объекте
    // gallery и передадим туда событие MouseEvent, которое случилось.
    document.querySelector(this.settings.previewSelector).addEventListener("click", event => this.containerClickHandler(event));
  },

  /**
   * Обработчик события клика для открытия картинки.
   * @param {MouseEvent} event Событие клики мышью.
   * @param {HTMLElement} event.target Событие клики мышью.
   */
  containerClickHandler(event) {
    // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
    if (event.target.tagName !== "IMG") {
      return;
    }

    // Записываем текущую картинку, которую хотим открыть.
    this.openedImageEl = event.target;

    // Открываем картинку.
    this.openImage(event.target.dataset.full_image_url);
  },

  /**
   * Открывает картинку.
   * @param {string} src Ссылка на картинку, которую надо открыть.
   */
  openImage(src) {
    // Пробуем загрузить картинку, если картинка загружена - показываем картинку с полученным из
    // целевого тега (data-full_image_url аттрибут), если картинка не загрузилась - показываем картинку-заглушку.
    // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.
    const openedImageEl = this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`);
    const img = new Image();
    img.onload = () => (openedImageEl.src = src);
    img.onerror = () => (openedImageEl.src = this.settings.imageNotFoundSrc);
    img.src = src;
  },

  /**
   * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
   * @returns {Element}
   */
  getScreenContainer() {
    // Получаем контейнер для открытой картинки.
    const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
    // Если контейнер для открытой картинки существует - возвращаем его.
    if (galleryWrapperElement) {
      return galleryWrapperElement;
    }

    // Возвращаем полученный из метода createScreenContainer контейнер.
    return this.createScreenContainer();
  },

  /**
   * Создает контейнер для открытой картинки.
   * @returns {HTMLElement}
   */
  createScreenContainer() {
    // Создаем сам контейнер-обертку и ставим ему класс.
    const galleryWrapperElement = document.createElement("div");
    galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

    // Добавляем кнопку назад.
    const backBtn = new Image();
    backBtn.classList.add(this.settings.openedImageBackBtnClass);
    backBtn.src = this.settings.openedImageBackBtnSrc;
    galleryWrapperElement.appendChild(backBtn);

    // Добавляем обработчик события при клике, ставим новую открытую картинку и открываем ее.
    backBtn.addEventListener("click", () => {
      this.openedImageEl = this.getPrevImage();
      this.openImage(this.openedImageEl.dataset.full_image_url);
    });

    // Добавляем кнопку вперед.
    const nextBtn = new Image();
    nextBtn.classList.add(this.settings.openedImageNextBtnClass);
    nextBtn.src = this.settings.openedImageNextBtnSrc;
    galleryWrapperElement.appendChild(nextBtn);

    // Добавляем обработчик события при клике, ставим новую открытую картинку и открываем ее.
    nextBtn.addEventListener("click", () => {
      this.openedImageEl = this.getNextImage();
      this.openImage(this.openedImageEl.dataset.full_image_url);
    });

    // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
    const galleryScreenElement = document.createElement("div");
    galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
    galleryWrapperElement.appendChild(galleryScreenElement);

    // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
    const closeImageElement = new Image();
    closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
    closeImageElement.src = this.settings.openedImageCloseBtnSrc;
    closeImageElement.addEventListener("click", () => this.close());
    galleryWrapperElement.appendChild(closeImageElement);

    // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
    const image = new Image();
    image.classList.add(this.settings.openedImageClass);
    galleryWrapperElement.appendChild(image);

    // Добавляем контейнер-обертку в тег body.
    document.body.appendChild(galleryWrapperElement);

    // Возвращаем добавленный в body элемент, наш контейнер-обертку.
    return galleryWrapperElement;
  },

  /**
   * Возвращает следующий элемент (картинку) от открытой или первую картинку в контейнере,
   * если текущая открытая картинка последняя.
   * @returns {Element} Следующую картинку от текущей открытой.
   */
  getNextImage() {
    // Получаем элемент справа от текущей открытой картинки.
    const nextSibling = this.openedImageEl.nextElementSibling;
    // Если элемент справа есть, его отдаем, если нет, то берем первый элемент в родительском контейнере.
    return nextSibling ? nextSibling : this.openedImageEl.parentElement.firstElementChild;
  },

  /**
   * Возвращает предыдущий элемент (картинку) от открытой или последнюю картинку в контейнере,
   * если текущая открытая картинка первая.
   * @returns {Element} Предыдущую картинку от текущей открытой.
   */
  getPrevImage() {
    // Получаем элемент слева от текущей открытой картинки.
    const prevSibling = this.openedImageEl.previousElementSibling;
    // Если элемент слева есть, его отдаем, если нет, то берем последний элемент в родительском контейнере.
    if (prevSibling) {
      return prevSibling;
    } else {
      return this.openedImageEl.parentElement.lastElementChild;
    }
  },

  /**
   * Закрывает (удаляет) контейнер для открытой картинки.
   */
  close() {
    document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
  },
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({ previewSelector: ".galleryPreviewsContainer" });
