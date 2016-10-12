const setCookie = (gamedata) => {
  let jsonString = JSON.stringify(gamedata)
  let cookieString = 'gamesave='+ jsonString + ';expires=10000'
  document.cookie = cookieString
}

const getCookie = () => {
  let savedGameData = ''
  let value = "; " + document.cookie;
  let parts = value.split("; gamesave=");
  if (parts.length == 2) {
    savedGameData = parts.pop().split(";").shift();
  }
  savedGameData = JSON.parse(savedGameData)
  return savedGameData
}
