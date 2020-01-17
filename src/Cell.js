import React, { Component } from 'react'

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.theImage = this.theImage.bind(this)
  }

  handleClick() {
    this.props.onClick(this.props.posX, this.props.posY)
  }

  theImage() {
    if(this.props.content === "rabbit"){
      return <div style={{margin: '10px', height: '20px', width: '20px', backgroundColor: '#fff', borderRadius: '50px', border: '5px solid black'}}>
        <span style={{position: "absolute", top: "25px", left:"0px", texAlign: "center", width: "100%", lineHeight: "2px"}}>..<br />.</span>
      </div>
    } else if(this.props.content === "hole"){
      return <div style={{margin: '0px', height: '50px', width: '50px', backgroundColor: '#000', borderRadius: '50px'}}>
      </div>
    } else if(this.props.content === "rhole"){
      return <div style={{margin: '0px', height: '20px', width: '20px', backgroundColor: '#fff', borderRadius: '50px', border: '15px solid black'}}>
        <span style={{position: "absolute", top: "25px", left:"0px", texAlign: "center", width: "100%", lineHeight: "2px"}}>..<br />.</span>
      </div>
    } else if(this.props.content === "mushroom"){
      return <div style={{margin: '0px', height: '50px', width: '50px', backgroundColor: '#a00', borderRadius: '50px', position: 'relative'}}>
        <div style={{position: "absolute", top: 8, left: 13, display: 'inline-block', height: 8, width: 8, backgroundColor: '#fff', borderRadius: '50px'}}></div>
        <div style={{position: "absolute", bottom: 8, left: 13, display: 'inline-block', height: 8, width: 8, backgroundColor: '#fff', borderRadius: '50px'}}></div>
        <div style={{position: "absolute", top: 8, right: 13, display: 'inline-block', height: 8, width: 8, backgroundColor: '#fff', borderRadius: '50px'}}></div>
        <div style={{position: "absolute", bottom: 8, right: 13, display: 'inline-block', height: 8, width: 8, backgroundColor: '#fff', borderRadius: '50px'}}></div>
        <div style={{marginRight: "6px", marginBottom: "1px", display: 'inline-block', height: 8, width: 8, backgroundColor: '#fff', borderRadius: '50px'}}></div>
        <div style={{marginBottom: "1px", display: 'inline-block', height: 8, width: 8, backgroundColor: '#fff', borderRadius: '50px'}}></div>
        <div style={{marginLeft: "6px", marginBottom: "1px", display: 'inline-block', height: 8, width: 8, backgroundColor: '#fff', borderRadius: '50px'}}></div>
      </div>
    } else if (this.props.content === "hfh"){
      return <div style={{position: "relative", height: "50px", width: "50px"}}>
        <div style={{
            position: "absolute",
            right: 0,
            height: "0px",
            width: "0px",
            borderLeft: "30px solid black",
            borderTop: "25px solid white",
            borderBottom: "25px solid white"
          }}>
        </div>
        <div style={{
            position: "absolute",
            left: 0,
            top: "5px",
            height: "40px",
            width: "20px",
            backgroundColor: "#000"
          }}>
        </div>
      </div>
    } else if (this.props.content === "vfh"){
      return <div style={{position: "relative", height: "50px", width: "50px"}}>
        <div style={{
            position: "absolute",
            bottom: 0,
            height: "0px",
            width: "0px",
            borderTop: "30px solid black",
            borderLeft: "25px solid white",
            borderRight: "25px solid white"
          }}>
        </div>
        <div style={{
            position: "absolute",
            top: 0,
            left: "5px",
            height: "20px",
            width: "40px",
            backgroundColor: "#000"
          }}>
        </div>
      </div>
    } else if(this.props.content === "hft"){
      return <div style={{position: "relative", height: "50px", width: "50px"}}>
        <div style={{
            position: "absolute",
            right: 0,
            top: "5px",
            height: "40px",
            width: "20px",
            backgroundColor: "#000"
          }}>
        </div>
        <div style={{
            position: "absolute",
            left: 0,
            top: "10px",
            height: "10px",
            width: "0px",
            borderRight: "30px solid black",
            borderTop: "10px solid white",
            borderBottom: "10px solid white"
          }}>
        </div>
      </div>
    } else if(this.props.content === "vft"){
      return <div style={{position: "relative", height: "50px", width: "50px"}}>
        <div style={{
            position: "absolute",
            bottom: 0,
            left: "5px",
            height: "20px",
            width: "40px",
            backgroundColor: "#000"
          }}>
        </div>
        <div style={{
            position: "absolute",
            top: 0,
            left: "10px",
            height: "0px",
            width: "10px",
            borderBottom: "30px solid black",
            borderRight: "10px solid white",
            borderLeft: "10px solid white"
          }}>
        </div>
      </div>
    }
    return null
  }

  render () {
    return (
      <div className="cell" onClick={this.handleClick}>{this.theImage()}</div>
    )
  }
}

export default Cell;
