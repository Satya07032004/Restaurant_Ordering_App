import {menuArray} from './data.js'
let orderArr = []

document.addEventListener('click', (e)=> {
    if(e.target.dataset.id) {
        handleAddClick(e.target.dataset.id)
    } else if (e.target.id === 'complete-btn') {
        document.getElementById('payment-modal').classList.remove('hidden')
    }
     else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove);
    }
})

function handleAddClick(itemId) {
    const existingItem = orderArr.find((item) => {
        return item.id === Number(itemId)
    })

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        const arrItemObj = menuArray.find((item) => {
            return item.id === Number(itemId)
        })
        
      orderArr.push({ ...arrItemObj, quantity: 1 })
    }
    
    renderOrder()
}

function handleRemoveClick(index) {
    orderArr.splice(Number(index), 1);
        renderOrder();
}

function renderOrder() {
    let orderHtml = `<h2>Your Order</h2>`
    let totalPrice = 0
    
    orderArr.forEach((order, index) => {
        totalPrice += (order.price * order.quantity)
        
        orderHtml += `
        <div class="order-item">
            <p>
                <b>${order.name}</b> (x${order.quantity}) 
                <button data-remove="${index}">remove</button>
            </p> 
            <p>$${order.price * order.quantity}</p>
        </div>
        `
    })
    
    orderHtml += `<hr class="totalHr"/>
    <h3>Total: $${totalPrice}</h3>`
    
    if (orderArr.length > 0) {
        orderHtml += `<button id='complete-btn' class='paymentBtn'>Complete Order</button>`
    } 
    document.getElementById('orderContainer').innerHTML = orderHtml 
}

function renderMenu(menuArray) {
    let itemHtml = ''
    menuArray.map((menu)=> {
        const{name, ingredients, price, id, emoji} = menu
        itemHtml += `
                  <div class='item'>
                    <p class='emoji'>${emoji}</p>
                    <div class='info'>
                        <h2>${name}</h2>
                        <p>${ingredients}</p>
                        <p>$${price}</p>
                    </div>
                    <button class='add-btn' data-id='${id}'>+</button>
                  </div>
                  <hr class='divider'/>
        `
    })
    return itemHtml
}

document.getElementById('payment-form').addEventListener('submit', (e) => {
    e.preventDefault() 
    document.getElementById('payment-modal').classList.add('hidden')
    
    orderArr = []
    document.getElementById('orderContainer').innerHTML = `
        <div class="success-message">
            <h2>Thanks, your order is on its way!</h2>
        </div>
    `
})

document.getElementById('itemContainer').innerHTML = renderMenu(menuArray)
