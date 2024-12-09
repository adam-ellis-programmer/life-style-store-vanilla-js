import { getEl } from '../utils.js'

const cartBtn = getEl('.toggle-cart')
const cartCloseBtn = getEl('.cart-close')
const cartOverLay = getEl('.cart-overlay')

cartBtn.addEventListener('click', () => {
   cartOverLay.classList.add('show')
})

cartCloseBtn.addEventListener('click', () => {
   cartOverLay.classList.remove('show')
})

// open programaticly
export const openCart = () => {
   cartOverLay.classList.add('show')
}
