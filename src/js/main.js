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
  window.document.getElementById('profit-per-second').insertAdjacentHTML('afterbegin', `${addPerInterval}`)
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



const buyShape = (shape) => {
  console.log(shape);
  switch (shape){
    case 'Triangle':
    shapes.push(new Triangle)
    break;
    case 'Square':
    shapes.push(new Square)
    break;
    case 'Circle':
    shapes.push(new Circle)
    break;
    case 'Hexagon':
    shapes.push(new Hexagon)
    break;
  }
  console.log(shapes);
}

const determineClickValue = () => {
  console.log('this is an empty function');
}

const beginGame = () => {
  $('#upgrade-click').click( event => upgradeClick() );
  $('#buy-shapes').click( event => buyShape('Triangle'));
  totalPlusAddPerInterval();
}

$(function(){
  beginGame()
})
