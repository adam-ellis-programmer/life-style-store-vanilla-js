import '../toggleCart.js'
import '../toggleNav.js'

import { getEl } from '../../utils.js'
import { addToCart } from '../cart/cartFunctionality.js'
import { formatPrice } from '../../utils.js'
import { store } from '../store.js'
import { changePrice } from '../../utils.js'

const loading = getEl('.loading-div')
const sectionCenter = getEl('.product-info-section')
const productIMG = getEl('.single-product-img')
const productTitle = getEl('.single-product-title')
const productText = getEl('.single-product-text')
const productPrice = getEl('.single-product-price')
const cartBtn = getEl('.add-single-product-to-cart')

changePrice(store)
const init = () => {
   let productID
   // const urlID = window.location.search.slice(4)
   const urlParams = new URLSearchParams(window.location.search)
   if (urlParams) {
      const urlID = urlParams.get('id')
      const product = store.find((product) => product.id === +urlID)

      if (product) {
         const { category, description, image, title, price, id } = product
         productID = id
         productIMG.src = image
         productTitle.innerText = title
         productText.innerText = description
         productPrice.innerText = formatPrice(price)
      } else {
         sectionCenter.innerHTML = `
      <p class="product-error-h4"> something went wrong </p>
      <a class="error-back-shopping" href = "products.html" >back shopping</a>
      `
      }
      loading.style.display = 'none'

      cartBtn.addEventListener('click', () => {
         console.log(productID)
         addToCart(productID)
      })
   }
}

window.addEventListener('DOMContentLoaded', init)

window.addEventListener('resize', () => {
   console.log(window.innerWidth)
})
