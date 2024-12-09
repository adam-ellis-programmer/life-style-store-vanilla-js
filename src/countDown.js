import { getEl } from '../utils.js'

const months = [
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December',
]
const weekdays = [
   'Sunday',
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
]

const timeBoxes = document.querySelectorAll('.give-away-format-div h4')
// console.log(timeBoxes)

const giveAwayText = getEl('.giveaway-offer-ends')
const giveawayTimeContainer = getEl('.giveaway-time-container')
const giveawayBTN = getEl('.giveaway-btn')
// y/m/d/h/m/s

let tempDate = new Date()
let tempYear = tempDate.getFullYear()
let tempMonth = tempDate.getMonth()
let tempDay = tempDate.getDate()
console.log(tempDay)

//  + days hours minutes seconcs
let deadLineDate = new Date(tempYear, tempMonth, tempDay + 1, 12, 26, 0)

// let deadLineDate = new Date(2024, 11, 24, 15, 30, 30)
// let deadLineDate = new Date(2024, 3, 22, 11, 0, 30)
// console.log(deadLineDate)

const year = deadLineDate.getFullYear()
const month = months[deadLineDate.getMonth()]
const date = deadLineDate.getDate()
const hours = deadLineDate.getHours()
let minutes = deadLineDate.getMinutes()
const weekDay = weekdays[deadLineDate.getDay()]

function formatMinutes(item) {
   if (item < 10) {
      return (item = `0${item}`)
   }
   return item
}

function formatPm(hours) {
   return hours >= 12 ? 'pm' : 'am'
}

const amPM = formatPm(hours)
giveAwayText.textContent = `offer ends on ${weekDay} ${date} ${month} ${year} ${hours}:${formatMinutes(
   minutes
)} ${amPM}`

// future time in ms
const futureTime = deadLineDate.getTime()
// console.log(futureTime)
// 1s = 1000ms
// 1m = 60s
// 1hr = 60m
// 1d = 24hr

function getTime() {
   const todayTime = new Date().getTime()
   // console.log(todayTime)

   const t = futureTime - todayTime
   // console.log(t)

   //f get milliseconds
   const oneDay = 24 * 60 * 60 * 1000 // ms
   const oneHour = 60 * 60 * 1000 // ms
   const oneMinute = 60 * 1000 // ms

   // calculate and break dowm
   let days = Math.floor(t / oneDay)
   let hours = Math.floor((t % oneDay) / oneHour)
   let minutes = Math.floor((t % oneHour) / oneMinute)
   let seconds = Math.floor((t % oneMinute) / 1000)

   const values = [days, hours, minutes, seconds]

   function format(item) {
      if (item < 10) {
         return (item = `0${item}`)
      }
      // else
      return item
   }

   timeBoxes.forEach((time, i) => {
      // time.innerHTML = values[i]
      time.innerHTML = format(values[i])
   })

   if (t < 0) {
      clearInterval(countdown)
      giveawayTimeContainer.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`
      giveawayBTN.innerHTML = 'sorry no longer available'
      giveawayBTN.style.background = '#ccc'
      giveawayBTN.style.disabled = true
      giveawayBTN.style.transform = 'scale(100%)'
      giveawayBTN.style.cursor = 'default'
   }
}

let countdown = setInterval(getTime, 1000)
// invoked after so we have access to countdown
getTime()

// const test = new Date(2024, 2, 22 + 5)
// console.log(test)
