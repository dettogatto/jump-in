import React from 'react'

class LinkSharer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      note: ""
    }
    this.copyText = this.copyText.bind(this)
    this.inputRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.note === "" && this.state.note !== ""){
      setTimeout(function(){
        this.setState({note: ""})
      }.bind(this), 1200)
    }
  }

  copyText(e){
    this.inputRef.current.select()
    if(document.queryCommandSupported('copy')){
      document.execCommand('copy')
      if (window.getSelection) {window.getSelection().removeAllRanges();}
      else if (document.selection) {document.selection.empty();}
      this.setState({note: "Link copied to clipboard!"})
    }else{
      this.setState({note: "Link selected. You have to copy it manually!"})
    }
  }

  render () {
    return(
      <div class="link-sharer-container">
        <button onClick={this.copyText}>COPY LINK</button><br />
        <input readOnly ref={this.inputRef} type="text"
          value={window.location.href.split("?")[0] + "?m=" + this.props.theLink} />
        <p>{this.state.note}</p>
      </div>
    )
  }
}

export default LinkSharer;
