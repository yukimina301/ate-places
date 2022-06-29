import React, { MouseEventHandler } from "react";
import "./Button.scss";

type Props = {
    disabled?: boolean,
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const COMPONENT_NAME = 'Button';

export const Button = (props: Props) => {
    const { disabled, text, onClick } = props;

    return (
        <button type="button" className={`${COMPONENT_NAME}`} onClick={onClick} disabled={disabled}>{text}</button>
    );
};