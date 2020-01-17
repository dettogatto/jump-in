import React from 'react';
import Cell from './Cell';
import ControlPanel from './ControlPanel';
import LinkSharer from './LinkSharer';
import './App.css';


/*
Game States:
0 -> Building the board
1 -> Building the board and placing something
*/

class App extends React.Component {
  constructor(props){

    super(props);

    this.state = {
      width: 5,
      height: 5,
      gameState: -1,
      placing: null,
      cssGrid: null,
      lastClickedCellX: null,
      lastClickedCellY: null,
      totMoves: 0,
      mat: []
    }

    this.newGame = this.newGame.bind(this);
    this.exeControl = this.exeControl.bind(this);
    this.aCellWasClicked = this.aCellWasClicked.bind(this);
    this.placeStuff = this.placeStuff.bind(this);
    this.mat2link = this.mat2link.bind(this);
  }

  componentDidMount(){
    this.newGame();
  }

  newGame() {
    var res = []
    var newGrid = []
    let link = this.getLink().split('')

    for(var i=0; i < this.state.height; i++) {
      for(var j=0; j < this.state.width; j++) {
        switch(link.shift()){
          case "r":
          res.push({y: i, x: j, content: "rabbit"})
          break
          case "h":
          res.push({y: i, x: j, content: "hole"})
          break
          case "g":
          res.push({y: i, x: j, content: "rhole"})
          break
          case "m":
          res.push({y: i, x: j, content: "mushroom"})
          break
          case "1":
          res.push({y: i, x: j, content: "hfh"})
          break
          case "2":
          res.push({y: i, x: j, content: "hft"})
          break
          case "3":
          res.push({y: i, x: j, content: "vfh"})
          break
          case "4":
          res.push({y: i, x: j, content: "vft"})
          break
          default:
          res.push({y: i, x: j, content: null})
          break
        }
      }
    }
    for(i = 0; i < this.state.width; i++){
      newGrid.push("auto");
    }
    this.setState({
      mat: [res],
      gameState: 0,
      cssGrid: newGrid.join(" "),
      lastClickedCellX: null,
      lastClickedCellY: null,
      totMoves: 0
    });
  }

  exeControl(state, place = "") {
    if (state === 0) {
      this.removeLinkFromURL()
      this.newGame();
    } else if(state === 101) {
      if(this.state.totMoves > 0){
        this.setState({totMoves: this.state.totMoves - 1})
      }
    } else if(state === 102) {
      if(this.state.totMoves < this.state.mat.length - 1){
        this.setState({totMoves: this.state.totMoves + 1})
      }
    } else if(state === 103) {
      this.setState({totMoves: 0})
    }
    else {
      this.setState({gameState: state, placing: place})
    }
  }

  placeStuff(x, y) {
    if (this.state.placing === "fox") {
      this.setState({lastClickedCellX: x, lastClickedCellY: y, placing: "fox2", gameState: 1})
    } else if (this.state.placing === "fox2") {
      let lx = this.state.lastClickedCellX
      let ly = this.state.lastClickedCellY
      if( lx === x && Math.abs(ly-y) === 1 ) { // vertical fox
        let max = Math.max(ly, y)
        let tmpMat = this.state.mat[0]
        tmpMat[x+max*this.state.width].content = "vfh"
        tmpMat[x+(max-1)*this.state.width].content = "vft"
        this.setState({lastClickedCellX: x, lastClickedCellY: y, mat: [tmpMat], placing: null, gameState: 0})
      } else if ( ly === y && Math.abs(lx-x) === 1 ) { // horizontal fox
        let max = Math.max(lx, x)
        let tmpMat = this.state.mat[0]
        tmpMat[max+y*this.state.width].content = "hfh"
        tmpMat[max-1+y*this.state.width].content = "hft"
        this.setState({lastClickedCellX: x, lastClickedCellY: y, mat: [tmpMat], placing: null, gameState: 0})
      }
    } else {
      let tmpMat = this.state.mat[0]
      let coo = x+y*this.state.width
      let toPlace = (this.state.placing !== "" ? this.state.placing : null)
      if (tmpMat[coo].content === "vfh") {
        tmpMat[coo-this.state.width].content = null
      } else if (tmpMat[coo].content === "vft") {
        tmpMat[coo+this.state.width].content = null
      } else if (tmpMat[coo].content === "hfh") {
        tmpMat[coo-1].content = null
      } else if (tmpMat[coo].content === "hft") {
        tmpMat[coo+1].content = null
      } else if (tmpMat[coo].content === "hole" && toPlace === "rabbit") {
        toPlace = "rhole"
      }
      tmpMat[coo].content = toPlace
      this.setState({lastClickedCellX: x, lastClickedCellY: y, mat: [tmpMat], placing: null, gameState: 0})
    }
  }

