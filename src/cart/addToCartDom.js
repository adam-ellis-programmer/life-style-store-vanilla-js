import { getEl, formatPrice, getStorageItem } from '../../utils.js'
const cart = getStorageItem('cart')

const cartItemsWrapDOM = getEl('.cart-items')

const addToCartDOM = ({ id, amount, image, price, title }) => {
   const article = document.createElement('article')
   article.setAttribute('data-id', id)
   article.classList.add('cart-item')
   article.innerHTML = `
         <img src="${image}" alt="" class="cart-item-img" />
             <div>
                <h5 class="cart-item-name">
                    ${title}
                </h5>
                <p class="cart-item-price">${formatPrice(price)}</p>
                <button class="cart-item-remove-btn" data-id="${id}">remove</button>
             </div>
        <div>
           <div class="cart-item-btn-container">
              <button class="cart-item-increase-btn" data-id="${id}">
                 <i class="fas fa-chevron-up"></i>
              </button>
              <p class="cart-item-amount" data-id="${id}">${amount}</p>
              <button class="cart-item-decrease-btn" data-id="${id}">
                 <i class="fas fa-chevron-down"></i>
              </button>
           </div>
    </div>
    `
   // append one by one
   cartItemsWrapDOM.appendChild(article)
}

export default addToCartDOM
