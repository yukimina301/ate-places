import React, { MouseEventHandler } from "react";
import "./Anchor.scss";

type Props = {
    className?: string;
    text: string;
    color?: 'white' | 'gray'; 
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

const COMPONENT_NAME = 'Anchor';

export const Anchor = (props: Props) => {
    const { className='',text, color='white', onClick } = props;

    return (
        <span className={className}>
            <a className={`${COMPONENT_NAME} ${COMPONENT_NAME}--${color}`} onClick={onClick}>{text}</a>
        </span>
    );
};