  moveStuff(x, y) {
    let lx = this.state.lastClickedCellX
    let ly = this.state.lastClickedCellY
    let lcoo = lx+ly*this.state.width
    let coo = x+y*this.state.width
    let mat = JSON.parse(JSON.stringify(this.state.mat[this.state.totMoves]))
    if(lcoo === coo) {
      this.setState({gameState: 2})
    } else {
      if( this.isValidMove(lx, ly, x, y) ) {
        if(mat[lcoo].content === "rabbit"){
          mat[lcoo].content = null
          if(mat[coo].content === "hole"){mat[coo].content = "rhole"}
          else{mat[coo].content = "rabbit"}
        } else if(mat[lcoo].content === "rhole"){
          mat[lcoo].content = "hole"
          if(mat[coo].content === "hole"){mat[coo].content = "rhole"}
          else{mat[coo].content = "rabbit"}
        } else if(mat[lcoo].content === "hfh"){
          mat[lcoo].content = null
          mat[lcoo-1].content = null
          mat[coo].content = "hfh"
          mat[coo-1].content = "hft"
        } else if(mat[lcoo].content === "hft"){
          mat[lcoo].content = null
          mat[lcoo+1].content = null
          mat[coo].content = "hft"
          mat[coo+1].content = "hfh"
        } else if(mat[lcoo].content === "vfh"){
          mat[lcoo].content = null
          mat[lcoo-this.state.width].content = null
          mat[coo].content = "vfh"
          mat[coo-this.state.width].content = "vft"
        } else if(mat[lcoo].content === "vft"){
          mat[lcoo].content = null
          mat[lcoo+this.state.width].content = null
          mat[coo].content = "vft"
          mat[coo+this.state.width].content = "vfh"
        }
        let newMat = this.state.mat.slice(0, this.state.totMoves + 1)
        newMat.push(mat)
        this.setState({gameState: 2, mat: newMat, totMoves: (this.state.totMoves + 1)})
      } else {
        this.setState({gameState: 2})
      }
    }
  }

  isValidMove(lx, ly, nx, ny) {
    let lcoo = lx+ly*this.state.width
    let ncoo = nx+ny*this.state.width
    let specimen = this.state.mat[this.state.totMoves][lcoo].content
    let onTheRoad = []

    if(this.state.mat[this.state.totMoves][ncoo].content !== null && this.state.mat[this.state.totMoves][ncoo].content !== "hole"){
      return false
    }

    if(lx === nx){ // vertical move
      for(let i = Math.min(ny, ly) + 1; i < Math.max(ny, ly); i++){
        onTheRoad.push(lx+i*this.state.width)
      }
    } else if(ly === ny){ // horizontal move
      for(let i = Math.min(nx, lx) + 1; i < Math.max(nx, lx); i++){
        onTheRoad.push(ly*this.state.width+i)
      }
    }

    if(specimen === "rabbit" || specimen === "rhole"){
      if(onTheRoad.length < 1){return false}
      for(let otr of onTheRoad){
        if(this.state.mat[this.state.totMoves][otr].content === null || this.state.mat[this.state.totMoves][otr].content === "hole"){
          return false
        }
      }
    } else if(specimen === "hfh") {
      if(ly !== ny || nx < 1){return false}
      if(nx > lx){
        for(let otr of onTheRoad){
          if(this.state.mat[this.state.totMoves][otr].content !== null){ return false }
        }
        if(this.state.mat[this.state.totMoves][ncoo].content !== null){ return false }
      } else {
        onTheRoad.pop()
        for(let otr of onTheRoad){
          if(this.state.mat[this.state.totMoves][otr].content !== null){ return false }
        }
        if(this.state.mat[this.state.totMoves][ncoo-1].content !== null){ return false }
      }
    } else if(specimen === "hft") {
      if(ly !== ny || nx > this.state.width-2){return false}
      if(nx < lx){
        for(let otr of onTheRoad){
          if(this.state.mat[this.state.totMoves][otr].content !== null){ return false }
        }
        if(this.state.mat[this.state.totMoves][ncoo].content !== null){ return false }
      } else {
        onTheRoad.shift()
        for(let otr of onTheRoad){
          if(this.state.mat[this.state.totMoves][otr].content !== null){ return false }
        }
        if(this.state.mat[this.state.totMoves][ncoo+1].content !== null){ return false }
      }
    } else if(specimen === "vfh") {
      if(lx !== nx || ny < 1){return false}
      if(ny > ly){
        for(let otr of onTheRoad){
          if(this.state.mat[this.state.totMoves][otr].content !== null){ return false }
        }
        if(this.state.mat[this.state.totMoves][ncoo].content !== null){ return false }
      } else {
        onTheRoad.pop()
        for(let otr of onTheRoad){
          if(this.state.mat[this.state.totMoves][otr].content !== null){ return false }
        }
        if(this.state.mat[this.state.totMoves][ncoo-this.state.width].content !== null){ return false }
      }
    } else if(specimen === "vft") {
      if(lx !== nx || ny > this.state.height-2){return false}
      if(ny < ly){
        for(let otr of onTheRoad){
          if(this.state.mat[this.state.totMoves][otr].content !== null){ return false }
        }
        if(this.state.mat[this.state.totMoves][ncoo].content !== null){ return false }
      } else {
        onTheRoad.shift()
        for(let otr of onTheRoad){
          if(this.state.mat[this.state.totMoves][otr].content !== null){ return false }
        }
        if(this.state.mat[this.state.totMoves][ncoo+this.state.width].content !== null){ return false }
      }
    }
    return true
  }

