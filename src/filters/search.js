import { getEl } from '../../utils.js'
import { displayProducts } from '../displayProducts.js'
const searchBTN = getEl('.search-btn')

// prettier-ignore
const search = (store) => {
   const form = getEl('.search-input-form')

   form.addEventListener('keyup', () => {
      document.querySelectorAll('.filter-btn').forEach((btn) => btn.classList.remove('active'))
      const searchInput = getEl('.search-bar')
      const value = searchInput.value.toLowerCase()

      if (value) {
         const newStore = store.filter((product) => {
            let { title } = product
            title = title.toLowerCase()

            if (title.includes(value)) {
               return product
            }
         })
         // 
         // 
         console.log(newStore)
         displayProducts(getEl('.products-wrapper'), newStore, true)
         
         if(newStore.length < 1){
            const productsWrapper = getEl('.products-wrapper')
            productsWrapper.innerHTML = '<h3 class="filter-error" > <span> no matching products try again </span> </h3>'
         }
      } else {
         displayProducts(getEl('.products-wrapper'), store, true)
      }
   })
}

searchBTN.addEventListener('click', (e) => e.preventDefault())

export default search
