import React from "react";
import "./TextArea.scss";

type Props = {
    name: string;
    inputValue: string;
    cols: number,
    rows: number,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const COMPONENT_NAME = 'TextArea';

export const TextArea = (props: Props) => {
    const { name, inputValue, cols, rows, onChange } = props;

    return (
        <>
            <label>
                <textarea className={`${COMPONENT_NAME}__text-area`} name={name} value={inputValue} onChange={onChange} cols={cols} rows={rows}></textarea>
            </label>
        </>
    );
};