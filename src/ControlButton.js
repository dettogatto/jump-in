import React from 'react'

class ControlButton extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.executer(this.props.newState, this.props.toPlace);
  }
  render () {
    return(
      <button onClick={this.handleClick}>{this.props.txt}</button>
    )
  }
}

export default ControlButton;
