import '../countDown.js'
import '../toggleNav.js'
import '../toggleCart.js'

import { setUpStore, store } from '../store.js'

import { getEl, getStorageItem, changePrice } from '../../utils.js'
import { displayProducts } from '../displayProducts.js'
import search from '../filters/search.js'
import categoriesButtonFilter from '../filters/category.js'
import priceFilter from '../filters/price.js'
import dropDown from '../filters/dropDown.js'
import { fetchProducts } from '../fetchProducts.js'

const pageLaoding = getEl('.loading-div')
const footerDate = getEl('.footer-date')
const date = new Date()
footerDate.innerHTML = ` <span class="footer-copyright" >©</span>  ${date.getFullYear()}`

async function init() {
   if (store.length < 1) {
      const products = await fetchProducts()
      console.log(products)
      setUpStore(products)
   }
   console.log(store)

   //  changePrice(store)
   search(store)
   categoriesButtonFilter(store)
   priceFilter(store)
   dropDown(store)
   displayProducts(getEl('.products-wrapper'), store)

   pageLaoding.style.display = 'none'
}

window.addEventListener('DOMContentLoaded', init)

// window.addEventListener('resize', () => {
//    console.log(window.innerWidth)
// })
