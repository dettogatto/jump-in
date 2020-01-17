import React from 'react'
import ControlButton from './ControlButton'

class ControlPanel extends React.Component {

  constructor(props) {
    super(props)

    this.getInstructions = this.getInstructions.bind(this)
  }

  getInstructions() {
    if (this.props.gameState === 0) {
      return null
    } else if (this.props.gameState === 1) {
      if (this.props.placing === "fox") {
        return "Placing Fox: click 2 adjacent cells"
      } else if (this.props.placing === "fox2") {
        return "Click second cell"
      } else if (this.props.placing === "") {
        return "Click the object to delete"
      }
      return "Placing " + this.props.placing.charAt(0).toUpperCase() + this.props.placing.slice(1);
    } else if(this.props.gameState === 3){
      return "Moving"
    }
    return null
  }

  render () {

    if(this.props.gameState === 0 || this.props.gameState === 1){
      return(
        <div style={{padding: "10px 0px", height: "120px"}}>
          <ControlButton executer={this.props.executer} newState={0} txt="RESET" />
          <ControlButton executer={this.props.executer} newState={2} txt="START GAME" />
          <br />
          <ControlButton executer={this.props.executer} newState={1} toPlace="rabbit" txt="RABBIT" />
          <ControlButton executer={this.props.executer} newState={1} toPlace="fox" txt="FOX" />
          <ControlButton executer={this.props.executer} newState={1} toPlace="mushroom" txt="MUSHROOM" />
          <ControlButton executer={this.props.executer} newState={1} toPlace="hole" txt="HOLE" />
          <ControlButton executer={this.props.executer} newState={1} toPlace="" txt="REMOVE" />
          <div>{this.getInstructions()}</div>
        </div>
      )
    } else if(this.props.gameState === 2 || this.props.gameState === 3){
      return(
        <div style={{padding: "10px 0px", height: "120px"}}>
          <ControlButton executer={this.props.executer} newState={0} txt="NEW GAME" />
          <ControlButton executer={this.props.executer} newState={103} txt="RESTART" />
          <br />
          <ControlButton executer={this.props.executer} newState={101} txt="&nbsp;&nbsp;<-&nbsp;&nbsp;" />
          <ControlButton executer={this.props.executer} newState={102} txt="&nbsp;&nbsp;->&nbsp;&nbsp;" />
          <div>{this.getInstructions()}</div>
        </div>
      )
    }
    return null;

  }
}

export default ControlPanel;
