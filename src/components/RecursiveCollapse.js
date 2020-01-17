import React, {Component} from 'react';

class RecursiveCollapse extends Component {
    constructor(props) {
        super(props);        

        this.state = {
            isCollapsed: props.collapse ?? false,
            isLastProperty: props.isLast ?? false,
            isInsideArray: props.isInsideArray ?? false,            
        };
        this.collapse = this.collapse.bind(this);
    }    

    generateRecursiveCollapse(jsonObj){  
        let jsonIsArray = Array.isArray(jsonObj);
        let keys = Object.keys(jsonObj);
        let wrapperBlocks = [];
        let blocks = [];                      

        if (typeof jsonObj === "object"){
            wrapperBlocks.push((
                <p className={this.state.isInsideArray ? "json-property" : "json-property keep-text-left"}>
                    {jsonIsArray ? "[ " : "{ "}<i className={this.state.isCollapsed ? "fa fa-plus-square collapsible-icon" : "fa fa-minus-square collapsible-icon"} onClick={this.collapse}></i>
                </p>
            ));
        }

        // beginning bracket/brace        
        for (let i = 0; i < keys.length; i++) {             
            let currObj = jsonObj[keys[i]];
            let isLastProperty = i === (keys.length - 1);                        

            // object or array type
            if (typeof currObj === "object") {
                if (jsonIsArray){
                    blocks.push((
                        <p className="json-property keep-text-left">
                            <RecursiveCollapse isInsideArray={true} isLast={isLastProperty} collapse={this.state.isCollapsed} json={currObj}></RecursiveCollapse>
                        </p>
                    ));
                }
                else {
                    blocks.push((
                        <span className="json-property keep-text-left">
                            {`"${keys[i]}": `}<RecursiveCollapse isLast={isLastProperty} collapse={this.state.isCollapsed} json={currObj} />
                        </span>                    
                    ));
                }                
            }            
            // array items
            else if (jsonIsArray) { 
                if (typeof currObj === "string"){
                    blocks.push(<p className="json-property keep-text-left">{`"${currObj}"${isLastProperty ? "" : ","}`}</p>);                
                }   
                else {
                    blocks.push(<p className="json-property keep-text-left">{`${currObj}${isLastProperty ? "" : ","}`}</p>);                
                }                          
            }
            else if (typeof currObj === "string"){
                blocks.push(<p className="json-property keep-text-left">{`"${keys[i]}": "${currObj}"${isLastProperty? "" : ","}`}</p>);
            }
            // every other type: Number, String, Undefined, Null, Boolean, and Symbol
            else {                                
                blocks.push(<p className="json-property keep-text-left">{`"${keys[i]}": ${currObj}${isLastProperty? "" : ","}`}</p>);
            }
        }  

        wrapperBlocks.push((
            <div className={this.state.isInsideArray? "" : "indent"}>
                {blocks.map(ele => ele)}
            </div>
        ));
        
        wrapperBlocks.push(<p className={this.state.isInsideArray ? "json-property" : "json-property keep-text-left"}>{jsonIsArray ? "]":"}"}{this.state.isLastProperty ? "" : ","}</p>);        

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
                    <div className={this.state.isInsideArray ? "" : "keep-text-left"}>
                        {isArray ? "[ " : "{ "}<i onClick={this.collapse} className={this.state.isCollapsed ? "fa fa-plus-square collapsible-icon" : "fa fa-minus-square collapsible-icon"} ></i>{isArray ? " ]" : " }"}
                    </div>
                );
            }
            else {                
                result = (
                    <div className={this.state.isInsideArray ? "" : "keep-text-left"} >
                        {this.generateRecursiveCollapse(this.props.json)}                                    
                    </div>
                );
            }            
        }

        return result;
    }
}

export default RecursiveCollapse;