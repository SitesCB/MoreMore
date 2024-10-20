function increment(item, weight=null) {
    let item_id = getCardId(item.replace("-detail", ""))
    let card;
    
    let all_items = document.querySelectorAll(".cart-item");
    let count_item;
    for (let i = 0; i < all_items.length; i++) {
        if (all_items[i].getAttribute("value") == weight && all_items[i].id == item.replace("-detail", "")) {
            card = all_items[i];
            count_item = all_items[i].querySelector("input");
            console.log(count_item)
            break;
        }
    }
    
    try {
        count_item.value = Number(count_item.value) + 1;
    }
    catch {
        document.getElementById(item).value = Number(document.getElementById(item).value) + 1
    }
    
    if (document.title != "Корзина") {
        try {
            let result_card = getInformationCard(item_id);
            let price = result_card.ordinary_price;
            let count = result_card.count;
        }
        catch {

        }
    }
    else {

        let result_card = getCardFromCart(item_id, weight);
        
        console.log(result_card)
        result_card.count = Number(count_item.value);
        result_card.result_price = result_card.count * result_card.ordinary_price;
        card.querySelector('.price-item-cart').textContent = result_card.result_price + "₽";
        
        CollectSumCart();
        let items = JSON.parse(localStorage.getItem('items'));
        for (let i = 0; i < items.length; i++) {
            if (result_card.id == items[i].id && result_card.weight == items[i].weight) {
                // console.log(result_card.id, items[i].id, result_card.weight, items[i].weight, items[i], result_card)
                console.log("почему-то выбрал", items[i])
                items[i].count = result_card.count;
                items[i].price_result = result_card.result_price;
                break;
            }
        }

        console.log("предметы", items)
        localStorage.setItem('items', JSON.stringify(items));
    }


}

