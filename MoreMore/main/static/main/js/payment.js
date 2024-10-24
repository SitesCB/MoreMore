const items = JSON.parse(localStorage.getItem('items'));

let price = 0;

for (let i = 0; i < items.length; i++) {
    price += items[i]['price_result'];
}

console.log(price)
let price_delivery = 0;
if (price < 2000) {
    price_delivery = 300;
}
let price_result = price + price_delivery;

document.querySelector('tbody tr:nth-child(1) td:nth-child(2)').textContent = price_delivery + '₽'
document.querySelector('tbody tr:nth-child(2) td:nth-child(2)').textContent = price + '₽'
document.querySelector('tfoot tr td:nth-child(2)').textContent = price_result + '₽'
