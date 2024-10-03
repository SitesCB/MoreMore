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

// обновление значения при изменении количества товара в детализации
function updateValue() {
    let inputValue = document.getElementById('item1-detail').value;
    if (inputValue <= 0) {
        inputValue = 1;
        document.getElementById('item1-detail').value = inputValue;
    }

    document.getElementById('price-detail').innerText = inputValue * price;
}


document.addEventListener('DOMContentLoaded', function() {
    try {
        document.getElementById('item1-detail').addEventListener('input', updateValue);
    }
    catch {

    }
});

// сброс значения при изменении типа товара
function resetValue() {
    document.getElementById('price-detail').innerText = price;
    document.getElementById('item1-detail').value = 1;
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        document.getElementById('types-details').addEventListener('change', resetValue);
    }
    catch {
        console.log("found error")
    }
});


// убирает поп-ап, появляющийся при добавлении товара в корзину
function hideToast() {
    document.getElementById('toast').classList.remove('show');
}

function AddToCart() {
    let count = document.getElementById('item1-detail');
    let summary = document.getElementById('price-detail');

    document.getElementById('counter-popup').textContent = 'Количество: ' + count.value;
    document.getElementById('summary-popup').textContent = 'Сумма: ' + summary.textContent + "₽";

    count.value = 1;
    summary.textContent = price;
    document.getElementById('toast').classList.add('show');

    document.getElementById('cart-counter').textContent++;
    document.getElementById("cart-counter-block").style.opacity = 1;
}

function AddToCartFromPage(card_id) {

    let result = getInformationCard(card_id);
    console.log(result);
    document.getElementById('counter-popup').textContent = 'Количество: ' + result.count;
    document.getElementById('summary-popup').textContent = 'Сумма: ' + result.price_result + "₽";
    let item = 'item' + card_id;
    document.getElementById(item).value = 1;
    document.getElementById('toast').classList.add('show');
    
    document.getElementById("cart-counter-block").style.opacity = 1;

    let switcher = 1;
    if (localStorage.getItem('items')) {
        items = JSON.parse(localStorage.getItem('items'));
        items.forEach(item => {
            if (item.id == result.id && item.ordinary_price == result.ordinary_price) {
                item.count += Number(result.count);
                item.price_result = item.count * item.ordinary_price;
                localStorage.setItem('items', JSON.stringify(items));
                let switcher = 0;
            }
            
        });

        if (!switcher) {
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

function DeleteFromCart(item) {
    document.getElementById(item).remove();
    localStorage.setItem('count_cart', localStorage.getItem('count_cart') - 1);
    document.getElementById('cart-counter') -= 1;
    CollectSumCart();
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