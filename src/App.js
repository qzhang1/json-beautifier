import React from 'react';
import JsonTextArea from './components/JsonTextArea';
import './App.css';
import {Modal} from 'semantic-ui-react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentInput: '',
      currentJson: null,      
      previousJson: [],
      isModalOpen: false,
      modalMessage: ''            
    };

    this.handleChange.bind(this);
  }

  handleChange = event => {
   let currentInput = event.target.value;
   this.setState({
     currentInput: currentInput
   });   
  };
  
  handleClick = event => {
    let currentInput = this.state.currentInput;    
    if (currentInput && currentInput.length > 0){
      let attemptedParse = '';    
      let errMsg = '';
      try 
      {
        attemptedParse = JSON.parse(currentInput);
        attemptedParse = JSON.stringify(attemptedParse, null, 4);
      }
      catch(err)
      {
        errMsg = `Failed due to ${err.name}\nError: ${err.message}`;
      }
        
      if (errMsg.length > 0){
        this.setState({
          isModalOpen: true,
          modalMessage: errMsg
        });
      }
      else
      {        
        console.log(attemptedParse);
        this.setState({
          currentJson: attemptedParse,
          previousJson: [...this.state.previousJson, attemptedParse],
          isModalOpen: false,
          modalMessage: ''
        });
      }
     }   
  };

  closeModal = e => {
    this.setState({ isModalOpen: false });
  };

  render() {

    return (      
      <div className="ui container main">   
      <Modal
      header="Message" 
      open={this.state.isModalOpen}
      content={this.state.modalMessage}
      onClose={this.closeModal}
      actions={[{key:'close', content: 'Close', onClick: this.closeModal}]} />
        <h2 className="ui icon center aligned header">
          <i className="beer circular icon"></i>
          <div className="content">Json Beautifier</div>          
        </h2>
        <div className="ui stackable center aligned three column grid">            
          <div className="row">
            <div className="column">
              <JsonTextArea onChangeHandler={this.handleChange} textAreaPlaceHolder="Insert JSON here..." isReadonly={false}/>
            </div>
            <div className="middle aligned column">
              <button className="ui big blue button" onClick={this.handleClick}>Beautify</button>
            </div>
            <div className="column">
              <JsonTextArea isReadonly={true} prettifyOutput={this.state.currentJson} />
            </div>
          </div>
        </div>                         
      </div>      
    );
  }
}

export default App;
