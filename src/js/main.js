import $ from 'jquery'
import {saveGame, loadGame, clearGameData} from './save.js'
import {startNewGame, resumeGame, upgradeClick, setupInterface} from './game.js'

const loadApp = () => {
  console.log('app loading...')
  if (loadGame() == null) {
    $('#resumeGame').hide()
  }
  setupInterface()
  $('#newGame').click(startNewGame)
  $('#resumeGame').click(resumeGame)
}

$(window).on("load", loadApp)

  // $('#newGame').click(beginGame)
  // $('#resumeGame').click(resumeGame)