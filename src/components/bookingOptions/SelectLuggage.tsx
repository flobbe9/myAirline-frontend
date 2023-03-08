import React from "react";
import "./SelectLuggage.css";


export default function SelectLuggage(props) {

    const className = props.className;
    const price = 35;
    
    return (
        <div className={className}>
           <h2>Luggage*</h2> 

           <div className={className + "-container"}>
                <LuggageCheckBox
                    className={className}
                    type="Cabbin luggage"
                    labelText="Cabbin luggage (free)"
                    infoText="A single bag weighing not more than 8kg and not beeing larger than 55 x 35 x 25 cm." />

                <LuggageCheckBox
                    className={className}
                    type="Additional luggage"
                    labelText={"Additional luggage (+ " + price + "€)"}
                    infoText="A single trunk weighing not more than 32kg and not beeing larger than 149 x 119 x 171 cm." />

                <SecurityReference className={className} />
            </div>
        </div>)
}


function LuggageCheckBox(props) {

    const className = props.className;
    const type = props.type;

    return (
        <div className={className + "-item"}>
            <input className={className + "-luggageType-checkBox"} type="checkbox" value={type} name={type}/>
            <label htmlFor={type}>{props.labelText}</label>
            <br />
            <section className={className + "-luggageType-infoText"}>{props.infoText}</section>
        </div>)
}


function SecurityReference(props) {

    const className = props.className;

    return (
        <div className={className + "-item"}>
            <h4>Security reference</h4>

            <p>
                You may not pack more than 1l of fluid in total and not more than 200ml per bottle. <br />
                (etc. )
            </p>

            <div>
                <input id={className + "-security-checkBox"} type="checkbox" />
                <label style={{fontSize:20}} >*I have read and understood the security reference. (etc.)</label>
            </div>

            <div id={className + "-error-message"}>Please consent to the security reference in order to continue.</div>
        </div>)
}


export function isSelectLuggageValid(): boolean {

    // has fee been added to flight details?

    return true;
}


export function isSecurityReferenceValid(): boolean {

    // is box checked?
    const securityCheckBox = document.getElementById("SelectLuggage-security-checkBox");

    // null check
    if (!securityCheckBox) 
        return false;

    // should be checked
    if (!(securityCheckBox as HTMLInputElement).checked)
        return false;

    return true;
}