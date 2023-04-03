function test() {
    // debugger;

}
/*** Window ONLOAD */
window.onload = resetModal();
window.onload = displayItemInventory();

//*** COMMON */
function item() {
    this.itemId = '';
    this.itemName = '';
    this.category = '';
    this.price = '';
    this.stock = '';
    this.imgSource = '';
    this.type = 'item'
}
//Display item
function displayItemInventory() {
    let itemList = JSON.parse(localStorage.getItem('itemList'));
    let inventory = document.getElementById('content-main');
    let result = '';
    if (itemList == null) {
        inventory.innerHTML = 'No item.'
        return false;
    }
    itemList.forEach((item, index) => {
        result += `
        <div class="item">
                        <img class="item-image" src="${item.imgSource}" alt="">
                        <div class="item-infor">
                            <p class="infor-key">
                                <strong><i>ID: </i></strong>
                                <span class="infor-value">${item.itemId}</span>
                            </p>
                        </div>
                        <div class="item-infor">
                            <p class="infor-key">
                                <strong><i>Name: </i></strong>
                                <span class="infor-value">${item.itemName}</span>
                            </p>
                        </div>
                        <div class="item-infor">
                            <p class="infor-key">
                                <strong><i>Category: </i></strong>
                                <span class="infor-value">${item.category}</span>
                            </p>
                        </div>
                        <div class="item-infor">
                            <p class="infor-key">
                                <strong><i>Price: </i></strong>
                                <span class="infor-value">${item.price} $</span>
                            </p>
                        </div>
                        <div class="item-infor item-infor-last">
                            <p class="infor-key">
                                <strong><i>Stock: </i></strong>
                                <span class="infor-value">${item.stock}</span>
                            </p>
                        </div>
                        <div class="button-wrapper">
                            <div class="button delete-button" onclick="deleteItemFromItemList('${item.itemId}')">
                                Delete
                                <i class="fa-regular fa-trash-can"></i>
                            </div>
                            <div class="button edit-button" onclick="openModalEdit('${item.itemId}')">
                                Edit
                                <i class="fa-regular fa-pen-to-square"></i>
                            </div>
                        </div>
                    </div>
                `
    })
    inventory.innerHTML = result;
}
//Delete Item In Inventory
function deleteItemFromItemList(itemId){
    let itemList = JSON.parse(localStorage.getItem('itemList'));
    let itemIdList = itemList.map((item,index)=>{
        return item.itemId;
    })
    itemList.splice(itemIdList.indexOf(itemId),1);
    localStorage.setItem('itemList',JSON.stringify(itemList));
    displayItemInventory()
    return true;
}
//Change image fnt
function selectImage(image) {
    let elementInput = image.files[0];
    let result = URL.createObjectURL(elementInput);
    document.getElementById('motal-image').src = result;

    // push image source to localStorage
    let imgSource = `../assets/img/${elementInput.name}`;
    localStorage.setItem('imgSourceOneTime', JSON.stringify(imgSource));
}
function addItemInforToItemList() {
    //check blank
    let elementIdNameList = ['item-id', 'item-name', 'category', 'price', 'stock']; //we'll push imgSource after
    let itemInforArr = [];
    itemInforArr = elementIdNameList.map((elementIdName, index) => {
        if (document.getElementById(elementIdName).value == '') {
            document.getElementById('modal-alert').innerHTML = `Please fill all the blank`;
        }
        return document.getElementById(elementIdName).value;
    });
    let imgSource = JSON.parse(localStorage.getItem('imgSourceOneTime'));
    itemInforArr.push(imgSource);
    if (itemInforArr.includes('')) {
        return false;
    }
    // debugger;
    //Add infor to itemNew object and save to localStorage
    let itemNew = new item();
    let itemKeys = Object.keys(itemNew);
    itemKeys.forEach((key, index) => {
        if (index >= itemInforArr.length) {
            //do nothing
        } else {
            itemNew[key] = itemInforArr[index];
        }
    })
    let itemList = JSON.parse(localStorage.getItem('itemList'));
    if (itemList == null) {
        itemList = [];
    }
    itemList.push(itemNew);
    localStorage.setItem('itemList', JSON.stringify(itemList));

    displayItemInventory();
    //Show message
    let message = "Add item successed"
    showSnackBar(message);
    //reset modal
    resetModal();
    //Generate item id for next item
    randomItemIdGenerator();
    return itemList;
}
// Random item ID generator
function randomItemIdGenerator() {
    let itemIdList = JSON.parse(localStorage.getItem('itemIdList'))
    let id;
    if (itemIdList == null) {
        itemIdList = [];
        id = "i" + Math.floor(Math.random() * 1000000); //1 trieu item
    } else {
        id = "i" + Math.floor(Math.random() * 1000000);
        while (itemIdList.includes("id") == true) {
            id = "i" + Math.floor(Math.random() * 1000000);
        }
    }
    document.getElementById('item-id').value = id;
    return id;
}
// Jump to shopping page
function jumpToShoppingPage(){
    window.location.href = "../html/index.html"
}
// Modal
function openModal() {
    document.getElementById('modal').style.display = 'flex';
    randomItemIdGenerator();
}
function closeAddModal() {
    document.getElementById('modal').style.display = 'none';
    resetModal();
}
function resetModal() {
    let elementIdNameList = ['item-id', 'item-name', 'category', 'price', 'stock'];
    elementIdNameList.forEach((elementIdName, index) => {
        if (elementIdName != 'category') {
            document.getElementById(elementIdName).value = '';
        }
    })
    document.getElementById('motal-image').src = '';
    document.getElementById('modal-select-btn').value = '';
    let modalFooter = document.getElementById('modal-footer');
    modalFooter.onclick = addItemInforToItemList;
    modalFooter.innerHTML = 'ADD';
    localStorage.removeItem('imgSourceOneTime');
}


