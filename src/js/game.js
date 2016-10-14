import {saveGame, loadGame, clearGameData} from './save.js'
import {Shape, Triangle, Square, Circle, Hexagon} from './shapes.js'
import coinAnimation from './animation.js'
import alerts from './alerts.js'
import $ from 'jquery'

let current = {
  shapes: {
    triangle: 0,
    square: 0,
    circle: 0,
    hexagon: 0
  },
  total: 0,
  profitPerSecond: 1,
  clickLevel: 1,
  clickPrice: 1,
  valueCount: 0,
  alertCount: 0
}

const updateDOM = (element, input) => {
  $(element).text(input)
}

const update = {
  total: () => { updateDOM('.current-score', current.total) },
  clickLevel: () => { updateDOM('#profit-per-click', current.clickLevel) },
  profitPerSecond: () => { updateDOM('.profit-per-second', current.profitPerSecond) },
  clickPrice: () => { updateDOM('#click-price', current.clickPrice) },
  counts: () => {
    updateDOM('#triangleCount', current.shapes.triangle)
    updateDOM('#squareCount', current.shapes.square)
    updateDOM('#circleCount', current.shapes.circle)
    updateDOM('#hexagonCount', current.shapes.hexagon)
  }
}

const updateAll = () => {
  update.total()
  update.clickLevel()
  update.profitPerSecond()
  update.clickPrice()
  update.counts()
}

const incrementTotal = () => {
  current.total += parseInt(current.profitPerSecond)
  update.total()
}

const addShapeToProfit = (shape) => {
  current.profitPerSecond += shape.value
}

const setGameInterval = () => {
  window.setInterval(function () {
    incrementTotal()
    saveGame(current, 10000)
  }, 1000)
}

const alerter = (num) => {
  switch (num) {
    case 0:
      alerts.outOne()
      current.alertCount += 1
      break;
    case 1:
      alerts.outTwo()
      current.alertCount += 1
      break;
    case 2:
      alerts.outThree()
      current.alertCount = 0
      break;
  }
}

const upgradeClick = () => {
  if ((current.total - current.clickPrice) < 0 ) {
    alerter(current.alertCount)
  } else {
    current.total -= current.clickPrice
    current.clickLevel += 1
    current.clickPrice = current.clickPrice + (3*current.clickLevel)
    update.clickPrice()
    update.clickLevel()
    update.total()
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
  let currentType = type.toLowerCase()
  let count = document.getElementById(`${currentType}Count`).innerHTML
  count = parseInt(count)
  if (count >= 40) {
    alerts.max()
  } else {
    let shape = getShape(type)
    if (shape.cost > current.total) {
      alerter(current.alertCount)
    } else {
      current.shapes[currentType] += 1
      console.log(current.shapes)
      addShapeToProfit(shape)
      current.total -= shape.cost
      count += 1
      document.getElementById(`${currentType}Count`).innerHTML = `${count}`
      update.profitPerSecond()
      update.total()
    }
  }
}

const setupInterface = () => {
    let dim = $('#dimmer')
    let buy = $('#buyArea')
  
    // enable screen fade on menu
    dim.click( () => {
      dim.fadeOut()
      buy.fadeOut()
    })
    $('.closeX').click( () => {
      dim.fadeOut()
      buy.fadeOut()
    })
    $('#introScreen button').click( () => {
      dim.fadeOut()
      $('#introScreen').fadeOut();
    })

    // enable buying shapes
    $('#buy-shapes').click( () => {
      dim.delay(1).fadeIn()
      buy.fadeIn()
    })

    $('#upgrade-click').click( event => upgradeClick() );
    $('#buyTriangle').click( event => buyShape('Triangle'));
    $('#buySquare').click( event => buyShape('Square'));
    $('#buyCircle').click( event => buyShape('Circle'));
    $('#buyHexagon').click( event => buyShape('Hexagon'));

}

const enableBrickClicking = () => {
  coinAnimation()
  $('#brick').click( () => {
    current.total += current.clickLevel
    update.total()
  })
}

const startNewGame = () => {
  clearGameData()
  saveGame(current, 10000)
  setGameInterval()
  enableBrickClicking()
}

const resumeGame = () => {
  current = loadGame()
  updateAll()
  setGameInterval()
  enableBrickClicking()
}

export {startNewGame, resumeGame, upgradeClick, setupInterface}