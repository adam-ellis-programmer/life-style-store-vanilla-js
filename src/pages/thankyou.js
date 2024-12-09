import { store } from '../../src/store.js'

import { formatPrice, getEl, getStorageItem } from '../../utils.js'

const cart = getStorageItem('cart')
const reciptTotal = getEl('.recipt-total-text')
console.log(cart)

function sumUpCart() {
   const amount = cart.reduce((value, cartItem) => {
      return (value += cartItem.amount * cartItem.price)
   }, 0)

   return amount
}

const reciptContainer = getEl('.recipt-container')

reciptContainer.innerHTML = cart
   .map(({ category, price }) => {
      return `
    <article class="recipt-item">
    <p class="recipt-item-name">${category}</p>
    <p class="recipt-item-name">${formatPrice(price)}</p>
 </article>
    `
   })
   .join(' ')

reciptTotal.innerHTML = `Total: ${formatPrice(sumUpCart())}`
