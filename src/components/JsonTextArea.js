import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import '../App.css';

class JsonTextArea extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            rowNum: props.rowNum ?? 30,
            textAreaPlaceHolder: props.textAreaPlaceHolder ?? "",
            isReadonly: props.isReadonly ?? false,            
            currentValue: ''
        };
    }

    onJsonInputChange = event => {        
        event.preventDefault();
        this.setState({
            currentValue: event.target.value
        });
        this.props.onChangeHandler(event);
    }

    render(){
        let textAreaProps = {
            rows: this.state.rowNum,
            placeholder: this.state.textAreaPlaceHolder,
            readOnly: this.state.isReadonly,
            onChange: this.onJsonInputChange
        };

        if (textAreaProps.readOnly){
            textAreaProps['value'] = this.props.prettifyOutput ?? '';
        }

        return (
            <Form>
                <TextArea 
                {...textAreaProps}
                 />
            </Form>
        );
    }
}

export default JsonTextArea;
