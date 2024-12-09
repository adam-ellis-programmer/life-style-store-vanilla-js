import { getEl } from '../../utils.js'
import { formatPrice } from '../../utils.js'
import { displayProducts } from '../displayProducts.js'

const priceFilter = (store) => {
   const priceFilter = getEl('.price-filter')
   const priceValue = getEl('.price-value')

   let maxPrice = store.map((product) => product.price)

   // on filter products we round up to th nearest integer
   maxPrice = Math.max(...maxPrice)
   maxPrice = Math.ceil(maxPrice / 100)

   priceFilter.max = maxPrice
   priceFilter.min = 0
   priceFilter.value = maxPrice

   priceValue.textContent = maxPrice

   priceFilter.addEventListener('input', () => {
      document
         .querySelectorAll('.filter-btn')
         .forEach((btn) => btn.classList.remove('active'))

      const value = +priceFilter.value
      priceValue.textContent = value

      // less than or equal to value (example: 500 / 100 is less than or equal to the value)
      let newStore = store.filter((product) => product.price / 100 <= value)

      displayProducts(getEl('.products-wrapper'), newStore, true)

      if (newStore.length < 1) {
         const productsWrapper = getEl('.products-wrapper')
         productsWrapper.innerHTML =
            '<h3 class="filter-error" > <span> no matching products try again </span> </h3>'
      }
   })
}

// console.log(8999 / 100)

export default priceFilter
