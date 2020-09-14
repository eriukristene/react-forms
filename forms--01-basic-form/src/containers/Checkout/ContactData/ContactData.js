import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    // need to store the contact data in the state
    // each of these are the different types of input I want to get from the customer
    state = {
        orderForm: {
            // add elements dynamically
            name: {
                elementType: 'input',
                elementConfig: {
                    // the config for this specific type of tag, input
                    type: 'text',
                    placeholder: 'Your Name'
                },
                // want a value for the element, initially empty
                // this determines what is shown in the input box
                // it is empty at first, but will be filled as they type
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    // should be an array
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = ( event ) => {
        event.preventDefault(); // prevent from sending a request automatically
        this.setState( { loading: true } );
        const formData = {}; // get the data from my state
        // formElementIdentifier = email, country, etc.
        for (let formElementIdentifier in this.state.orderForm) {
            // set the value to whatever the user entered
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push( '/' );
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    // will help to adjust the value in state as a user types in the input box
    inputChangedHandler = (event, inputIdentifier) => {
        // get the state and create a copy of the orderForm
        // to prevent changing the original state
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        // need to copy the properties in the selected orderForm element this way
        // the above method only gets the first side, need to deep copy to get everything
        // that is deeper into the state
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
                    // inputIdentifier is a value like email, deliveryMethod, etc.
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        // this will update the fields of the form
        // with whatever the user inputs or types or selects
        // two way binding
        this.setState({orderForm: updatedOrderForm});
    }

    render () {
        // turn the orderForm object into an array that I can loop through
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            // the keys are the property name of that object
            // key in this case is name, street, zipCode etc.
            // then get the values of those keys (elementType, elementConfig, etc.)
            formElementsArray.push({ // push a new object to the formElements array
                id: key,
                config: this.state.orderForm[key] 
                        // right side of the property, all the stuff for the given key
                        // the JavaScript object, will be stored in this property
            });
        }
        let form = (
            // onSubmit is built in
            <form onSubmit={this.orderHandler}>
                {/* loop through the formElements array, with map()
                to generate a new array basically
                gets an individual formElement
                returns JSX (which is the custom Input component) */}
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;