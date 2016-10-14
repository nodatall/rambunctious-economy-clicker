import $ from 'jquery'
import {Shape, Triangle, Square, Circle, Hexagon} from './shapes.js'
import divController from './divController.js'
import swal from 'sweetalert'
import coinAnimation from './animation.js'
import {setCookie, getCookie} from './cookie.js'
import alerts from './alerts.js'


divController()

let shapes = []
let total = 0
let addPerInterval = 1
let clickLevel = 1
let clickPrice = 1
let valueCount = 0
let alertCount = 0
let clickUpgrades = 0

let triangleCounter = 0
let squareCounter = 0
let circleCounter = 0
let hexagonCounter = 0

const refresh = (element, input) => {
  $(element).text(input)
}

const valueUpdater = {
  total: () => { refresh('.current-score', total) },
  clickLevel: () => { refresh('#profit-per-click', clickLevel) },
  addPerInterval: () => { refresh('.profit-per-second', addPerInterval) },
  clickPrice: () => { refresh('#click-price', clickPrice) },
}

const updateTotal = () => {
  total += parseInt(addPerInterval)
  valueUpdater.total()
}

const totalPlusAddPerInterval = () => {
  window.setInterval(updateTotal,1000)
}

const updateAddPerInterval = (shape) => {
  addPerInterval += shape.value
}

const totalPlusClickLevel = () => {
  total += clickValue
}

const alerter = (num) => {
  switch (num) {
    case 0:
      alerts.outOne()
      alertCount += 1
      break;
    case 1:
      alerts.outTwo()
      alertCount += 1
      break;
    case 2:
      alerts.outThree()
      alertCount = 0
      break;
  }
}

const upgradeClick = () => {
  if ((total - clickPrice) < 0 ) {
    alerter(alertCount)
  } else {
    total -= clickPrice
    clickUpgrades +=1
    clickLevel = (clickLevel + Math.ceil(clickUpgrades*.2))
    clickPrice = clickPrice + (3*clickUpgrades)
    valueUpdater.clickPrice()
    valueUpdater.clickLevel()
    valueUpdater.total()
  }
}

const getShape = (type) => {
  switch (type){
    case 'Triangle':
    return new Triangle
    break;
    case 'Square':
    return new Square
    break;
    case 'Circle':
    return new Circle
    break;
    case 'Hexagon':
    return new Hexagon
    break;
  }
}

const buyShape = (type) => {
  let count = document.getElementById(`${type.toLowerCase()}Count`).innerHTML
  count = parseInt(count)
  if (count >= 40) {
    alerts.max()
  } else {
    let shape = getShape(type)
    if (shape.cost > total) {
      alerter(alertCount)
    } else {
      shapes.push(shape)
      updateAddPerInterval(shape)
      total -= shape.cost
      count += 1
      document.getElementById(`${type.toLowerCase()}Count`).innerHTML = `${count}`
      valueUpdater.addPerInterval()
      valueUpdater.total()
    }
  }
}

const enableBuyShape = () => {
  $('#upgrade-click').click( event => upgradeClick() );
  $('#buyTriangle').click( event => buyShape('Triangle'));
  $('#buySquare').click( event => buyShape('Square'));
  $('#buyCircle').click( event => buyShape('Circle'));
  $('#buyHexagon').click( event => buyShape('Hexagon'));
}

const saveState = () => {
  triangleCounter = $('#triangleCount').text()
  squareCounter = $('#squareCount').text()
  circleCounter = $('#circleCount').text()
  hexagonCounter = $('#hexagonCount').text()
  setCookie({
  shapes: shapes,
  total: total,
  addPerInterval: addPerInterval,
  clickLevel: clickLevel,
  clickPrice: clickPrice,
  valueCount: valueCount,
  triangles: triangleCounter,
  squares: squareCounter,
  circles: circleCounter,
  hexagons: hexagonCounter
  })
}

const loadState = () => {
  let state = getCookie()
  shapes = state.shapes
  total = state.total
  addPerInterval = state.addPerInterval
  clickLevel = state.clickLevel
  clickPrice = state.clickPrice
  valueCount = state.valueCount
  triangleCounter = state.triangles
  squareCounter = state.squares
  circleCounter = state.circles
  hexagonCounter = state.hexagons
  $('#triangleCount').text(triangleCounter)
  $('#squareCount').text(squareCounter)
  $('#circleCount').text(circleCounter)
  $('#hexagonCount').text(hexagonCounter)
}

const savePerInterval = () => {
  window.setInterval(saveState, 1000)
}

const beginGame = () => {
  saveState()
  console.log(getCookie())
  totalPlusAddPerInterval()
  savePerInterval()
}

const resumeGame = () => {
  loadState()
  totalPlusAddPerInterval()
  savePerInterval()
  valueUpdater.addPerInterval()
  valueUpdater.total()
  valueUpdater.clickLevel()
  valueUpdater.clickPrice()
}


$(document).ready( () => {
  if (document.cookie.length == 0) {
    $('#resumeGame').hide()
  }
  $('#newGame').click(beginGame)
  $('#resumeGame').click(resumeGame)
  enableBuyShape()
  coinAnimation()
  $('#brick').click( () => {
    total += clickLevel
    valueUpdater.total()
  })
})
