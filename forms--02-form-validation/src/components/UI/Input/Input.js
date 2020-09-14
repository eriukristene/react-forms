import React from 'react';

import classes from './Input.css';

const input = ( props ) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    // get the invalid property if the input is invalid
    // check to see:
    // if what the user inputed is valid and a correct value, not gibberish
    // if this is a field we should even validate, we don't on the drop down select
    // if the user even touched the element i.e. did they even type anything in the field in the form?
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid); // CSS class here
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')} // into one long class where they are separated by space
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;