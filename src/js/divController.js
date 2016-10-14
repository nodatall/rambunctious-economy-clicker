import $ from 'jquery'
import cookie from './cookie.js'

const divController = () => {
  $(document).ready( () => {
    let dim = $('#dimmer')
    let buy = $('#buyArea')
    $('#buy-shapes').click( () => {
      dim.delay(1).fadeIn()
      buy.fadeIn()
    })
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
  })
}

export default divController
