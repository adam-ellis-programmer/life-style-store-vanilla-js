// 1:  set up store so we do this once and set them up in local storage
// 2:  to massage the data we do this here
let store = getStorageItem('store') // <--checks
import { changePrice } from '../utils.js'
import { setStorageItem, getStorageItem } from '../utils.js'
// in script js setupstore overides with the ORIGINAL DATA
import extraData from '../extraData.js'

// console.log(store)
function isOnline() {
   return navigator.onLine
}

const onlineStatus = isOnline()

if (onlineStatus) {
   console.log('You are connected to the internet.')
} else {
   console.log('You are offline.')
}
// changePrice(store)
// prettier-ignore
const setUpStore = (products) => {

// this is being called after so changes the original store
   store = products.map((product, i) => {

      if(i % 2 === 0){
         product['featured'] = true
      }
      const {id, price, title, category, description, image, rating:{count, rate}, featured } = product

      return {id, price, category, description, image, count, rate, title, featured }
   })

   store = [...extraData, ...store]
   changePrice(store)
   setStorageItem('store', store)

   // console.log(store)

     // Add extraData to the end of the existing `store` array
//   store.push(...extraData);

   return store
}

const findProduct = (id) => {
   let product = store.find((product) => product.id === id)
   return product
}

export { store, setUpStore, findProduct }
