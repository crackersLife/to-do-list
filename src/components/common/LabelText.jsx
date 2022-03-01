import React from 'react';

export default function LabelText({id, value, className}) {
    return(
        <label id={id} className={className}>{value}</label>
    )
}