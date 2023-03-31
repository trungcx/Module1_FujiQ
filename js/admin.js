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
function displayItemInventory(){
    
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

    //Show message
    let message = "Add item successed"
    showSnackBar(message);
    //reset modal
    resetModal();
    return itemList;
}

// Random itemID generator
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