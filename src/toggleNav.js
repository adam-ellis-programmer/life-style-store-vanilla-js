import { getEl } from '../utils.js'

const navBtn = getEl('.toggle-nav')
const mobileNav = getEl('.side-links-container')
const toggleNavInner = getEl('.toggle-nav-inner')

navBtn.addEventListener('click', () => {
   mobileNav.classList.toggle('show')
})
toggleNavInner.addEventListener('click', () => {
   mobileNav.classList.toggle('show')
})


