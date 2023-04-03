// ***Window***//
window.onload = init();
function init(){
    logInCheck();
    displayItemInItemList();
}
//*** COMMON ***//
function logInCheck(){
    let whoIsLogIn = sessionStorage.getItem('whoIsLogIn');
    let logInId = sessionStorage.getItem('logInId');
    if(whoIsLogIn == 'admin'){
        let message = "Have a nice day, boss!"
        showSnackBar(message);
        return whoIsLogIn;
    }
    if(logInId){
        document.getElementById('ti-user-icon').style.backgroundColor = 'green';
        return logInId;
    } else{
        let message = "Please login to buy!"
        showSnackBar(message);
        document.getElementById('ti-user-icon').style.backgroundColor = '#F5F5F5';
        return false;
    }
}
// ****
function displayItemInItemList(){
    let mainContent = document.getElementById('main-content');
    let itemList = JSON.parse(localStorage.getItem('itemList'));
    let result = '';
    itemList.forEach((item,index) => {
        result+=`
            <div class="product">
            <img class="product-img infor" src="${item.imgSource}" alt="">
            <p class="product-name infor">${item.itemName}</p>
            <p class="product-rating infor">
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </p>
            <p class="product-price infor">${item.price} $</p>
            <div class="product-add infor clear">
                <i class="ti-heart hover2" onclick="addItemToFavorite('${item.itemId}')"></i>
                <i class="ti-shopping-cart hover2" onclick="addItemToCart('${item.itemId}')"></i>
            </div>
            </div>
            `
    });
    mainContent.innerHTML = result;
    //Show number of items to CART ICON
    let itemsInCart = setItemsInCartToSessionStorage();
    document.getElementById('item-number').innerText = itemsInCart.length;
}
function addItemToCart(itemId){
    let userInforList = JSON.parse(localStorage.getItem('userInforList'));
    let logInId = sessionStorage.getItem('logInId');
    let indexOfUser = getIndexOfUserInforInUserInforListById(logInId);

    // console.log('before: ',userInforList);
    let itemsInCart = userInforList[indexOfUser][1];
    if(itemsInCart == null){
        itemsInCart = [];
    }
    itemsInCart.push(itemId);
    userInforList[indexOfUser][1] = itemsInCart;
    // console.log('after: ',userInforList);
    localStorage.setItem('userInforList',JSON.stringify(userInforList));
    document.getElementById('item-number').innerText = itemsInCart.length;
}

function addItemToFavorite(itemId){
    // Do it later. Optional
}
//Session Storage
function setItemsInCartToSessionStorage(){
    let userInforList = JSON.parse(localStorage.getItem('userInforList'));
    let logInId = sessionStorage.getItem('logInId');
    let indexOfUser = getIndexOfUserInforInUserInforListById(logInId);
    let itemsInCart = userInforList[indexOfUser][1];
    if(itemsInCart == null){
        itemsInCart = [];
    }
    sessionStorage.setItem('itemsInCart',JSON.stringify(itemsInCart));
    return itemsInCart;
}