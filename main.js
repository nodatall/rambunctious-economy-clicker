let total = 0
let addPerInterval = 1
let clickLevel = 1

const totalPlusAddPerInterval = () => {
  const updateTotal = () => {
    total += addPerInterval
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

addPerMinute()
updateAddPerInterval(2)
