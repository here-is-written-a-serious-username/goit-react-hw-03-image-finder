import React from "react";
import { PropTypes } from 'prop-types';

const Button = ({ nextPage, isdisabledBtn }) => {
    return (
        <button disabled={isdisabledBtn} type='button' className='Button' onClick={nextPage}>Load more</button>
    )
}

export default Button;

Button.propTypes = {
    nextPage: PropTypes.func.isRequired,
    isdisabledBtn: PropTypes.bool.isRequired,
}