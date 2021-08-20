// 1. Дан код:
// Почему код даёт именно такие результаты?
var a = 1, b = 1, c, d;
c = ++a; console.log(c);           // 2 Вначале инкремент, потом присвоение
d = b++; console.log(d);           // 1 Вначале присвоение, потом инкремент
c = (2 + ++a); console.log(c);      // 5 Вначале инкремент, потом сложение и присвоение
d = (2 + b++); console.log(d);      // 4 Вначале сложение, потом присвоение и инкремент
console.log(a);                    // 3 После 2-х инкрементов a = 3
console.log(b);                    // 3 После 2-х инкрементов b = 3

// 2. Чему будет равен x в примере ниже?
var a = 2;
var x = 1 + (a *= 2); // x = 5, a умножается на 2 и прибавляется 1 

// 3. Объявить две целочисленные переменные a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
// если a и b положительные, вывести их разность;
// если а и b отрицательные, вывести их произведение;
// если а и b разных знаков, вывести их сумму; ноль можно считать положительным числом.
var a = 5;
var b = 10;

if (a > 0 || b > 0) {
  console.log(a - b);
} else if (a < 0 || b < 0) {
  console.log(a * b);
} else {
  console.log(a + b);
}

// 4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.

var a = 12;

switch (a) {
  case 1:
    console.log('1');
  case 2:
    console.log('2');
  case 3:
    console.log('3');
  case 4:
    console.log('4');
  case 5:
    console.log('5');
  case 6:
    console.log('6');
  case 7:
    console.log('7');
  case 8:
    console.log('8');
  case 9:
    console.log('9');
  case 10:
    console.log('10');
  case 11:
    console.log('11');
  case 12:
    console.log('12');
  case 13:
    console.log('13');
  case 14:
    console.log('14');
  case 15:
    console.log('15');
    break;
}

// 5. Реализовать основные 4 арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return

let sum = (a, b) => {
  return a + b;
}

let diff = (a, b) => {
  return a - b;
}

let mul = (a, b) => {
  return a * b;
}

let div = (a, b) => {
  return a / b;
}

console.log(sum(5, 6));
console.log(diff(5, 6));
console.log(mul(5, 6));
console.log(div(5, 6));

// 6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, operation – строка с названием операции. В зависимости от переданного значения операции выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (использовать switch).

let mathOperation = (arg1, arg2, operation) => {
  switch (operation) {
    case sum:
      console.log(sum(arg1, arg2))
      break;
    case diff:
      console.log(diff(arg1, arg2))
      break;
    case mul:
      console.log(mul(arg1, arg2))
      break;
    case div:
      console.log(div(arg1, arg2))
      break;
  }
}

mathOperation(2, 3, sum);
mathOperation(2, 3, diff);
mathOperation(2, 3, mul);
mathOperation(2, 3, div);

// 7. *Сравнить null и 0. Попробуйте объяснить результат.

console.log(null == 0); // null - вообще нет значения, а 0 - значение 0

// 8. *С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val – заданное число, pow – степень.

let power = (val, pow) => {
  if (pow < 0) {
    return "Степень должна быть положительным числом";
  } else if (pow == 0) {
    return 1;
  } else if (pow == 1) {
    return val;
  } else {
    return val * power(val, pow - 1);
  }
}

console.log(power(3, 1));