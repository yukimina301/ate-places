import React from "react";
import "./Input.scss";

type Props = {
    name: string;
    inputValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const COMPONENT_NAME = 'Input';

export const Input = (props: Props) => {
    const { name, inputValue, onChange } = props;

    return (
        <label className={`${COMPONENT_NAME}__label`}>
            {name}<br/>

            <input className={`${COMPONENT_NAME}__input`} type="text" name={name} value={inputValue} onChange={onChange} />
        </label>
    );
};