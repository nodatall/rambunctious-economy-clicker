
const saveGame = (gameData, daysToExpire) => {
  let jsonString = JSON.stringify(gameData)
  let cookieString = 'savedGame='+ jsonString + ';expires=' + daysToExpire
  document.cookie = cookieString
}

const loadGame = () => {
  let savedGameData = ''
  let value = "; " + document.cookie;
  let parts = value.split("; savedGame=");
  if (parts.length == 2) {
    savedGameData = parts.pop().split(";").shift();
  }
  if (savedGameData == false) {
    return null
  } else {
    return JSON.parse(savedGameData)
  }
}

const clearGameData = () => {
    saveGame("",-1);
}

export { saveGame, loadGame, clearGameData }
