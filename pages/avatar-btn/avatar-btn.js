let points = 500
let selectedPrice = 0
let selectedItem = null

function selectItem(img,price){

selectedItem = img
selectedPrice = price

}

function buyItem(){

if(selectedItem == null) return

if(points >= selectedPrice){

points -= selectedPrice

document.getElementById("points").innerText = points

document.getElementById("catAvatar").src = selectedItem

}

else{

alert("No tienes suficientes puntos")

}

}