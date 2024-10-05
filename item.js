function increment(item) {
    let item_id = getCardId(item)
    document.getElementById(item).value = parseInt(document.getElementById(item).value) + 1;
    let result_card = getInformationCard(item_id);
    let price = result_card.ordinary_price;
    let count = result_card.count;
    
}

function decrement(item) {
    let current_item = document.getElementById(item);
    let result = getInformationCard(getCardId(item));
    let count = parseInt(current_item.value, 10);

    if (count > 1) {
        let new_value = count - 1;
        current_item.value = new_value;
    }
}

function getCardId(item) {
    let item_id = Number(item.replace(/^\D+/g, ''));
    return item_id;
}

function getInformationCard(card_id) {
    let card_item = 'iitem' + card_id;
    let card = document.getElementById(card_item);
    let name_item = card.querySelector(".info p").textContent;
    // получить упаковку
    let count = card.querySelector("input").value;
    let price = card.querySelector('.price-item-numeric').textContent;
    let result_price = Number(count * price);
    return {"name": name_item, "count": Number(count), "ordinary_price": price, "price_result": result_price, "id": card_id}
}

function loadCartContainer() {
    try {

        items = JSON.parse(localStorage.getItem('items'))
        items.forEach(item => {
            document.querySelector('.cart-container').innerHTML += `<div class="cart-item" id="item${item.id}">
                                            <div class="img-cart"></div>
                                            <div class="item-info-cart">
                                                <h2>${item.name}</h2>
                                                <p>Упаковка: 100г</p>
                                                <button onclick="DeleteFromCart('item${item.id}')">
                                                    <img src="иконки/Sprite-0021.png">
                                                    <p>Удалить</p>
                                                </button>
                                            </div>
                                            <div class="cart-count-detail-buttons">
                                                <p class="price-item-cart">${item.price_result}₽</p>
                                                <div class="counter">
                                                    <button onclick="decrement('item${item.id}-detail')">-</button>
                                                    <input value="${item.count}" type="number" id="item${item.id}-detail"></input>
                                                    <button onclick="increment('item${item.id}-detail')">+</button>
                                                </div>
                                            </div>
                                        </div>`
        });
        document.querySelector('.cart-container').innerHTML += `<hr>
                                        <div class="cart-price">
                                            <h1>Стоимость закака</span></h1>
                                            <p id="current-price"></p>
                                        </div>
                                        <div class="cart-price">
                                            <h1>Доставка</span></h1>
                                            <p id="delivery-price">Бесплатно</p>
                                        </div>
                                        <hr>
                                        <div class="cart-price">
                                            <h1>К оплате</span></h1>
                                            <p id="result-price"></p>
                                        </div>`
        CollectSumCart();
    }
    catch {

    }
}

document.addEventListener('DOMContentLoaded', loadCartContainer)

function getCardFromCart(item_id) {
    console.log(item_id);
    let item = document.getElementById("item" + item_id);
    let name = item.querySelector('h2').textContent;
    let weight = item.querySelector('p').textContent;
    let count = item.querySelector('.counter input').value;
    let ordinary_price = parseInt(item.querySelector('.price-item-cart').textContent) / count;
    return {
        "name" : name,
        "weight" : weight,
        "count": count,
        "price" : ordinary_price,
        "id" : item_id
    }
}

