import { dataUrl } from '../utils.js'

const fetchProducts = async () => {
   try {
      const response = await fetch(dataUrl)
      const data = await response.json()

      return data
   } catch (error) {
      console.log(error)
   }
}

export { fetchProducts }
