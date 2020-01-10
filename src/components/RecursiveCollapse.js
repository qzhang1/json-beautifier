import React, {Component} from 'react';

class RecursiveCollapse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCollapsed: false
        };
        this.collapse.bind(this);
    }    

    generateRecursiveCollapse(json){  
        let jsonObj = JSON.parse(json);
        let jsonIsArray = Array.isArray(jsonObj);
        let keys = Object.keys(jsonObj);
        let blocks = [];        
        
        for (let i = 0; i < keys.length; i++) {
            if (typeof jsonObj[keys[i]] === "object") {                
                blocks.push(<p className="json-property keep-text-left">{`"${keys[i]}": ${Array.isArray(jsonObj[keys[i]]) ? "[" : "{"} `}<i className="fa fa-minus-square collapsible-icon"></i></p>);
                blocks.push(this.generateRecursiveCollapse(JSON.stringify(jsonObj[keys[i]])));
                blocks.push(<p className="json-property keep-text-left">{`${Array.isArray(jsonObj[keys[i]]) ? "]" : "}"}`}</p>);
            }
            else if (jsonIsArray) {
                let isLastProperty = i === (keys.length - 1);
            blocks.push(<p className="json-property keep-text-left">{`${keys[i]}${isLastProperty ? "" : ","}`}</p>);
            }
            else {
                let isLastProperty = i === (keys.length - 1);
                blocks.push(<p className="json-property keep-text-left">{`"${keys[i]}": ${jsonObj[keys[i]]}${isLastProperty? "" : ","}`}</p>);
            }
        }  

        return (
            <div className="indent">
                {blocks.map(ele => ele)}
            </div>
        );
    }

    // toggle collapse
    collapse(event){
        this.setState({
            isCollapsed: !this.state.isCollapsed
        });
    }
    

    render() {
        let result = <div></div>;
        if (this.props.json && this.props.json.length > 0){      

            result = (
                <div className="json-container border rounded">
                    <p className="keep-text-left">{"{ "}<i className="fa fa-minus-square collapsible-icon" onClick={this.collapse}></i></p>
                    {this.generateRecursiveCollapse(this.props.json)}
                    <p className="keep-text-left">{"}"}</p>
                </div>
            );
        }

        return result;
    }
}

export default RecursiveCollapse;