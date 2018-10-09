import React from 'react';
import '../CreateQuiz.css';
import Select from '../CreateSelectOption';
import LowRow from './LowRow';
import { connect } from 'react-redux';
import { updateLowLevel, addNewTech, removeTech } from '../UpdateLowLevelAction';

class LowLevelCriteria extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            technologies: this.props.techData,
            lowData: this.props.lowData.low
        }
    }

    onchange(event, tobeupdated, id) {
        console.log("values send for updation", tobeupdated, id);
        const newData = this.props.lowData;
        console.log(newData);
        if (newData !== undefined) {
            return newData.Low.map((object, index) => {
                if (object.id === id) {
                    object[tobeupdated] = event.target.value;
                }
                this.props.updateLowLevel(newData.Low);
            });
        }
    }


    onaddRow(e, id) {
        var previous_data = this.props.lowData;
        var i = 0;
        let type;
        var maximum = Math.max.apply(Math, previous_data.Low.map(function (obj) {
            var regex = /\d+/g;
            var id = obj.id;
            var matches = id.match(regex);
            return parseInt(matches[0]);
        }));

        previous_data.Low.map((object) => {
            i = i + parseInt(object.numberOfQuestions);
        });

       var temp = previous_data.Low.slice(-1);

       if(temp[0].type === "code Type") {
           type = "NonCode Type"
       } else {
           type = "code Type"
       }

        var regex = /\d+/g;
        var matches = id.match(regex);
        id = maximum + 1;
        const tempObj = {
            id: 'L' + id,
            technologyId: 0,
            technology: temp[0].technology,
            type: type,
            numberOfQuestions: ''
        }
        const addData = [...this.props.lowData.Low, tempObj];
        this.props.addNewTech(addData);
    }

    onRemoveRow(e, id) {
        var previous_data = this.props.lowData;
        const newArr = previous_data.Low.filter(item => item.id !== id);
        this.props.removeTech(newArr);
    }


    render() {
        return (
            <div>
                <div className="questionLevelIndication">
                    <span className="levelIndicatorBtn backgroundColorForLow">
                        1
                    </span>
                    <label className="levelIndicationLabel">
                        Low Difficulty Level - Maximum 6 questions
                    </label>
                </div>
                {(this.props.lowData) && this.props.lowData.Low.length > 0 && this.props.lowData.Low.map(data => (
                    <LowRow technologies={this.state.technologies} onChange={this.onchange.bind(this)} data={data} key={data.id} onAddRow={this.onaddRow.bind(this)} onRemoveRow={this.onRemoveRow.bind(this)} />
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("updated", state);
    return {
        lowData: state.QuizData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateLowLevel: (lowLevel) => dispatch(updateLowLevel(lowLevel)),
        addNewTech: (addData) => dispatch(addNewTech(addData)),
        removeTech: (newArr) => dispatch(removeTech(newArr))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LowLevelCriteria)
