window.addEventListener('scroll', function() {
    let menu = document.getElementById('menu');
    let headerHeight = document.getElementById('header').offsetHeight;
    let homesection = document.getElementById('home-section');

    if (this.window.scrollY < headerHeight) {
        menu.classList.remove('fixed');
        homesection.classList.remove('margined');
    }
    if (this.window.scrollY > 205) {
        menu.classList.add('fixed');
        homesection.classList.add('margined');
    }
    
});

if (Number(localStorage.getItem('count_cart')) != 0) {
    document.getElementById('cart-counter-block').style.opacity = 1;
    document.getElementById('cart-counter').textContent = localStorage.getItem('count_cart');
}

function show_menu() {
    let classes = document.getElementById('products-menu').classList;
    let surf = document.getElementById('black-surface');

    if (classes.length == 1) {
        document.getElementById('menu').style.zIndex = 10;
        document.getElementById('black-surface').classList.add('active-surf');
        classes.add('active');
    }
    else {
        document.getElementById('black-surface').classList.remove('active-surf');
        classes.remove('active');
    }
}

// убирает поп-ап, появляющийся при добавлении товара в корзину
function hideToast() {
    document.getElementById('toast').classList.remove('show');
}

function AddToCart(item_id) {
    let info = document.querySelector(".hat-detail .right-block");
    let name = info.querySelector("h1").textContent;
    let price = info.querySelector("#price-detail").textContent;
    let weight = "Упаковка: " + info.querySelector("select").value;
    let count = info.querySelector(".counter input").value;

    if (count == 0 || count == "") {
        return;
    }

    let result = {
        "name": name,
        "count": Number(count),
        "weight": weight,
        "ordinary_price": Number(price),
        "price_result": price * count,
        "id": item_id
    }

    let items = JSON.parse(localStorage.getItem("items"))
    otheritem = 1;
    if (items && items.length != 0) {
        console.log(result);
        let otheritem = 1;

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.id == result.id && item.ordinary_price == result.ordinary_price && item.weight == result.weight) {

                items[i].count += Number(result.count);
                items[i].price_result = items[i].count * items[i].ordinary_price;
                localStorage.setItem('items', JSON.stringify(items));
                otheritem = 1;
                break;

            }
            otheritem = 0;
        }

        if (!otheritem) {
            localStorage.setItem('items', JSON.stringify(JSON.parse(localStorage.getItem('items')).concat(result)));
            localStorage.setItem('count_cart', Number(localStorage.getItem('count_cart')) + 1);
            document.getElementById('cart-counter').textContent = localStorage.getItem('count_cart');
        }
    }
    else {
        localStorage.setItem('items', JSON.stringify([].concat(result)));
        addCountCart();
        document.getElementById('cart-counter').textContent = localStorage.getItem('count_cart');
    }


    document.getElementById('name-popup').textContent = result.name;
    document.getElementById('counter-popup').textContent = 'Количество: ' + result.count;
    document.getElementById('summary-popup').textContent = 'Сумма: ' + result.price_result + "₽";
    
    document.getElementById('toast').classList.add('show');
    document.querySelector('#cart-counter-block').style.opacity = 1;

    info.querySelector(".counter input").value = 1;
}

function CorrectPriceToWeight(card_id) {
    // функция для изменения цены товара относительно его веса
    // позднее через АПИ обработать
}

function AddToCartFromPage(card_id) {

    let result = getInformationCard(card_id);
    let item = 'item' + card_id;
    document.getElementById(item).value = 1;
    if (result.count == 0) {
        return;
    }
    console.log(result);
    document.getElementById('name-popup').textContent = result.name;
    document.getElementById('counter-popup').textContent = 'Количество: ' + result.count;
    document.getElementById('summary-popup').textContent = 'Сумма: ' + result.price_result + "₽";
    
    document.getElementById('toast').classList.add('show');
    
    document.getElementById("cart-counter-block").style.opacity = 1;

    let items = JSON.parse(localStorage.getItem('items'));

    if (items && items.length != 0) {
        console.log(item);
        let otheritem = 1;

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.id == result.id && item.ordinary_price == result.ordinary_price && item.weight == result.weight) {

                items[i].count += Number(result.count);
                items[i].price_result = items[i].count * items[i].ordinary_price;
                localStorage.setItem('items', JSON.stringify(items));
                otheritem = 1;
                break;

            }
            otheritem = 0;
        }

        if (!otheritem) {
            localStorage.setItem('items', JSON.stringify(JSON.parse(localStorage.getItem('items')).concat(result)));
            localStorage.setItem('count_cart', Number(localStorage.getItem('count_cart')) + 1);
            document.getElementById('cart-counter').textContent = localStorage.getItem('count_cart');
        }
    }
    else {
        localStorage.setItem('items', JSON.stringify([].concat(result)));
        addCountCart();
        document.getElementById('cart-counter').textContent = localStorage.getItem('count_cart');
    }


}

// обработать случай с пустым массивом и добавлением новых элементов внутрь