//***Edit Item In Inventory****/
function openModalEdit(itemId){
    openModal();
    let modalFooter = document.getElementById('modal-footer');

    modalFooter.onclick = editItem;
    modalFooter.innerHTML = 'SAVE';
    displayItemToEditModal(itemId);
}
function editItem(){
    console.log('editItem() hehe');
    // debugger;
    let elementIdNameList = ['item-id', 'item-name', 'category', 'price', 'stock'];
    let modalIdInput = document.getElementById('item-id');
    let itemList = JSON.parse(localStorage.getItem('itemList'));
    let imgSrc = JSON.parse(localStorage.getItem('imgSourceOneTime'));

    let item = getItemObjectInItemListById(modalIdInput.value);
    let itemIndexInItemList = getIndexOfItemInItemList(item);
    let itemKeys = Object.keys(item);

    elementIdNameList.forEach((elementIdName,index) => {
        item[itemKeys[index]] = document.getElementById(elementIdName).value;
    });
    if(imgSrc== null){

    }else{
        item.imgSource = imgSrc;
    }
    itemList.splice(itemIndexInItemList,1,item);
    localStorage.setItem('itemList',JSON.stringify(itemList));
    //Show item
    displayItemInventory();
    //Show message
    let message = "Save change successed";
    showSnackBar(message);
}
function displayItemToEditModal(itemId){
    let elementIdNameList = ['item-id', 'item-name', 'category', 'price', 'stock', 'motal-image'];
    let itemList = JSON.parse(localStorage.getItem('itemList'));
    let modalIdInput = document.getElementById('item-id');
    
    let item = getItemObjectInItemListById(itemId);
    let itemValue = Object.values(item);

    elementIdNameList.forEach((elementIdName,index)=>{
        if(elementIdName == 'motal-image'){
            document.getElementById(elementIdName).src = itemValue[index];
        } else {
            document.getElementById(elementIdName).value = itemValue[index];
        }
        
    })
    modalIdInput.readOnly = true;

}
// function getItemObjectInItemListById(itemId){
//     let itemList = JSON.parse(localStorage.getItem('itemList'));
//     let modalIdInput = document.getElementById('item-id');
    
//     let itemIdList = itemList.map((item)=>{
//         return item.itemId;
//     })
//     let index = itemIdList.indexOf(itemId);
//     return itemList[index];
// }
// function getIndexOfItemInItemList(item){
//     let itemList = JSON.parse(localStorage.getItem('itemList'));
//     let itemIdList = itemList.map((item)=>{
//         return item.itemId;
//     })
//     return itemIdList.indexOf(item.itemId);
// }