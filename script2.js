var board
var playero = 'o'
var playerx = 'x'
var gameOver = false;
var currplayer =playero



window.onload = function(){
  setGame()
}

function setGame(){
board = [
  [ ' ' , ' ' , ' '],
  [ ' ' , ' ' , ' '],
  [ ' ' , ' ' , ' ']
];
for (let r= 0 ; r<3 ; r++)
  for(let c = 0 ; c<3 ; c++){
let tile = document.createElement("div")
tile.id = r.toString() + '-' + c.toString()
tile.classList.add("tile");
if(r== 0 || r == 1){
  tile.classList.add("horizontal-line")
}
if(c== 0 || c == 1){
  tile.classList.add("vertical-line")
}
// tile.addEventListener("click" , setTile)
document.getElementById("board").appendChild(tile)
}

}


function setTile(){
  if (gameOver)
  {
    return ;

  }

  let coord = this.id.split("-")
  let r = parseInt(coord[0])
  let c = parent(coord[1])
  if (borad[r][c] !=" "){
    return
  }
  board[r][c]= currplayer
  this.innerText = currplayer
}
