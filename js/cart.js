// ***Window***//
window.onload = init();
function init() {
    logInCheck();
    displayItemInCart();
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
    let itemsInCart = itemsIdInCart.map((itemId,index)=>{
        return getItemObjectInItemListById(itemId);
    })
    console.log(itemsInCart);
    let result = '';
    let displayedItemId = [];
    itemsInCart.forEach((item, index) => {
        displayedItemId.push(item.itemId);
        result += `
        <div class="cart-item">
        <input class="checkbox" type="checkbox" onclick="cartCheckBox(${index})">
        <img class="cart-img" src="${item.imgSource}" alt="">
        <div class="item-infor">
            <p class="item-name">${item.itemName}</p>
            <p class="stock">${item.stock}</p>
            <div class="button-wrapper">
                <input class="quantity" type="text">
                <p class="delete hover3">Delete</p>
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
