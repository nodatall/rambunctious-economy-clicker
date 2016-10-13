import $ from 'jquery'
import {Shape, Triangle, Square, Circle, Hexagon} from './shapes.js'
import divController from './divController.js'
import swal from 'sweetalert'

divController()

let shapes = []
let total = 0
let addPerInterval = 1
let clickLevel = 1
let clickPrice = 1
let valueCount = 0

const refresh = (id, input) => {
  $(id).text(input)
}

const valueUpdater = {
  total: () => { refresh('#current-score', total) },
  clickLevel: () => { refresh('#profit-per-click', clickLevel) },
  addPerInterval: () => { refresh('#profit-per-second', addPerInterval) },
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

const upgradeClick = () => {
  if ((total - clickPrice) < 0 ) {
    swal({
      title: "OMG WTF",
      text: "You don't have enough money for that... n00b",
      type: "error",
      confirmButtonText: "I promise to not fuck up again"
    })
  } else {
    total -= clickPrice
    clickLevel += 1
    clickPrice = clickPrice + (5*clickLevel)
    valueUpdater.clickPrice()
    valueUpdater.clickLevel()
    valueUpdater.total()
  }
}
$(document).ready( () => {
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

const numberOfShape = (type) => {
  const matchShape = (shape) => {
    if(shape.isPrototypeOf(type)){
      return true
    }
  }
  let allOfThisType = shapes.filter(matchShape(shape))
  console.log(allOfThisType);
  console.log(allOfThisType.length);
  return allOfThisType.length
}

const buyShape = (type) => {
  let shape = getShape(type)
  shapes.push(shape)
  let count = numberOfShape(shape)
  updateAddPerInterval(shape)
  total -= shape.cost
  let nextCost = (parseInt(shape.cost)*Math.floor(10 * Math.pow(1.1, shapes.length)))
  document.getElementById(`buy${type}`).innerHTML = `${nextCost}`
  document.getElementById(`${type.toLowerCase()}Count`).innerHTML = `${count}`

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
