import React from 'react';

import classes from './Input.css';

const input = ( props ) => {
    let inputElement = null;

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={classes.InputElement}
                // here in the elementConfig prop for Input component
                // should receive the elementConfig setup
                // for a given input in our state 
                {...props.elementConfig}
                // here is the value prop for Input component
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={classes.InputElement}
                    value={props.value}
                    onChange={props.changed}>
                        {/* map into an array of JSX elements*/}
                        {/* option.value refers to value in deliverMethod in ContactData.js */}
                        {/* same for displayValue */}
                        {/* if you are using map(), you need a key! */}
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue} {/* show what the user wrote */}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {/* this contains what has been put in the input */}
            {inputElement}
        </div>
    );

};

export default input;