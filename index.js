import { menuArray } from "./data.js"

const container = document.getElementById("container")
const totalId = document.getElementById("total")
const orderContainer = document.getElementById("order-container")
const orderSectionId = document.getElementById("order-section")
const completeOrderBtn = document.getElementById("complete-order-btn")
const cardSection = document.getElementById("card-section")
const confirmation = document.getElementById("confirmation")
const message = document.getElementById("message")
const customerName = document.getElementById("customerName")
const pay = document.getElementById("pay")
const closeBtn = document.getElementById("close")

let renderMenuList = menuArray.map(function(items){

    return `
        <section class = "item" id = "item">
            <div class = "food-section" id = "${items.id}">
                <img src="./images/${items.image}" alt = "image of ${items.name.toLowerCase()}">
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

//Array of ordered items and prices
const orderedFood = []

//order container is hidden by default
orderContainer.style.display = "none"


//Button for adding items to the ordered list
container.addEventListener("click", function(e){
    //Doesn't allow duplicate items..for simplicity
    if (e.target.dataset.foodId){
        if(!orderedFood.includes(menuArray[Number(e.target.dataset.foodId)])){
            orderedFood.push(menuArray[Number(e.target.dataset.foodId)])
        }
        document.getElementById("order-section").innerHTML = renderOrderedList()
        totalId.textContent = `$${totalCost()}`
        document.getElementById("order-container").style.display = "block"
        confirmation.style.display = "none"
    }
   
})

//Button for removing items from the ordered list
orderSectionId.addEventListener("click", function(e){

    if(e.target.dataset.removeId){
        document.getElementById(e.target.dataset.removeId).parentElement.classList.add("hide")
        //remove the object from the orderedFoodarray
        //get the id of the object 
        const idObject = Number(e.target.dataset.removeId.replace("ordered-",""))
        //find the index of the object in orderedFood array
        const removeObjectIndex = orderedFood.findIndex(function(item){
            return item.id === idObject
        })
        //remove the object from the orderedFood array
        orderedFood.splice(removeObjectIndex,1)
        //calculate the new total
        totalId.textContent = `$${totalCost()}`
        //hide order section if the section is empty
        if (orderedFood.length === 0) {
            orderContainer.style.display = "none"
        }
    } 
})


//Button for completing the order and showing the form 
completeOrderBtn.addEventListener("click", function(e){ 
    cardSection.style.display = "block"
})

//Button for paying
pay.addEventListener("click", function(e){
    cardSection.style.display = "none"
    orderContainer.style.display = "none"
    message.textContent = `Thanks, ${customerName.value}! Your order is on it's way!`
    confirmation.style.display = "block"

})

//Button for closing form window
closeBtn.addEventListener("click", function(e){
     cardSection.style.display = "none"
})


function renderOrderedList(){
    return orderedFood.map(function(food){
        return `
            <div class ="ordered-list">
                <div class = "ordered-item" id ="ordered-${food.id}">
                    <h1>${food.name}</h1>
                    <button id="rm-btn" data-remove-id="ordered-${food.id}" data-remove-price="price-${food.id}">remove</button>
                </div>
                <div class = "order-price" id = "price-${food.id}"><h3>$${food.price}</h3></div>
            </div>
        `
    }).join(" ")
}


function totalCost(){
    return orderedFood.reduce(function(total, amount){
        return total + amount.price
    },0)  
}