import React, {Component} from 'react';

class RecursiveCollapse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCollapsed: false
        };
    }

    

    generateRecursiveCollapse(json){  
        let jsonObj = JSON.parse(json);
        let keys = Object.keys(jsonObj);
        let blocks = [];        
        
        for (let i = 0; i < keys.length; i++) {
            if (typeof jsonObj[keys[i]] === "object") {                
                blocks.push(<span>{`"${keys[i]}": ${Array.isArray(jsonObj[keys[i]]) ? "[" : "{"} `}<i className="far fa-minus-square"></i></span>);
                blocks.push(this.generateRecursiveCollapse(JSON.stringify(jsonObj[keys[i]])));
            }
            else {
                let isLastProperty = i === (keys.length - 1);
                blocks.push(<span>{`"${keys[i]}": ${jsonObj[keys[i]]}${isLastProperty? "" : ","}`}</span>);
            }
        }  

        return (
            <span className="indent">
                {blocks.map(ele => ele)}
            </span>
        );
    }

    render() {
        let result = <div></div>;
        if (this.props.json && this.props.json.length > 0){
            let restOfTree = (
                <div>
                    <p>{"{"} <i className="fa fa-minus-square"></i></p>
                    {this.generateRecursiveCollapse(this.props.json)}
                    <p>{"}"}</p>
                </div>                
            );
            result = (
                <div className="json-container">
                    {restOfTree}                                    
                </div>
            );
        }

        return result;
    }
}

export default RecursiveCollapse;