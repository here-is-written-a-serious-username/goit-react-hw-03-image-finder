import React from "react";

const Button = ({ nextPage }) => {
    return (
        <button type='button' className='Button' onClick={nextPage}>Load more</button>
    )
}

export default Button;