function decrement(item, weight=null) {
    let item_id = getCardId(item.replace("-detail", ""))
    let card;
    
    let all_items = document.querySelectorAll(".cart-item");
    let count_item;
    for (let i = 0; i < all_items.length; i++) {
        if (all_items[i].getAttribute("value") == weight && all_items[i].id == item.replace("-detail", "")) {
            card = all_items[i];
            count_item = all_items[i].querySelector("input");
            console.log(count_item)
            break;
        }
    }

    if (count_item == null) {
        count_item = document.querySelector("#" + item)
    }

    if (count_item.value > 1) {
        if (document.title != "Корзина") {
            try {
                let result = getInformationCard(getCardId(item));
            }
            catch {
                
            }
            let count = parseInt(count_item.value, 10);
        
            if (count > 1) {
                let new_value = count - 1;
                count_item.value = new_value;
            }
        }
        else {
            count_item.value = Number(count_item.value) + 1;
            let result = getCardFromCart(item_id, weight);
            result.result_price -= result.ordinary_price * 2;
            card.querySelector('.price-item-cart').textContent = result.result_price + "₽";
            count_item.value = Number(count_item.value) - 2;
            CollectSumCart();
            
            // сохранить количества
            let items = JSON.parse(localStorage.getItem('items'));
            for (let i = 0; i < items.length; i++) {
                if (result.id == items[i].id && result.weight == items[i].weight) {
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
        "ordinary_price": Number(price),
        "price_result": result_price,
        "id": card_id,
    }
}

function loadCartContainer() {
    try {

        items = JSON.parse(localStorage.getItem('items'))
        let index = 0;
        items.forEach(item => {
            let HTMLItem = `<div class="cart-item" id="item${item.id}" value="${item.weight}">
                                            <div class="img-cart-container">
                                                <a class="img-cart" href="">
                                                    <img src="">
                                                </a>
                                            </div>
                                            <div class="item-info-cart">
                                                <h2>${item.name}</h2>
                                                <p>${item.weight}</p>
                                                <button onclick="DeleteFromCart('item${item.id}-w${item.weight.replace("Упаковка: ", "").replace("гр", "").replace("кг", "")}')">
                                                    <img src="/static/main/images/icons/Sprite-0021.png">
                                                    <p>Удалить</p>
                                                </button>
                                            </div>
                                            <div class="cart-count-detail-buttons">
                                                <p class="price-item-cart">${item.price_result}₽</p>
                                                <div class="counter">
                                                    <button onclick="decrement('item${item.id}-detail', '${item.weight}')">-</button>
                                                    <input value="${item.count}" type="number" id="item${item.id}-detail"></input>
                                                    <button onclick="increment('item${item.id}-detail', '${item.weight}')">+</button>
                                                </div>
                                            </div>
                                        </div>`

            // adding to HTML
            document.querySelector('.cart-container').innerHTML += HTMLItem

            fetch(`/api/items/${item.name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json()
            })
            .then(data => {
                console.log("Response:", data);
                image = data.item.image;
                console.log('/media/' + image)
                let collect_items = document.querySelectorAll('.cart-item');
                console.log('все', collect_items);
                let current_item = collect_items[index]
                console.log('выбран', current_item);
                current_item.querySelector(`img`).setAttribute('src', '/media/' + image);
                current_item.querySelector(`.img-cart`).setAttribute('href', data.link);
                index++;
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });

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
        console.log('error')
    }
}

document.addEventListener('DOMContentLoaded', loadCartContainer)

function getCardFromCart(item_id, weight_search) {
    // console.log(item_id);
    let all_items = document.querySelectorAll(".cart-item");
    let item = null;
    for (let i = 0; i < all_items.length; i++) {
        let temp_item = all_items[i];
        // console.log(Number(temp_item.id.replace("item", "")), item_id, temp_item.querySelector("p"), weight_search)
        if (Number(temp_item.id.replace("item", "")) == item_id && temp_item.querySelector("p").textContent == weight_search) {
            item = temp_item;
            console.log(item);
            break;
        }
    }
    // console.log(item)
    let name = item.querySelector('h2').textContent;
    let weight = item.querySelector('p').textContent;
    let count = Number(item.querySelector('.counter input').value);
    let ordinary_price;
    if (count == 1) {
        ordinary_price = parseInt(item.querySelector('.price-item-cart').textContent);
    }
    else {
        ordinary_price = parseInt(item.querySelector('.price-item-cart').textContent) / (count - 1);
    }
    let result_price = ordinary_price * count;

    return {
        "name" : name,
        "weight" : weight,
        "count": count,
        "ordinary_price" : Number(ordinary_price),
        "id" : item_id,
        "result_price" : result_price
    }
}

function getCardFromMemory(card_id, weight=null) {
    let items = JSON.parse(localStorage.getItem("items"))
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == card_id && items[i].weight == weight) {
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
        "ordinary_price" : Number(ordinary_price),
        "id" : card_id,
        "result_price" : result_price,
        "weight": weight
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
                
                let current_card = this.parentNode.parentNode
                let weight = current_card.getAttribute("value")

                console.log("cur", current_card)
                
                let current_item = getCardFromMemory(card_id, weight);
                console.log("curr", current_item)

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
                    if (items[i].id == card_id && items[i].weight == weight) {
                        items[i].count = count;
                        items[i].price_result = price;
                    }
                }

                localStorage.setItem("items", JSON.stringify(items));
            }
            // Если значение отрицательное или 0, заменяем его на 1
            console.log(Number(value.value))
            if (Number(value.value) < 0) {
                value.value = 1;
            }

        });
    }
})

try {
    document.addEventListener('DOMContentLoaded', function() {
        let item_name = document.title;
        let options = document.querySelector('select');
        options.addEventListener('change', function() {
            fetch("/api/items/ikra-chernaya/" + options.value)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json()
            })
            .then(data => {
                console.log("Response:", data);
                document.querySelector('#price-detail').textContent = data.price;

            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
            });
        })

    })
}
catch {

}
