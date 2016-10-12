let total = 0
let addPerInterval = 1
let clickLevel = 1
import {Shape, Triangle, Square, Circle, Hexagon} from './shapes.js'
const shapes = []

const totalPlusAddPerInterval = () => {
  const updateTotal = () => {
    let score = document.getElementById('current-score')
    total += parseInt(addPerInterval)
    document.getElementById('current-score').innerHTML = ""
    document.getElementById('current-score').insertAdjacentHTML('afterbegin', `${total}`)
    document.getElementById('profit-per-second').innerHTML = ""
    document.getElementById('profit-per-second').insertAdjacentHTML('afterbegin', `${addPerInterval}`)
    document.getElementById('profit-per-click').innerHTML = ""
    document.getElementById('profit-per-click').insertAdjacentHTML('afterbegin', `${clickLevel}`)
  }
  window.setInterval(updateTotal,1000)

}

const updateAddPerInterval = (sumOfPurchasedUnits) => {
  addPerInterval += sumOfPurchasedUnits
}

const totalPlusClickLevel = () => {
  total += clickLevel
}

const increaseClickLevel = () => {
  clickLevel
}

const buyShape = (shape) => {

}


totalPlusAddPerInterval()
updateAddPerInterval(2)
