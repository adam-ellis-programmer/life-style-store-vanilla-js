import { getEl } from '../../utils.js'
import { displayProducts } from '../displayProducts.js'
const dropDown = (store) => {
   const dropDownSelect = getEl('.drop-down-select')
   // prettier-ignore
   const categories = store.reduce((values, item) => {
      if (!values.includes(item.category)) {
         values.push(item.category)
      }
      return values
   }, ['select','all'])

   // use append child with a for looop
   // prettier-ignore
   dropDownSelect.innerHTML  = categories.map((item) =>{
        return ` <option class="shop-drop-down" value="${item}">${item}</option>`
      }).join(' ')

   //  *** leave in for reference *** //
   // dropDownSelect.addEventListener('click', (e) => {
   //    const element = e.target
   //    // console.log(element)
   //    if (element.value === 'select') return
   //    if (element.classList.contains('shop-drop-down')) {
   //       const value = e.target.value
   //       // console.log('value')
   //       let newStore = store.filter((product) => product.category === value)
   //       if (value === 'all') {
   //          displayProducts(getEl('.products-wrapper'), store)
   //       } else {
   //          displayProducts(getEl('.products-wrapper'), newStore.reverse())
   //       }
   //    }

   //    //   console.log(e.target)
   // })

   dropDownSelect.addEventListener('change', (e) => {
      document
         .querySelectorAll('.filter-btn')
         .forEach((btn) => btn.classList.remove('active'))

      const selectedOption = dropDownSelect.selectedOptions[0]
      if (selectedOption) {
         const { value } = selectedOption
         if (value === 'select') return
         let newStore = store.filter((product) => product.category === value)

         if (value === 'all') {
            displayProducts(getEl('.products-wrapper'), store, true)
         } else {
            displayProducts(getEl('.products-wrapper'), newStore.reverse(), true)
         }
      }
   })

   // *** leave for reference *** //
   //   let newStore = store.filter((product) = p)
}

export default dropDown
