import React from 'react';


class CreateSelectOption extends React.Component {

    constructor(props) {
        super(props);
        console.log("onchanmge", props);
        this.state = {
            technologies: this.props.techData,
            selected:this.props.options
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.techData.length > 0) {
            this.setState({
                technologies: newProps.techData
            })
        }
    }

    render() {

        return this.state.technologies.map((item) =>
            <option key={item.id} >{item.name}</option>
        );
    }


}

export default CreateSelectOption;