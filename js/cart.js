// ***Window***//
window.onload = init();
function init() {
    logInCheck();
    displayItemInCart();
     subtotal();
}
//*** COMMON ***//
function logInCheck() {
    let whoIsLogIn = sessionStorage.getItem('whoIsLogIn');
    let logInId = sessionStorage.getItem('logInId');
    if (whoIsLogIn == 'admin') {
        alert('Have a nice day, boss!')
        return whoIsLogIn;
    }
    if (logInId) {
        document.getElementById('ti-user-icon').style.backgroundColor = 'green';
        return logInId;
    } else {
        // alert('Please Login to buy')
        document.getElementById('ti-user-icon').style.backgroundColor = '#F5F5F5';
        return false;
    }
}
// **** DISPLAY ***//
function displayItemInCart() {
    let cartWrapper = document.getElementById('cart-item-wrapper');
    let itemList = JSON.parse(localStorage.getItem('itemList'));
    let userInforList = JSON.parse(localStorage.getItem('userInforList'));

    let logInId = sessionStorage.getItem('logInId');
    let userInforIndex = getIndexOfUserInforInUserInforListById(logInId);
    let userInfor = userInforList[userInforIndex];

    let itemsIdInCart = userInfor[1];
    if(itemsIdInCart == null || itemsIdInCart.length == 0){
        cartWrapper.innerHTML = 'No item'
        return false;
    }
    let itemsInCart = itemsIdInCart.map((itemId, index) => {
        return getItemObjectInItemListById(itemId);
    })
    // console.log(itemsInCart);
    localStorage.setItem('cartPageItemsInCart', JSON.stringify(itemsInCart));
    let result = '';
    let displayedItemId = [];
    itemsInCart.forEach((item, index) => {
        displayedItemId.push(item.itemId);
        result += `
        <div class="cart-item">
        <input id="checkBox_${index}" class="checkbox" type="checkbox" onclick="cartCheckBox(${index})" checked>
        <img class="cart-img" src="${item.imgSource}" alt="">
        <div class="item-infor">
            <p class="item-name">${item.itemName}</p>
            <p class="stock">${item.stock} items in stock</p>
            <div class="button-wrapper">
                <input id="quantity_${index}" class="quantity" type="text" value="1" onkeydown="quantityChange()">
                <p class="delete hover3" onclick="deleteItemInCart(${index})">Delete</p>
                <p class="save hover3">Save for later</p>
            </div>
        </div>
        <div class="price">
            <span>${item.price}</span>
            <span> $</span>
        </div>
    </div>
            `
    });
    cartWrapper.innerHTML = result;
}
function subtotal() {
    let userInforList = JSON.parse(localStorage.getItem('userInforList'));
    let logInId = sessionStorage.getItem('logInId');
    let userInforIndex = getIndexOfUserInforInUserInforListById(logInId);
    let userInfor = userInforList[userInforIndex];

    let itemsIdInCart = userInfor[1];
    if(itemsIdInCart == null || itemsIdInCart.length == 0){
        return 0;
    }

    let subtotalMoney = document.getElementById('subtotalMoney');
    let cartPageItemsInCart = JSON.parse(localStorage.getItem('cartPageItemsInCart'));
    let total = 0;
    // debugger;
    cartPageItemsInCart.forEach((item, index) => {
        let checkBox = document.getElementById(`checkBox_${index}`);
        let quantity = document.getElementById(`quantity_${index}`);
        if (checkBox.checked == true) {
            if (isNaN(parseInt(quantity.value))) {

            } else {
                total += item.price * parseInt(quantity.value);
            }
        }
    });
    subtotalMoney.innerHTML = `Subtotal: <br> <span style="font-size: 22px; margin-top: 15px;">${total} $</span>`
    // let subtotal = cartPageItemsInCart.reduce((total,currentValue)=>{

    // },0)

}
function cartCheckBox(itemsInCartindex) {
    subtotal();
}
function quantityChange() {
    //onkeydown
    subtotal();
}
function deleteItemInCart(itemsInCartindex){
// function deleteItemInCart(){
    console.log("here");
    let cartPageItemsInCart = JSON.parse(localStorage.getItem('cartPageItemsInCart'));
    let userInforList = JSON.parse(localStorage.getItem('userInforList'));

    let logInId = sessionStorage.getItem('logInId');
    let userInforIndex = getIndexOfUserInforInUserInforListById(logInId);
    let userInfor = userInforList[userInforIndex];


    cartPageItemsInCart.splice(itemsInCartindex,1);
    let itemId = cartPageItemsInCart.map((item,index)=>{
        return item.itemId;
    })
    userInforList[userInforIndex].splice(1,1,itemId);
    
    console.log('cartPageItemsInCart',cartPageItemsInCart);
    console.log('itemId',itemId);
    console.log(userInforList);


    // localStorage.setItem('cartPageItemsInCart',JSON.stringify(cartPageItemsInCart));
    // localStorage.setItem('userInforList',JSON.stringify(userInforList));
}
function jumpToShoppingPage(){
    window.location.href = '../index.html';
}
