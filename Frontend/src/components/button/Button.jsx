import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';
const Button = props => {
    return (
        <button  className={`button-dark ${props.className}`} onClick={props.onClick ? () => props.onClick() : null}>
            {props.children}
        </button>
    )
};

export const ButtonLight = props => {
    return (

        <Button className={`button-light ${props.className}`} onClick={props.onClick ? () => props.onClick() : null}>
            {props.children}
        </Button>
            
    )
};

Button.propTypes = {
    onclick: PropTypes.func
};

ButtonLight.propTypes ={
    onclick: PropTypes.func
}


export default Button;
