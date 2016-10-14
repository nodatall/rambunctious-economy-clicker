import $ from 'jquery'
import {Shape, Triangle, Square, Circle, Hexagon} from './shapes.js'
import divController from './divController.js'
import swal from 'sweetalert'
import coinAnimation from './animation.js'
import alerts from './alerts.js'

divController()

let shapes = []
let total = 0
let addPerInterval = 1
let clickLevel = 1
let clickPrice = 1
let valueCount = 0
let alertCount = 0

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
    clickLevel += 1
    clickPrice = clickPrice + (3*clickLevel)
    valueUpdater.clickPrice()
    valueUpdater.clickLevel()
    valueUpdater.total()
  }
}

$(document).ready( () => {
  coinAnimation()
  $('#brick').click( () => {
    total += clickLevel
    valueUpdater.total()
  })
})

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
    swal({
      title: "YOU MUFUCKA ",
      text: "40 is the max amount... fool",
      type: "error",
      confirmButtonText: "I promise to not screw up again",
      allowOutsideClick: true,
    })
  } else {
    let shape = getShape(type)
    if (shape.cost > total) {
      swal({
        title: "OMG WTF",
        text: "You don't have enough money for that... n00b",
        type: "error",
        confirmButtonText: "I promise to not fuck up again",
        allowOutsideClick: true,
      })
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

const beginGame = () => {
  $('#upgrade-click').click( event => upgradeClick() );
  $('#buyTriangle').click( event => buyShape('Triangle'));
  $('#buySquare').click( event => buyShape('Square'));
  $('#buyCircle').click( event => buyShape('Circle'));
  $('#buyHexagon').click( event => buyShape('Hexagon'));
  totalPlusAddPerInterval();
}

$(function(){
  beginGame()
})
