import $ from 'jquery'
let total = 0
let addPerInterval = 1
let clickLevel = 1

const totalPlusAddPerInterval = () => {
  const updateTotal = () => {
    let score = document.getElementById('current-score')
    total += parseInt(addPerInterval)
    score.innerHTML = ""
    score.insertAdjacentHTML('afterbegin', `${total}`)
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
  return clickLevel
}

totalPlusAddPerInterval()
// updateAddPerInterval(2)
