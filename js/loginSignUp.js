
//***COMMON START */
//define
let eye = document.getElementById('eye');
// let password = document.getElementById('password');
let button = document.getElementById('button');
let validateAlert = document.getElementById('alert');
let tempUserInfor = []; // 0: userId/ 1: fullName/ 2: userName/ 3: email/ 4: password
//Object constructor define
function userObject() {
    this.userId = '';
    this.fullName = '';
    this.userName = '';
    this.email = '';
    this.password = '';
    this.type = "user";
    this.status = "normal"
}
function item() {
    this.itemId = '';
    this.itemName = '';
    this.category = '';
    this.price = '';
    this.img = '';
    this.stock = '';
    this.type = 'item'
}
function itemRatingAndReview() {
    this.itemId = '';
    this.rating = 0;
    this.review = []
}

// password eye toggle
eye.addEventListener('click', eyeToggleFnt);
function eyeToggleFnt() {
    if (password.type == 'password') {
        eye.classList.remove('fa-eye');
        eye.classList.add('fa-eye-slash');
        password.type = 'text';
    } else {
        eye.classList.remove('fa-eye-slash');
        eye.classList.add('fa-eye');
        password.type = 'password';
    }
}

//Enter key pressed
window.addEventListener('keypress',(e)=>{
    if(e.key === "Enter"){
        if(document.title == "Login"){
            validateAndLogin();
        }
        if(document.title == "Sign Up"){
            validateAndSignUp();
        }
    }
})

// COMMON END


//***Start SIGN UP */

// Validate and Sign Up
function validateAndSignUp() {
    tempUserInfor = []; // Reset tempUserInfor
    let userId = randomUserIdGenerator();
    let fullName = document.getElementById('fullName').value;
    let userName = document.getElementById('userName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    divideUserInforList();
    if (randomUserIdGenerator()) {
        if (validateFullName(fullName, 5, 30)) {
            if (validateUserName(userName)) {
                if (ValidateEmail(email)) {
                    if (validatePassword(password, 5, 10)) {                    
                        pushTempUserInforToUserInforList();
                        let message = 'Sign Up Successful !';
                        showSnackBar(message)
                        removeChildListOfUserInforList();
                        window.location.href = "../html/login.html";
                    }
                }
            }
        }
    }
}
function divideUserInforList() {
    let userInforList = JSON.parse(localStorage.getItem('userInforList'));
    let listNameArr = ['userIdList', 'fullNameList', 'userNameList', 'emailList', 'passwordList'];
    let childArrList = [[], [], [], [], []]
    if (userInforList == null) {
        userInforList = [];
        return 0;
    }
    let len = userInforList.length;
    let keyName = Object.keys(userInforList[0][0]);

    childArrList.forEach((childArr, index) => {
        childArrList[index] = userInforList.map((userInfor, i) => {
            return userInfor[0][keyName[index]];
        })
    })
    listNameArr.forEach((listName, index) => {
        listName = localStorage.setItem(listName, JSON.stringify(childArrList[index]));
    })
}
function pushTempUserInforToUserInforList() {
    //tempUserInfor
    // 0: userId/ 1: fullName/ 2: userName/ 3: email/ 4: password
    let userInforList = JSON.parse(localStorage.getItem('userInforList'));
    let user = new userObject();
    let key = Object.keys(user);
    let userInfor = [];
    for (const index in tempUserInfor) {
        user[key[index]] = tempUserInfor[index];
    }
    userInfor.push(user);
    if (userInforList == null) {
        userInforList = [];
    }
    userInforList.push(userInfor);
    localStorage.setItem('userInforList', JSON.stringify(userInforList));
    divideUserInforList();
}
function pushTempUserInforToLocalStorage() {
    let listNameArr = ['userIdList', 'fullNameList', 'userNameList', 'emailList', 'passwordList'];
    for (const i in tempUserInfor) {
        let listName = listNameArr[i];
        listName = JSON.parse(localStorage.getItem(listName));
        if (listName == null) {
            listName = [];
            listName.push(tempUserInfor[i]);
        } else {
            listName.push(tempUserInfor[i]);
        }
        localStorage.setItem(listNameArr[i], JSON.stringify(listName));
    }
    tempUserInfor = []; //Reset array
}
function validateFullName(fullName, lenMin, lenMax) {
    let fullNameList = JSON.parse(localStorage.getItem('fullNameList'));
    validateAlert.innerText = '';
    if (fullName.length < lenMin || fullName.length > lenMax) {
        validateAlert.innerText = `Full Name length should be between ${lenMin} and ${lenMax} characters`;
        return false;
    }
    if (fullNameList == null) {
        fullNameList = [];
    }
    tempUserInfor[1] = fullName;
    return fullName;
}
function validateUserName(userName) {
    let userNameList = JSON.parse(localStorage.getItem('userNameList'));
    validateAlert.innerText = "";

    if (userNameList == null) {
        userNameList = [];
        // userNameList.push(userName);
    } else {
        if (userNameList.includes(userName)) {
            validateAlert.innerText = `Username existed`;
            return false;
        } else {
            // userNameList.push(userName);
        }
    }
    tempUserInfor[2] = userName;
    return userName;
}
function ValidateEmail(email) {
    let emailList = JSON.parse(localStorage.getItem('emailList'));
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
        //check exist or not
        if (emailList == null) {
            emailList = [];
            tempUserInfor[3] = email;
            return email;
        } else {
            if (emailList.includes(email)) {
                validateAlert.innerText = `Email existed`;
                return false;
            } else {
                tempUserInfor[3] = email;
                return email;
            }
        }
    }
    else {
        validateAlert.innerText = "Invalid email address";
        return false;
    }
}
function validatePassword(password, lenMin, lenMax) {
    let passwordList = JSON.parse(localStorage.getItem('passwordList'));
    if (password.length < lenMin || password.length > lenMax) {
        validateAlert.innerText = `password length should be between ${lenMin} and ${lenMax} characters`;
        return false;
    }
    if (passwordList == null) {
        passwordList = [];
    }
    tempUserInfor[4] = password;
    return password;
}
function removeChildListOfUserInforList(){
    let listNameArr = ['userIdList', 'fullNameList', 'userNameList', 'emailList', 'passwordList'];
    listNameArr.forEach(listName => {
        localStorage.removeItem(listName);
    });
}
// Random userID generator
function randomUserIdGenerator() {
    let userIdList = JSON.parse(localStorage.getItem('userIdList'))
    let id;
    if (userIdList == null) {
        userIdList = [];
        id = "u" + Math.floor(Math.random() * 1000000); //1 trieu user
    } else {
        id = "u" + Math.floor(Math.random() * 1000000);
        while (userIdList.includes("id") == true) {
            id = "u" + Math.floor(Math.random() * 1000000);
        }
    }
    tempUserInfor[0] = id;
    return id;
}
//***End SIGN UP */

