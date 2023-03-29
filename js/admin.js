let id;
let itemName;
let category;
let price;
let imgSource;

let item = {
    id: id,
    name: itemName,
    category: category,
    price: price,
    img: imgSource,
    type: "item"
}




//Change image fnt
function changeImage(image){
    let elementInput = image.files[0];
    console.log(elementInput);
    let result = URL.createObjectURL(elementInput);
    console.log(elementInput.size);
    document.getElementById('image').src = result;
}