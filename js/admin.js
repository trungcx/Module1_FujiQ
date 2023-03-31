function test() {
    // debugger;

}

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
                            <div class="button edit-button">
                                Edit
                                <i class="fa-regular fa-pen-to-square"></i>
                            </div>
                        </div>
                    </div>
                `
    })
    inventory.innerHTML = result;
}
//Edit Item In Inventory
function editItem(index){
    
}
//Delete Item In Inventory
function deleteItemFromItemList(itemId){
    console.log('delete here');
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
    randomItemIdGenerator();
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
// Modal
function openModal() {
    document.getElementById('modal').style.display = 'flex';
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
}