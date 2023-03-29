// COMMON START

let eye = document.getElementById('eye');
let password = document.getElementById('password');
let button = document.getElementById('button');
let validateAlert = document.getElementById('alert');
let tempUserInfor = []; // 0: userId/ 1: fullName/ 2: userName/ 3: email/ 4: password

// let userObject = {
//     userId: userId,
//     fullName: fullName,
//     userName: userName,
//     email: email,
//     password: password,
//     type: "user",
//     status: "normal"
// }


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

    let userObject = {
        userId: userId,
        fullName: fullName,
        userName: userName,
        email: email,
        password: password,
        type: "user",
        status: "normal"
    }
    
    if (randomUserIdGenerator()) {
        if (validateFullName(fullName, 5, 30)) {
            if (validateUserName(userName)) {
                if (ValidateEmail(email)) {
                    if (validatePassword(password, 5, 10)) {
                        pushTempUserInforToLocalStorage();
                    }
                }
            }
        }
    }
}
function pushTempUserInforToLocalStorage(){
    let listNameArr = ['userIdList','fullNameList','userNameList','emailList','passwordList'];
    for (const i in tempUserInfor) {
        let listName = listNameArr[i];
        listName = JSON.parse(localStorage.getItem(listName));
        if(listName == null){
            listName = [];
            listName.push(tempUserInfor[i]);
        } else {
            listName.push(tempUserInfor[i]);
        }
        localStorage.setItem(listNameArr[i],JSON.stringify(listName));
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

