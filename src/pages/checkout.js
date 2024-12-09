import '../cart/cartFunctionality.js' // <-- need to display cart items and use buttons
import '../../src/toggleCart.js'
import '../../src/toggleNav.js'

import { getEl, getStorageItem, formatPrice, setStorageItem } from '../../utils.js'

let cart = getStorageItem('cart')
console.log(cart)

const cartItemsContianer = getEl('.checkout-items-container')
const increaseAmountButton = document.querySelectorAll('.cart-item-increase-btn')
const decreaseAmountButton = document.querySelectorAll('.cart-item-decrease-btn')
const cartRmoveButtons = document.querySelectorAll('.cart-item-remove-btn')
const itemsCountDOM = getEl('.cart-items-amount-span')
const cartTotalDOM = getEl('.checkout-header-price')
const amountDueInput = getEl('.amount-due-input')
const clearAllItemsBTN = getEl('.clear-cart-btn')
const cartItemsUL = getEl('.cart-items')
const cartItmeCountNAV = getEl('.cart-item-count')
const cartTotalSideCart = getEl('.cart-total')
const paymentBTN = getEl('.submit-payment-btn')
const clearCartBTN = getEl('.clear-cart-btn') // <-- called ONLY when on the page
const footerDate = getEl('.footer-date')
const date = new Date()
footerDate.innerHTML = ` <span class="footer-copyright" >©</span>  ${date.getFullYear()}`

let cartEmpty

function render() {
   cartItemsContianer.innerHTML = cart
      .map(({ category, image, amount, title, price, id }) => {
         // console.log(formatPrice(price * amount))
         return `
         <article data-id="${id}" class="checkout-item">
         <img class="checkout-item-img" src="${image}" alt="" />
         
         <div class="checkout-item-info">
           <p data-id=${id} class="checkout-item-amount">${amount}</p>
           <p data-id=${id} class="checkout-item-price">${formatPrice(price)}</p>
           <p data-id=${id} class="checkout-item-toatal">${formatPrice(
            price * amount
         )}</p>
         </div>
         <button class="delete-checkout-item-btn">remove</button>
       </article>
        `
      })
      .join(' ')
}

function clearItemsCheckoutAndCart() {
   // clear items from checkout dom
   const checkoutList = cartItemsContianer
   const cartList = cartItemsUL

   // loop to clear all from checkout
   while (checkoutList.firstChild) {
      checkoutList.removeChild(checkoutList.firstChild)
   }
   // loop to clear all from cartlist
   while (cartList.firstChild) {
      cartList.removeChild(cartList.firstChild)
   }
   // remove data array
   localStorage.removeItem('cart')
   resetTotalsRender()

   clearAllItemsBTN.style.display = 'none'
}

function removeItemFromCartDOM(id) {
   const idString = id.toString()
   const cartItems = [...document.querySelectorAll('.cart-item')]
   const itemToFind = cartItems.find((item) => item.dataset.id === idString)
   itemToFind.remove()
   renderStats() // <-- render to reset the clear button
}

// remove from storage
function removeItemFromStorage(id) {
   console.log('the is is -->', id)
   cart = cart.filter((item) => item.id !== id)
   setStorageItem('cart', cart)
}

function getItemsCount() {
   const total = cart.reduce((value, cartItem) => {
      return (value += cartItem.amount)
   }, 0)

   return total
}

function increaseAmount(id) {
   let newAmount
   cart = cart.map((cartItem) => {
      if (cartItem.id === id) {
         newAmount = cartItem.amount + 1
         cartItem = { ...cartItem, amount: newAmount }
      }
      return cartItem
   })

   return newAmount
}

function decreaseAmount(id) {
   let newAmount
   cart = cart.map((cartItem) => {
      if (cartItem.id === id) {
         newAmount = cartItem.amount - 1
         cartItem = { ...cartItem, amount: newAmount }
      }
      return cartItem
   })

   return newAmount
}

function displayCartItemCount() {
   const amountOfItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount)
   }, 0)

   return amountOfItems
}

function displayCartTotal() {
   const totalAmount = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price)
   }, 0)

   return totalAmount
}

