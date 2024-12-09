import { addToCart } from '../src/cart/cartFunctionality.js'
import { formatPrice } from '../utils.js'
const displayProducts = (element, data, filters) => {
   // console.log(data)

   element.innerHTML = data
      .map(({ category, price, count, description, image, rate, title, id }) => {
         return `
            <div class="product-card">
            <a class="link" href="product.html?id=${id}">
            <img src="${image}" alt="Product name" />
            </a>
            <div class="product-content">
              <h3 class="product-name">${title}</h3>
              <h4>  <span class= category-span > ${category} </span>  </h4>
              <p class="product-text">
               ${description}
              </p>
        
              <div class="product-info">
                <span class="price">${formatPrice(price)}</span>
                <button data-id="${id}" class="add-to-cart-btn" >Add to Cart</button>
              </div>

              <div class="product-extra-info">
                <div> <span class='count'> ${count} </span> sold this month</div>
                <div>rating: ${rate}</div>
              </div>
            </div>
          </div>
            `
      })
      .join('')

   if (filters === true) return

   // element is wrapper
   element.addEventListener('click', (e) => {
      const target = e.target
      if (target.classList.contains('add-to-cart-btn')) {
         const id = parseInt(target.dataset.id)
         addToCart(id)
      }
   })
}

export { displayProducts }
