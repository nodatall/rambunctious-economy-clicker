class Shape {
  constructor () {
  }
}

class Triangle extends Shape {
  constructor () {
    super()
    this.cost = 100
    this.color = 'yellow'
    this.value = 1
  }
}

class Square extends Shape {
  constructor () {
    super()
    this.cost = 400
    this.color = 'green'
    this.value = 3
  }
}

class Circle extends Shape {
  constructor () {
    super()
    this.cost = 800
    this.color = 'blue'
    this.value = 9
  }
}

class Hexagon extends Shape {
  constructor () {
    super()
    this.cost = 1600
    this.color = 'pink'
    this.value = 27
  }
}

export {Shape, Triangle, Square, Circle, Hexagon}