function DeleteFromCart(item) {
    // item = item1-w100
    // получаем конкретный id товара
    console.log(item);
    let weight;
    if (item.split("-")[1].replace("w", "") < 10) {
        weight = "Упаковка: " + item.split("-")[1].replace("w", "") + "кг"
    }
    else {
        weight = "Упаковка: " + item.split("-")[1].replace("w", "") + "гр"
    }
    console.log(weight); // упаковка 100г
    let card_id = getCardId(item.split("-")[0]);
    // получаем конкретный товар
    let current_item = getCardFromCart(card_id, weight);
    let items = JSON.parse(localStorage.getItem('items'));

    let index = 0;
    console.log(items)
    // если айди и цена одинаковые, то удаляем именно его
    for (let i = 0; i < items.length; i++) {
        card_item = items[i];
        if (card_item.id == current_item.id && card_item.weight == current_item.weight) {
            items.splice(i, 1);
        }
    }
    
    localStorage.setItem('items', JSON.stringify(items));
    // document.getElementById(item).remove();
    let all_items = document.querySelectorAll(".cart-item");
    for (let i = 0; i < all_items.length; i++) {
        let current_item = all_items[i];
        console.log("Предмет для выцепления", current_item);
        console.log(current_item.id, ("item" + card_id), current_item.getAttribute("value"), weight)
        if (current_item.id == ("item" + card_id) && current_item.getAttribute("value") == weight) {
            console.log("АААААААААА")
            current_item.remove();
            break;
        }
    }

    localStorage.setItem('count_cart', Number(localStorage.getItem('count_cart')) - 1);
    let count_cart = document.getElementById('cart-counter').textContent -= 1;
    if (count_cart == 0) {
        document.getElementById("cart-counter-block").style.opacity = 0;
    }
    CollectSumCart();
    clearCartPage();
}

function addCountCart() {
    localStorage.setItem('count_cart', Number(localStorage.getItem('count_cart')) + 1);
}

function CollectSumCart() {
    try {
        let classesNodeList = document.querySelectorAll(".price-item-cart");
        let classes = Array.prototype.slice.call(classesNodeList).map(function(element) {
            return element.value;
        });
        
        let currentPrice = 0;
    
        for (let i = 0; i < classesNodeList.length; i++) {
            currentPrice += parseInt(classesNodeList[i].innerText.slice(0, -1));
        }
    
        document.getElementById("current-price").textContent = currentPrice + "₽";
        
        let deliveryPrice = 0;
    
        if (currentPrice >= 2000) {
            document.getElementById("delivery-price").textContent = "Бесплатно";
        }
        else if (currentPrice == 0) {
            deliveryPrice = 0;
            document.getElementById("delivery-price").textContent = deliveryPrice + "₽";
        }
        else {
            deliveryPrice = 300;
            document.getElementById("delivery-price").textContent = deliveryPrice + "₽";
        }
    
        let resultPrice = deliveryPrice + currentPrice;
        document.getElementById("result-price").textContent = resultPrice + "₽";
    }
    catch {

    }
}

CollectSumCart();

function countCart() {
    let items = JSON.parse(localStorage.getItem("items"));
    let len;
    try {
        len = items.length
    }
    catch {
        len = 0;
    }
    return Boolean(len)
}

function clearCartPage() {
    if (document.title == "Корзина" && !countCart()) {
        document.querySelector(".cart-page").innerHTML = `
        <div class="empty-cart">
            <img src="/static/main/images/mockups/empty cart.png">
            <h1>Корзина пуста</h1>
            <a href="..">Вернуться к покупкам</a>
        </div>
        `;
    }
}


document.addEventListener("DOMContentLoaded", clearCartPage())
document.addEventListener("DOMContentLoaded", function() {
//    class="open-page"
    let title = document.title;
    switch (title) {
        case "Главная":
            document.querySelector('footer .urls a:nth-child(1)').classList.add("open-page");
            break;
        case "Доставка и оплата":
            document.querySelector('footer .urls a:nth-child(2)').classList.add("open-page");
            break;
        case "О нас":
            document.querySelector('footer .urls a:nth-child(3)').classList.add("open-page");
            break;
        case "Контакты":
            document.querySelector('footer .urls a:nth-child(4)').classList.add("open-page");
            break;
    }
});

const currentUrl = window.location.href;

const url = new URL(currentUrl);
const send = url.searchParams.get('send');

document.addEventListener('DOMContentLoaded', function() {
    if (Boolean(send) == true) {
        alert('Ваша заявка была успешно отправлена')
    }
});

function CollectCartToBack(data) {
    
    let cart = localStorage.getItem('items');
    let params = Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
    

    let url = "/api/cart/addnew/" + cart + "?" + params;
    console.log(url)
    
    fetch(url)
    .then(response => {
        return response.text();
    })
    .then(text => {
        return JSON.parse(text.replace(/'/g, '"'));
    })
    .then(data => {
        console.log('data', data);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
    
}

if (document.title == 'Корзина') {
    const currentUrl = window.location.href;

    const url = new URL(currentUrl);
    const payment = url.searchParams.get('payment');

    let data = {
        phone: url.searchParams.get('phone'),
        name: url.searchParams.get('name'),
        city: url.searchParams.get('city'),
        location: url.searchParams.get('location')
    }

    if (Boolean(payment) == true) {
        // добавляем пометку о том, что оплата прошла и редирект на главную страницу
        CollectCartToBack(data);
        alert("Ваша заявка была оставлена");
        localStorage.setItem('count_cart', 0);
        localStorage.setItem('items', '[]');
        window.location.href = "/";
    }

}

