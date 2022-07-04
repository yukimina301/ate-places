import React from "react";
import { Button } from "./Button";
import "./RadioGroup.scss";

type Props = {
    name: string;
    value: Array<string>;
    inputValue: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const COMPONENT_NAME = 'RadioGroup';

export const RadioGroup = (props: Props) => {
    const { name, value, inputValue, onChange } = props;

    return (
        <div className={`${COMPONENT_NAME}`}>
            {name}<br/>

            {value.map((item, index) => (
                <label key={index} className={`${COMPONENT_NAME}__label`}>
                    {item}
                    <input className={`${COMPONENT_NAME}__input`} type="radio" name={name} value={item} checked={item === inputValue} onChange={onChange} />
                </label>
            ))}
        </div>
    );
};