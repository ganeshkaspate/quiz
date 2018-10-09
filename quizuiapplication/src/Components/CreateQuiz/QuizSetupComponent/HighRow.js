import React from 'react';
import Select from '../CreateSelectOption';
import '../CreateQuiz.css'

const HighRow = (props) => (
    <div className="row topMargn">
        <div className="questionRow">
            <div className="rowContent borderRight text-center ">1</div>
            <div className="rowContent fontStyle borderRight">
                <label type="text">Select Technology</label>
                <select className="selectpicker btn btn-labeled btn-start selectId techDrop  margin-left-10" value = {props.data.technology} onChange={(e) => { props.onChange(e, "technology", props.data.id) }}>
                    <option disabled selected value="">None Selected</option>
                    {props.technologies && <Select techData={props.technologies} options={props.data.technology} />}
                </select>
            </div>
            <div className="rowContent borderRight">
                <span>Select Questions Type</span>
                <select className="selectpicker btn btn-labeled btn-start selectId techDrop margin-left-10" value = {props.data.type} onChange={(e) => { props.onChange(e, "type", props.data.id) }}>
                    <option disabled selected value="">None Selected</option>
                    <option>code Type</option>
                    <option>NonCode Type</option>
                </select>
            </div>
            <div className="rowContent">
                <div className="fontStyle">
                    Number Of Questions
                    <select className="numberDropdown selectpicker btn btn-labeled btn-start selectId quesSDrop margin-left-10" onChange={(e) => { props.onChange(e, "numberOfQuestions", props.data.id) }}>
                        <option disabled selected value>None</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                    </select>
                </div>
            </div>
        </div>
        <div className="rowContent">
            <span className="">
                <button type="button" className="btn btn-outline-primary btn-sm standard-btn-50" onClick={(e) => { props.onRemoveRow(e, props.data.id) }}>Reset</button>
            </span>
            <span>
                <button type="button" className="btn btn-primary btn-sm standard-btn-50 margin-left-10" onClick={(e) => { props.onAddRow(e, props.data.id) }}>+</button>
            </span>
        </div>
    </div>
)

export default HighRow;