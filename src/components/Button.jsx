import React from "react";

const Button = ({ nextPage, isdisabledBtn }) => {
    return (
        <button disabled={isdisabledBtn} type='button' className='Button' onClick={nextPage}>Load more</button>
    )
}

export default Button;

