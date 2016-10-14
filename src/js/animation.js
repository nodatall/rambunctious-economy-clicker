import $ from 'jquery'

const coinAnimation = () => {
      $('#brick').click(function(e){
          let id = 'a' + Math.floor(Math.random() * 10000)
          let x = e.pageX - 15 + 'px'
          let y = e.pageY - 35 + 'px'
          let img = $('<img src="./src/images/awesomeCoin.png">')
          let div = $('<div class="coin" id='+id+'>').css({
              "position": "absolute",
              "left": x,
              "top": y
          })
          div.append(img)
          $(document.body).append(div)
          let newCoin = $(`#${id}`)

          let randNum = Math.random()*50
          let otherRand = Math.random()
          let addOrMinus = '-'
          if (otherRand > .5) {addOrMinus = '+'}

          newCoin.animate({
            top: "-=150px"
          }, { queue: false, duration: 300 })
          newCoin.animate({
            left: `${addOrMinus}=${randNum}px`
          }, { queue: false, duration: 300 })
          newCoin.fadeOut({queue: false, duration: 300}).promise().done( () => {
            newCoin.remove()
          })
          $('#brick').addClass('brickWiggle')
          setTimeout(function() {
              $('#brick').removeClass('brickWiggle')
          }, 50);
      })
}
export default coinAnimation
