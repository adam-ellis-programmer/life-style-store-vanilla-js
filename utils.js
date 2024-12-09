// query selector
const getEl = (selection) => {
   const element = document.querySelector(selection)
   if (element) return element

   throw new Error(`Please check "${selection}" selector, no such element exist`)
}

const dataUrl = 'https://fakestoreapi.com/products'

const getStorageItem = (item) => {
   let storageItem = localStorage.getItem(item)
   if (storageItem) {
      storageItem = JSON.parse(localStorage.getItem(item))
   } else {
      // if item is not in local storage
      storageItem = []
   }

   return storageItem
}

const setStorageItem = (name, item) => {
   localStorage.setItem(name, JSON.stringify(item))
}

const formatPrice = (price) => {
   let formatedPrice = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
   }).format((price / 100).toFixed(2))

   return formatedPrice
}

function isOnline() {
   return navigator.onLine
}

//  const onlineStatus = isOnline();

//  if (onlineStatus) {
//    console.log("You are connected to the internet.");
//  } else {
//    console.log("You are offline.");
//  }

// passed im as cemts and pennies
const changePrice = (products) => {
   products[0].price = 348999
   products[1].price = 11782
   products[2].price = 234299
   products[3].price = 214595
   products[4].price = 17990
   products[5].price = 8330
   products[6].price = 22940
   products[7].price = 5499
   products[8].price = 7999
   products[9].price = 8999
   products[10].price = 4999
   products[11].price = 9999
   products[12].price = 232939
   products[13].price = 332939
   products[14].price = 19999
   products[15].price = 34999
   products[16].price = 27999
   products[17].price = 2999
   products[18].price = 227999
   products[19].price = 27999
   products[20].price = 27999
   products[21].price = 27999
   products[22].price = 27999
   products[23].price = 27999
   products[24].price = 299112
}

export {
   getEl,
   dataUrl,
   getStorageItem,
   setStorageItem,
   changePrice,
   formatPrice,
   isOnline,
}
