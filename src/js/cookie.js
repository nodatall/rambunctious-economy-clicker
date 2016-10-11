const setCookie = (gamedata) => {
  let jsonString = JSON.stringify(gamedata)
  let cookieString = 'gamesave='+ gamedata + ';expires=10000'
  document.cookie = cookieString
}

const getCookie = (cookie) => {
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
}
