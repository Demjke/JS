// 1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
let numbers = {};
let numInObj = num => {
  let splits = String(num).split("");
  if (num < 10) {
    numbers["единицы"] = splits;
    return numbers;
  } else if (num < 100) {
    numbers["десятки"] = splits[0];
    numbers["единицы"] = splits[1];
    return numbers;
  } else if (num < 1000) {
    numbers["сотни"] = splits[0];
    numbers["десятки"] = splits[1];
    numbers["единицы"] = splits[2];
    return numbers;
  } else {
    console.log("Число превышает 999");
    return numbers;
  }
};
console.log(numInObj(9999));

// 2.Продолжить работу с интернет-магазином:
// 2.1. В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
// 2.2. Реализуйте такие объекты.
// 2.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.
let basket = {
  one: {
    price: 300,
    count: 3,
  },
  two: {
    price: 400,
    count: 5,
  },
  three: {
    price: 500,
    count: 3,
  },
};

let countBasketPrice = obj => {
  let sum = 0;
  for (key in obj) {
    sum += obj[key].price * obj[key].count;
  }
  console.log(sum);
};

countBasketPrice(basket);
