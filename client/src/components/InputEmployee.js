import React from "react";

function InputEmployee({ title, type, setstate }) {
    return (
        <>
            <label className="mr-2 mb-1">{title}</label>
            <input type={type} className="input" onChange={setstate}></input>
        </>
    );
}

export default InputEmployee;
