//Snack Bar
function showSnackBar(message) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");
  x.innerText = message;
  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 2000);
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

/**
 * @param    'mainCart', 'favorite', 'saved', 'buyAgain' =>chose one
 * @returns Array of Item Object in itemList by logInId
 */
function getItemObjectInItemListByLoginId(whatCart) {
  let cartNameArr = ['mainCart', 'favorite', 'saved', 'buyAgain'];
  let userInforList = JSON.parse(localStorage.getItem('userInforList'));
  let itemList = JSON.parse(localStorage.getItem('itemList'));
  let logInId = sessionStorage.getItem('logInId');
  // debugger;
  let userInfor = userInforList.find(userInfor => {
    return userInfor[0].userId == logInId;
  });
  let indexOfCartInUserInfor = cartNameArr.indexOf(whatCart) + 1;
  let myCart = userInfor[indexOfCartInUserInfor]; //Array of itemId
  let itemsInCart = myCart.map(id=>{
    return itemList.find(item=>{
      return item.itemId == id;
    })
  });
  return itemsInCart;
}
//function for User
function getIndexOfUserInforInUserInforListById(id) {
  let userInforList = JSON.parse(localStorage.getItem('userInforList'));
  let checkIdArray = userInforList.map((userInfor, index) => {
    if (userInfor[0].userId == id) {
      return true;
    } else {
      return false;
    }
  });
  return checkIdArray.indexOf(true);
}