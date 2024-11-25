import { menuArray } from "./data.js"

const container = document.getElementById("container")

let renderMenuList = menuArray.map(function(items){

    return `
        <section class = "item">
            <div class = "food-section" id = "${items.id}">
                <img src="./images/${items.image}" alt = "image of pizza">
                <div>
                    <h1 class = "food-title">${items.name}</h1>
                    <p class = "food-ingredients">${items.ingredients.join(", ")}</p>
                    <h3 class = "food-price">$${items.price}</h3>
                </div>
            </div>   
            <button class ="btn" data-food-id=${items.id}>+</button>       
        </section>
    `
}).join("")

container.innerHTML = renderMenuList

//create an array of ordered items name and price
const orderedFood = []
//order container is hidden
document.getElementById("order-container").style.display = "none"

container.addEventListener("click", function(e){
    //Does not allow duplicate items..for simplicity
    if(!orderedFood.includes(menuArray[Number(e.target.dataset.foodId)])){
        orderedFood.push(menuArray[Number(e.target.dataset.foodId)])
    }
    renderOrderedList()
    document.getElementById("order-section").innerHTML = renderOrderedList()
    totalCost()
    document.getElementById("order-container").style.display = "block" 
    
})


function renderOrderedList(){
    return orderedFood.map(function(items){
        return `
            <div id = "ordered-list">
                <div id = "ordered-item">
                    <h1>${items.name}</h1>
                    <button id="rm-btn">remove</button>
                </div>
                <div class = "order-price"><h3>$${items.price}</h3></div>
            </div>
        `
    }).join(" ")
}

function totalCost(){
    const totalId = document.getElementById("total")
    const total = orderedFood.reduce(function(total, amount){
        return total + amount.price
    },0)
    totalId.textContent = `$${total}`
}