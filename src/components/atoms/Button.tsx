import React, { MouseEventHandler } from "react";
import "./Button.scss";

type Props = {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const COMPONENT_NAME = 'Button';

export const Button = (props: Props) => {
    const { text, onClick } = props;

    return (
        <button type="button" className={`${COMPONENT_NAME}`} onClick={onClick}>{text}</button>
    );
};