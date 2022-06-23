import React from "react";
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
        <>
            {value.map((item, index) => (
                <label key={index}>
                    <input className={`${COMPONENT_NAME}__radio`} type="radio" name={name} value={item} checked={item === inputValue} onChange={onChange} />
                    {item}
                </label>
            ))}
        </>
    );
};