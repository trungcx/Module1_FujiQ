//Snack Bar
function showSnackBar(message) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");
  x.innerText = message;
  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 1500);
}

//function for Item
function getItemObjectInItemListById(itemId) {
  let itemList = JSON.parse(localStorage.getItem('itemList'));
  let modalIdInput = document.getElementById('item-id');

  let itemIdList = itemList.map((item) => {
    return item.itemId;
  })
  let index = itemIdList.indexOf(itemId);
  return itemList[index];
}
function getIndexOfItemInItemList(item) {
  let itemList = JSON.parse(localStorage.getItem('itemList'));
  let itemIdList = itemList.map((item) => {
    return item.itemId;
  })
  return itemIdList.indexOf(item.itemId);
}
//function for User
function getIndexOfUserInforInUserInforListById(id) {
  let userInforList = JSON.parse(localStorage.getItem('userInforList'));
  let checkIdArray = userInforList.map((userInfor,index)=>{
    if(userInfor[0].userId == id){
      return true;
    } else {
      return false;
    }
  });
  return checkIdArray.indexOf(true);
}