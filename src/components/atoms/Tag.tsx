import React from "react";
import "./Tag.scss";

type Props = {
    text: string;
    color: string;
};

const COMPONENT_NAME = 'Tag';

export const Tag = (props: Props) => {
    const { text, color } = props;
    return (
        <div className={`${COMPONENT_NAME} ${COMPONENT_NAME}--${color}`}>
            {text}
        </div>
    )
};