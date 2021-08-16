import React from 'react';
import { ReactDOM } from 'react';
class InputText extends React.component{
    constructor(props){
        super(props);
        this.state = {
            value : ""
        };
    }
    updateVal = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    render(){
        return(
            <input value={this.state.value} type="text" placeholder="Type what you want to do?" onKeyPress={this.submitList} onChange={this.updateVal} />
        );
    }
}
export default InputText;