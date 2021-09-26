// 1. Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему желанию. Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки. Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H. (использовать createElement / appendChild)
var chess = document.createElement("div");
for (var i = 1; i <= 8; i++) {
  var row = document.createElement("div");
  row.className = "row";
  for (var j = 1; j <= 8; j++) {
    var col = document.createElement("div");
    if (i % 2 == j % 2) {
      col.className = "white";
    } else {
      col.className = "black";
    }
    row.appendChild(col);
  }
  chess.appendChild(row);
}
document.body.appendChild(chess);

// 2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
// 2.1. Пустая корзина должна выводить строку «Корзина пуста»;
// 2.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
const cartItem = {
  render(good) {
    return `<div class="good">
                  <div><b>Наименование</b>: ${good.product_name}</div>
                  <div><b>Цена за шт.</b>: ${good.price}</div>
                  <div><b>Количество</b>: ${good.quantity}</div>
                  <div><b>Стоимость</b>: ${good.quantity * good.price}</div>
              </div>`;
  },
};

const cart = {
  cartListBlock: null,
  cartButton: null,
  cartItem,
  goods: [
    {
      id_product: 123,
      product_name: "Ноутбук",
      price: 45600,
      quantity: 1,
    },
    {
      id_product: 456,
      product_name: "Мышка",
      price: 1000,
      quantity: 2,
    },
    {
      id_product: 305,
      product_name: "Клавиатура",
      price: 2000,
      quantity: 1,
    },
  ],
  init() {
    this.cartListBlock = document.querySelector(".cart-list");
    this.cartButton = document.querySelector(".cart-btn");
    this.cartButton.addEventListener("click", this.clearCart.bind(this));

    this.render();
  },
  render() {
    if (this.goods.length) {
      this.goods.forEach(good => {
        this.cartListBlock.insertAdjacentHTML("beforeend", this.cartItem.render(good));
      });
      this.cartListBlock.insertAdjacentHTML("beforeend", `В корзине ${this.goods.length} позиций(я) стоимостью ${this.getCartPrice()}`);
    } else {
      this.cartListBlock.textContent = "Корзина пуста";
    }
  },
  getCartPrice() {
    return this.goods.reduce(function (price, good) {
      return price + good.price * good.quantity;
    }, 0);
  },
  clearCart() {
    this.goods = [];
    this.render();
  },
};

cart.init();
