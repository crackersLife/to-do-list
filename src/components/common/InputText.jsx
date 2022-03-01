import React from 'react';

export default function InputText({id, type, value, placeholder}) {
    return(
        <input id={id} type={type} value={value} placeholder={placeholder}/>
    )
}