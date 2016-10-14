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
          newCoin.animate({
            top: "-=150px"
          }, 300)
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
