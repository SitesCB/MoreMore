function increment(item) {
    let item_id = getCardId(item.replace("-detail", ""))
    let card = document.getElementById(item.replace("-detail", ""));

    let count_item = document.getElementById(item)
    
    count_item.value = parseInt(document.getElementById(item).value) + 1;
    
    if (document.title != "Корзина") {
        let result_card = getInformationCard(item_id);
        let price = result_card.ordinary_price;
        let count = result_card.count;
    }
    else {
        let result_card = getCardFromCart(item_id);
        result_card.count = Number(count_item.value);
        result_card.result_price = result_card.count * result_card.ordinary_price;
        card.querySelector('.price-item-cart').textContent = result_card.result_price + "₽";
        console.log(result_card);
        CollectSumCart();

        let items = JSON.parse(localStorage.getItem('items'));
        for (let i = 0; i < items.length; i++) {
            if (result_card.id == items[i].id) {
                items[i].count = result_card.count;
                items[i].price_result = result_card.result_price;
                break;
            }
        }
        localStorage.setItem('items', JSON.stringify(items));
    }


}

function decrement(item) {
    let item_id = getCardId(item.replace("-detail", ""))
    let card = document.getElementById(item.replace("-detail", ""));

    let count_item = document.getElementById(item)

    if (count_item.value > 1) {
        if (document.title != "Корзина") {
            let result = getInformationCard(getCardId(item));
            let count = parseInt(count_item.value, 10);
        
            if (count > 1) {
                let new_value = count - 1;
                count_item.value = new_value;
            }
        }
        else {
            count_item.value = Number(count_item.value) + 1;
            let result = getCardFromCart(item_id);
            result.result_price -= result.ordinary_price * 2;
            card.querySelector('.price-item-cart').textContent = result.result_price + "₽";
            count_item.value = Number(count_item.value) - 2;
            CollectSumCart();
            
            // сохранить количества
            let items = JSON.parse(localStorage.getItem('items'));
            for (let i = 0; i < items.length; i++) {
                if (result.id == items[i].id) {
                    items[i].count = result.count - 2;
                    items[i].price_result = result.result_price;
                    break;
                }
            }
            localStorage.setItem('items', JSON.stringify(items));

        }
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
    let weight = card.querySelector(".info p:nth-child(2)").textContent;
    let count = card.querySelector("input").value;
    let price = card.querySelector('.price-item-numeric').textContent;
    let result_price = Number(count * price);
    return {
        "name": name_item,
        "count": Number(count),
        "weight": weight,
        "ordinary_price": price,
        "price_result": result_price,
        "id": card_id,
    }
}

function loadCartContainer() {
    try {

        items = JSON.parse(localStorage.getItem('items'))
        items.forEach(item => {
            document.querySelector('.cart-container').innerHTML += `<div class="cart-item" id="item${item.id}">
                                            <div class="img-cart-container">
                                                <div class="img-cart">
                                                </div>
                                            </div>
                                            <div class="item-info-cart">
                                                <h2>${item.name}</h2>
                                                <p>${item.weight}</p>
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
    let count = Number(item.querySelector('.counter input').value);
    let ordinary_price = parseInt(item.querySelector('.price-item-cart').textContent) / (count - 1);
    let result_price = ordinary_price * count;

    return {
        "name" : name,
        "weight" : weight,
        "count": count,
        "ordinary_price" : ordinary_price,
        "id" : item_id,
        "result_price" : result_price
    }
}

function getCardFromMemory(card_id) {
    let items = JSON.parse(localStorage.getItem("items"))
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == card_id) {
            var current_item = items[i];
            break;
        }
    }

    let name = current_item.name;
    let count = Number(current_item.count);
    let ordinary_price = current_item.ordinary_price
    let result_price = current_item.price_result;

    return {
        "name" : name,
        "count": count,
        "ordinary_price" : ordinary_price,
        "id" : card_id,
        "result_price" : result_price
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const all_inputs = document.querySelectorAll('.counter');
    for (let i = 0; i < all_inputs.length; i++) {
        all_inputs[i].addEventListener('input', function() {
            console.log(all_inputs[i]);
            let value = this.querySelector('input');
            
            if (document.title == "Корзина") {
                let card_id = getCardId(String(all_inputs[i].querySelector('input').id).replace("-detail", ""));
                let current_card = document.querySelector("#item" + card_id) 
                // let current_card = getCardFromCart(card_id);
                let current_item = getCardFromMemory(card_id);

                let count = current_card.querySelector(".counter input").value;
                if (count == "") {
                    count = 1
                }

                count = Number(count);
                let price = current_item.ordinary_price * count;
                current_card.querySelector(".price-item-cart").textContent = price + "₽"
                console.log(current_item)

                CollectSumCart();

                items = JSON.parse(localStorage.getItem("items"));
                for (let i = 0; i < items.length; i++) {
                    if (items[i].id == card_id) {
                        items[i].count = count;
                        items[i].price_result = price;
                    }
                }

                localStorage.setItem("items", JSON.stringify(items));
            }
            // Если значение отрицательное или 0, заменяем его на 1
            if (Number(value.value) < 0) {
                value.value = 1;
            }

        });
    }
})