//***Start LOGIN */
function validateAndLogin() {
    let userNameOrEmail = document.getElementById('input-text').value;
    let userNameList = JSON.parse(localStorage.getItem('userNameList'));
    let emailList = JSON.parse(localStorage.getItem('emailList'));
    let password = document.getElementById('password').value;
    
    if(userNameOrEmail == 'admin' && password == 'admin'){
        let message = 'Login success'
        showSnackBar(message)
        window.location.href = "../html/admin.html";
        sessionStorage.setItem('whoIsLogIn','admin');
        return true;
    }
    if (userNameList.includes(userNameOrEmail) == false && emailList.includes(userNameOrEmail) == false) {
        validateAlert.innerText = 'Username or Email not existed';
        document.getElementById('password').value = '';
        document.getElementById('input-text').innerText = '';
        document.getElementById('input-text').focus();
        return false;
    }
    if (userNameList.includes(userNameOrEmail)) {
        loginValidateUserNameOrEmail(userNameList);
    }
    if (emailList.includes(userNameOrEmail)) {
        loginValidateUserNameOrEmail(emailList);
    }
}
function loginValidateUserNameOrEmail(listName) {
    let userNameOrEmail = document.getElementById('input-text').value;
    let password = document.getElementById('password').value;
    let passwordList = JSON.parse(localStorage.getItem('passwordList'));

    let index = listName.indexOf(userNameOrEmail);
    if (password == passwordList[index]) {
        validateAlert.innerText = '';
        let message = 'Login success'
        showSnackBar(message)
        window.location.href = "../html/index.html";
        sessionStorage.setItem('whoIsLogIn','user');
        return true;
    } else {
        validateAlert.innerText = 'password wrong';
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
        return false;
    }
}
//***End LOGIN */
function test(){
    let message = 'Snack bar test';
    showSnackBar(message);
}