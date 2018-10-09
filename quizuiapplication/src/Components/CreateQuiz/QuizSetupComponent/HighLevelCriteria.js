import React, { Component } from 'react';
import '../CreateQuiz.css';
import HighRow from './HighRow';
import { connect } from 'react-redux';
import { updateHighLevel, addNewHighTech, removeHighTech } from '../UpdateHighLevelAction';


class HighLevelCriteria extends Component {

    constructor(props) {
        super(props);
        this.state = {
            technologies: this.props.techData,
            highData: this.props.lowData.High
        }
    }

    onchange(event, tobeupdated, id) {
        const newData = this.props.lowData;
        if (newData !== undefined) {
            return newData.High.map((object, index) => {
                if (object.id === id) {
                    object[tobeupdated] = event.target.value;
                }
                this.props.updateHighLevel(newData.High);
            });
        }
    }


    onaddRow(e, id) {
        let previous_data = this.props.lowData;
        let i = 0;
        let type;
        var maximum = Math.max.apply(Math, previous_data.High.map(function (obj) {
            var regex = /\d+/g;
            var id = obj.id;
            var matches = id.match(regex);
            return parseInt(matches[0]);
        }));

        previous_data.High.map((object) => {
            i = i + parseInt(object.numberOfQuestions);
        });

       var temp = previous_data.High.slice(-1);

       if(temp[0].type === "code Type") {
           type = "NonCode Type"
       } else {
           type = "code Type"
       }

        var regex = /\d+/g;
        var matches = id.match(regex);
        id = maximum + 1;
        const tempObj = {
            id: 'H' + id,
            technologyId: 0,
            technology: temp[0].technology,
            type: type,
            numberOfQuestions: ''
        }
        const addData = [...this.props.lowData.High, tempObj];
        this.props.addNewHighTech(addData);
    }

    onRemoveRow(e, id) {
        var previous_data = this.props.lowData;
        const newArr = previous_data.High.filter(item => item.id !== id);
        this.props.removeHighTech(newArr);
    }

    render() {
        return (
            <div>
                <div className="questionLevelIndication">
                    <span className="levelIndicatorBtn backgroundColorForHigher">
                        3
                    </span>
                    <label className="levelIndicationLabel">
                        Higher Difficulty Level - Maximum 7 questions
                    </label>
                </div>
                {(this.props.lowData) && this.props.lowData.High.length > 0 && this.props.lowData.High.map(data => (
                    <HighRow technologies={this.state.technologies} onChange={this.onchange.bind(this)} data={data} key={data.id} onAddRow={this.onaddRow.bind(this)} onRemoveRow={this.onRemoveRow.bind(this)} />
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("updated higher", state);
    return {
        lowData: state.HighQuizData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateHighLevel: (lowLevel) => dispatch(updateHighLevel(lowLevel)),
        addNewHighTech: (addData) => dispatch(addNewHighTech(addData)),
        removeHighTech: (newArr) => dispatch(removeHighTech(newArr))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HighLevelCriteria);
