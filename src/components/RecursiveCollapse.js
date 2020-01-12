import React, {Component} from 'react';

class RecursiveCollapse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCollapsed: props.collapse ?? false
        };
        this.collapse = this.collapse.bind(this);
    }    

    generateRecursiveCollapse(jsonObj){  
        let jsonIsArray = Array.isArray(jsonObj);
        let keys = Object.keys(jsonObj);
        let wrapperBlocks = [];
        let blocks = [];                      

        if (jsonIsArray) {
            wrapperBlocks.push(<p className="json-property keep-text-left">{"[ "}<i className={this.state.isCollapsed ? "fa fa-plus-square collapsible-icon" : "fa fa-minus-square collapsible-icon"} onClick={this.collapse}></i></p>);        
        } 
        else if (typeof jsonObj === "object") {
            wrapperBlocks.push(<p className="json-property keep-text-left">{"{ "}<i className={this.state.isCollapsed ? "fa fa-plus-square collapsible-icon" : "fa fa-minus-square collapsible-icon"} onClick={this.collapse}></i></p>);        
        }

        // beginning bracket/brace        
        for (let i = 0; i < keys.length; i++) {             
            let currObj = jsonObj[keys[i]];
            
            // object or array type
            if (typeof currObj === "object") {
                blocks.push((
                    <span>
                        {`${keys[i]}: `}<RecursiveCollapse collapse={this.state.isCollapsed} json={currObj} />
                    </span>                    
                ));
            }            
            // array items
            else if (jsonIsArray) {
                let isLastProperty = i === (keys.length - 1);                
                blocks.push(<p className="json-property keep-text-left">{`${keys[i]}${isLastProperty ? "" : ","}`}</p>);                
            }
            // every other type: Number, String, Undefined, Null, Boolean, and Symbol
            else {
                let isLastProperty = i === (keys.length - 1);
                blocks.push(<p className="json-property keep-text-left">{`"${keys[i]}": ${currObj}${isLastProperty? "" : ","}`}</p>);
            }
        }  

        wrapperBlocks.push((
            <div className="indent">
                {blocks.map(ele => ele)}
            </div>
        ));
        wrapperBlocks.push(<p className="json-property keep-text-left">{jsonIsArray ? "]":"}"}</p>);        

        return (            
            <div>
                {wrapperBlocks.map(wb => wb)}
            </div>
        );
    }

    // toggle collapse
    collapse = event => {
        this.setState({
            isCollapsed: !this.state.isCollapsed
        });
    }
    

    render() {        
        let result = <div></div>;
        let isArray = Array.isArray(this.props.json);
        if (this.props.json && this.props.json != null){      
            if(this.state.isCollapsed){
                result = (
                    <div className="indent keep-text-left">
                        {isArray ? "[ " : "{ "}<i onClick={this.collapse} className={this.state.isCollapsed ? "fa fa-plus-square collapsible-icon" : "fa fa-minus-square collapsible-icon"} ></i>{isArray ? " ]" : " }"}
                    </div>
                );
            }
            else {                
                result = (
                    <div className="indent keep-text-left" >
                        {this.generateRecursiveCollapse(this.props.json)}                                    
                    </div>
                );
            }            
        }

        return result;
    }
}

export default RecursiveCollapse;