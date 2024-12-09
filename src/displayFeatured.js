import { formatPrice } from '../utils.js'
const displayFeatured = (element, store) => {
   element.innerHTML = store
      .map(({ image, price, title , id}) => {
         return `
    <article class="featured-card">
    <img src="${image}" alt="" class="featured-img" />

    <div class="featured-text-wrapper">
      <h3 class="featured-h3" >${title}</h3>
      <p class="featured-price">${formatPrice(price)}</p>
      <a class="featured-more-info" href="product.html?id=${id}">more info</a>
    </div>
  </article>
    `
      })
      .join(' ')
}

export { displayFeatured }
