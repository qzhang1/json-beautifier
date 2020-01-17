import React from 'react';
import JsonTextArea from './components/JsonTextArea';
import RecursiveCollapse from './components/RecursiveCollapse';
import './App.css';
import {Modal} from 'semantic-ui-react';
import CopyToClipboard from 'react-copy-to-clipboard';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentInput: '',
      currentJson: null,      
      previousJson: [],
      isModalOpen: false,
      modalMessage: '',
      isOutermostCollapse: false,
      isCopied: false          
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

  collapse = e => {
    this.setState({
      isOutermostCollapse: !this.state.isOutermostCollapse
    });
  };

  generateJsonTree(jsonText){
    if(jsonText == null){      
      return (      
        <div className="json-tree-container">
        </div>      
      );
    }

    if (this.state.isOutermostCollapse){
      return (      
        <div className="json-tree-container">
          <p className="keep-text-left">{"{ "}<i className="fa fa-plus square collapsible-icon" onClick={this.collapse}></i>{" }"}</p>
        </div>      
      );
    }
    else {
      return (         
        <div className="json-tree-container json-container">
          <RecursiveCollapse isLast={true} json={JSON.parse(jsonText)} />
        </div>                     
      );
    }
    
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

        {this.state.isCopied ? (<div className="ui floating message">{"Copied!"}</div>) : null}                
        <div className="ui stackable center aligned three column grid">            
          <div className="row">
            <div className="column">
              <JsonTextArea onChangeHandler={this.handleChange} textAreaPlaceHolder="Insert JSON here..." isReadonly={false}/>
            </div>
            <div className="middle aligned column">
              <div className="ui basic vertical buttons">
                <button className="ui basic big blue button" onClick={this.handleClick}>Beautify</button>
                <button className="ui basic big black button">Go Dark</button>
                <CopyToClipboard text={this.state.currentJson} onCopy={() => this.setState({ isCopied: true})}>
                  { document.queryCommandSupported('copy') && <button className="ui basic big green button copy-button" onClick="copy()">Copy</button>}
                </CopyToClipboard>                
              </div>                            
            </div>           
            <div className="column">              
                {this.generateJsonTree(this.state.currentJson)}
            </div>
          </div>
        </div>                         
      </div>      
    );
  }
}

export default App;
