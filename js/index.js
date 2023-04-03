window.onload = displayItemInItemList();
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
                <i class="ti-heart hover2"></i>
                <i class="ti-shopping-cart hover2"></i>
            </div>
            </div>
            `
    });
    mainContent.innerHTML = result;
}