  aCellWasClicked(x, y) {
    if (this.state.gameState === 1) {
      this.placeStuff(x, y)
    } else if(this.state.gameState === 2) {
      if(["rabbit", "hfh", "hft", "vfh", "vft", "rhole"].includes(this.state.mat[this.state.totMoves][x+y*this.state.width].content))
      this.setState({lastClickedCellX: x, lastClickedCellY: y, gameState: 3})
    } else if(this.state.gameState === 3) {
      this.moveStuff(x, y)
    } else {
      this.setState({lastClickedCellX: x, lastClickedCellY: y})
    }
  }

  mat2link(){
    if(this.state.mat && this.state.mat[0]){
      let res = ""
      for(let cell of this.state.mat[0]){
        switch(cell.content){
          case "rabbit":
          res += "r"
          break
          case "hole":
          res += "h"
          break
          case "rhole":
          res += "g"
          break
          case "mushroom":
          res += "m"
          break
          case "hfh":
          res += "1"
          break
          case "hft":
          res += "2"
          break
          case "vfh":
          res += "3"
          break
          case "vft":
          res += "4"
          break
          default:
          res += "0"
          break
        }
      }
      return res
    }
    return ""
  }

  getLink() {
    let search = window.location.search
    let params = new URLSearchParams(search)
    let foo = params.get('m')
    if(foo && foo.length == this.state.width * this.state.height){
      return foo
    }
    return "0".repeat(this.state.width * this.state.height)
  }

  removeLinkFromURL(){
    window.history.pushState({}, document.title, window.location.href.split("?")[0])
  }


  render(){
    var bb = []
    if(this.state.mat && this.state.mat[0])
    bb = this.state.mat[this.state.totMoves]


    return(
      <div style={{textAlign: "center"}}>
        <ControlPanel executer={this.exeControl} gameState={this.state.gameState} placing={this.state.placing} />
        <div className="map" style={{gridTemplateColumns: this.state.cssGrid}}>
          {
            bb.map(b =>
              <Cell key={"cell-" + b.y + "-" + b.x} content={b.content}
                gameState={this.state.gameState} posY={b.y} posX={b.x}
                stat={b.stat} value={b.value} onClick={this.aCellWasClicked} />
            )
          }
        </div>
        <br />
        {
          this.state.gameState > 1 &&
          <h6>MOVES: {this.state.totMoves}</h6>
        }
        {
          this.state.gameState < 2 &&
          <LinkSharer theLink={this.mat2link()} />
        }
      </div>
    );
  }
}

export default App;
