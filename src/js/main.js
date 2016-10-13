import $ from 'jquery'
import {Shape, Triangle, Square, Circle, Hexagon} from './shapes.js'

const shapes = []

let total = 0
let addPerInterval = 1
let clickLevel = 1
let clickPrice = 100
  let valueCount = 0

const refreshClickLevel = () => {
  document.getElementById('profit-per-click').innerHTML = ""
  document.getElementById('profit-per-click').insertAdjacentHTML('afterbegin', `${clickLevel}`)
  console.log(`clickLevel refreshed: ${clickLevel}`);
}

const refreshScore = () => {
  document.getElementById('current-score').innerHTML = ""
  document.getElementById('current-score').insertAdjacentHTML('afterbegin', `${total}`)
  console.log(`total refreshed: ${total}`)
}

const refreshPerInterval = () => {
  document.getElementById('profit-per-second').innerHTML = ""
  document.getElementById('profit-per-second').insertAdjacentHTML('afterbegin', `${addPerInterval}`)
  console.log(`addPerInterval refreshed: ${addPerInterval}`)
}

const updateTotal = () => {
  total += parseInt(addPerInterval)
  refreshScore()
  refreshPerInterval()
  refreshClickLevel()
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

const increaseClickLevel = () => {
  clickLevel += 1
}
const upgradeClick = () => {
  increaseClickLevel()
  total -= clickPrice
  clickPrice = clickPrice + (100*clickLevel)
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



const numberOfShape = (type) => {
  const matchShape = (shape) => {
    if(shape.isPrototypeOf(type)){
      console.log('this is the console log');
      return true
    }
  }
  let allOfThisType = shapes.filter(matchShape(shape)))
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

const determineClickValue = () => {
  console.log('this is an empty function');
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