increaseAmountButton.forEach((btn) => {
   btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id)
      increaseAmount(id)
      setStorageItem('cart', cart)
      renderStats(id)
      console.log(cart)
   })
})

// **** leave for reference **** //
// if (!newCart.length) {
//    clearAllItemsBTN.style.display = 'none'
// } else {
//    clearAllItemsBTN.style.display = 'block'
// }

// the delete is handled from the other file
decreaseAmountButton.forEach((btn) => {
   btn.addEventListener('click', (e) => {
      const element = e.target
      console.log(btn)
      const id = parseInt(btn.dataset.id)
      // console.log('id-->', id)
      const stringID = id.toString()
      const newAmount = decreaseAmount(id) // <-- uses map to loop and update the value by 1

      renderStats(id)
      if (newAmount < 1) {
         console.log(clearCartBTN)
         clearCartBTN.style.display = 'none'
         removeItemFromStorage(id) // <-- deleted here and checked in render Stats
         const itemToRemove = cartItemsContianer.querySelector(
            `.checkout-item[data-id="${stringID}"]`
         )
         console.log(itemToRemove)

         if (itemToRemove) {
            cartItemsContianer.removeChild(itemToRemove)
            // itemToRemove.remove()
         }
      }
   })
})

// main dom delete
cartItemsContianer.addEventListener('click', (e) => {
   const element = e.target
   const id = parseInt(element.parentElement.dataset.id)
   const domElement = element.parentElement
   if (element.classList.contains('delete-checkout-item-btn')) {
      removeItemFromStorage(id)
      cartItemsContianer.removeChild(domElement)
      removeItemFromCartDOM(id)
      renderStats()
   }
})

// remove button in side cart
cartRmoveButtons.forEach((btn) => {
   btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id
      console.log(e.target, id)
      const cartListItem = document.querySelector(`.checkout-item[data-id="${id}"]`)
      if (cartListItem) {
         cartListItem.remove()
         removeItemFromStorage(parseInt(id))
         setStorageItem('cart')
         renderStats()
      }
   })
})

function renderStats(id) {
   const number = displayCartItemCount()
   const total = displayCartTotal()
   const cartItemCount = getEl('.cart-item-count')
   cartItemCount.innerHTML = getItemsCount()
   itemsCountDOM.innerHTML = `(${number})`
   cartTotalDOM.innerHTML = `Total: ${formatPrice(total)}`
   amountDueInput.value = `${formatPrice(total)}`
   amountDueInput.disabled = true
   cartTotalSideCart.innerHTML = `Total: ${formatPrice(total)}`

   if (id) {
      const amountElement = getEl(`.checkout-item-amount[data-id="${id}"]`)
      const totalAddedElement = getEl(`.checkout-item-toatal[data-id="${id}"]`)

      const item = cart.find((item) => item.id === id)
      if (item) {
         const price = item.price * item.amount
         const amount = item.amount
         totalAddedElement.innerHTML = formatPrice(price)
         amountElement.innerHTML = amount
      }
   }

   if (!cart.length) {
      clearAllItemsBTN.style.display = 'none'
   } else {
      clearAllItemsBTN.style.display = 'block'
   }
}

function resetTotalsRender() {
   // as no cart items as deleted all
   itemsCountDOM.innerHTML = 0
   amountDueInput.value = `£${0}`
   cartItmeCountNAV.innerHTML = 0
   cartTotalSideCart.innerHTML = `Total: £0.00`
   cartTotalDOM.innerHTML = `Total: £0.00`
}

paymentBTN.addEventListener('click', (e) => {
   e.preventDefault()
   const cart = getStorageItem('cart')
   if (cart && cart.length) {
      const redirectLink = `${window.location.origin}/thankyou.html`
      console.log(window.location.origin)
      window.location.href = redirectLink
   }
   console.log(cart)
})

// remove the event listenr
clearAllItemsBTN.addEventListener('click', (e) => {
   console.log(e.target)
   clearItemsCheckoutAndCart()
})

function init() {
   render()
   renderStats()
}

document.addEventListener('DOMContentLoaded', init)

// window.addEventListener('resize', () => {
//    console.log(window.innerWidth)
// })
