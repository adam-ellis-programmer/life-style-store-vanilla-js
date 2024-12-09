import './src/cart/cartFunctionality.js'
import './src/toggleCart.js'
import './src/toggleNav.js'

import { fetchProducts } from './src/fetchProducts.js'
import { displayProducts } from './src/displayProducts.js'
import { displayFeatured } from './src/displayFeatured.js'
import { setUpStore, store } from './src/store.js'
import { getEl } from './utils.js'
import { changePrice } from './utils.js'

const loadingWrappper = getEl('.loading-div')
const footerDate = getEl('.footer-date')
const date = new Date()
footerDate.innerHTML = ` <span class="footer-copyright" >©</span>  ${date.getFullYear()}`

// store js is being invoked here
const init = async () => {
   const data = await fetchProducts()

   if (data) {
      const storeData = setUpStore(data)
   }

   const featured = store.filter((item) => item.featured === true).slice(0, 6)

   displayFeatured(getEl('.featured-wrapper'), featured)
   loadingWrappper.style.display = 'none'
}

// const featured = store.filter((product) => product.featured === true)
window.addEventListener('DOMContentLoaded', init)

window.addEventListener('resize', () => {
   console.log(window.innerWidth)
})
