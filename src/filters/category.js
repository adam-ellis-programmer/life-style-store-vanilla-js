import { getEl } from '../../utils.js'
import { displayProducts } from '../displayProducts.js'
// Get the current URL search params

const categoriesButtonFilter = (store) => {
   const dropDownSelect = getEl('.drop-down-select')
   const categories = ['all', ...new Set(store.map((product) => product.category))]

   console.log(categories)
   const filterContainer = getEl('.filter-buttons-container')
   filterContainer.innerHTML = categories
      .map((category) => {
         return ` <button class="filter-btn">${category}</button>`
      })
      .join(' ')

   //   prettier-ignore
   filterContainer.addEventListener('click', (e) => {
      const element = e.target
      console.log(element)
      if (element.classList.contains('filter-btn')) {
         document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
         element.classList.add('active');
         
         let newStore = []
         if (element.textContent === 'all') {
            newStore = [...store]
            const options = dropDownSelect.querySelectorAll("option");
            dropDownSelect.value = 'select'
         } else {
            newStore = store.filter((product) => product.category === element.textContent).reverse()
            dropDownSelect.value = 'select'
         }
        // displays the products from newStore regardless
         displayProducts(getEl('.products-wrapper'), newStore, true)
      }
   })
}

export default categoriesButtonFilter
