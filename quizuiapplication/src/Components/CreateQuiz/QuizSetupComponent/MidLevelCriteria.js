import React from 'react';
import '../CreateQuiz.css';
import MidRow from './MidRow';
import { connect } from 'react-redux';
import { updateMidLevel, addNewMidTech, removeMidTech } from '../UpdateMidLevelAction';

class LowLevelCriteria extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            technologies: this.props.techData,
            lowData: this.props.lowData.Medium
        }
    }

    onchange(event, tobeupdated, id) {
        const newData = this.props.lowData;
        // console.log(newData);
        if (newData !== undefined) {
            return newData.Medium.map((object, index) => {
                if (object.id === id) {
                    object[tobeupdated] = event.target.value;
                }
                this.props.updateMidLevel(newData.Medium);
            });
        }
    }


    onaddRow(e, id) {
        var previous_data = this.props.lowData;
        var i = 0;
        let type;
        var maximum = Math.max.apply(Math, previous_data.Medium.map(function (obj) {
            var regex = /\d+/g;
            var id = obj.id;
            var matches = id.match(regex);
            return parseInt(matches[0]);
        }));

        previous_data.Medium.map((object) => {
            i = i + parseInt(object.numberOfQuestions);
        });

        var temp = previous_data.Medium.slice(-1);

        if (temp[0].type === "code Type") {
            type = "NonCode Type"
        } else {
            type = "code Type"
        }

        var regex = /\d+/g;
        var matches = id.match(regex);
        id = maximum + 1;
        const tempObj = {
            id: 'M' + id,
            technologyId: 0,
            technology: temp[0].technology,
            type: type,
            numberOfQuestions: ''
        }
        const addData = [...this.props.lowData.Medium, tempObj];
        this.props.addNewMidTech(addData);
    }

    onRemoveRow(e, id) {
        var previous_data = this.props.lowData;
        const newArr = previous_data.Medium.filter(item => item.id !== id);
        this.props.removeMidTech(newArr);
    }


    render() {
        return (
            <div>
                <div className="questionLevelIndication">
                    <span className="levelIndicatorBtn backgroundColorForLow">
                        2
                    </span>
                    <label className="levelIndicationLabel">
                        Medium Difficulty Level - Maximum 7 questions
                    </label>
                </div>
                {(this.props.lowData) && this.props.lowData.Medium.length > 0 && this.props.lowData.Medium.map(data => (
                    <MidRow technologies={this.state.technologies} onChange={this.onchange.bind(this)} data={data} key={data.id} onAddRow={this.onaddRow.bind(this)} onRemoveRow={this.onRemoveRow.bind(this)} />
                ))}
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log("updated", state);
    return {
        lowData: state.MediumQuizData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateMidLevel: (lowLevel) => dispatch(updateMidLevel(lowLevel)),
        addNewMidTech: (addData) => dispatch(addNewMidTech(addData)),
        removeMidTech: (newArr) => dispatch(removeMidTech(newArr))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LowLevelCriteria)
