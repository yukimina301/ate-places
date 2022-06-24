import React from "react";
import "./Tag.scss";

type Props = {
    isEatingOut: boolean;
};

const COMPONENT_NAME = 'Tag';

export const Tag = (props: Props) => {
    const { isEatingOut } = props;
    return (
        <div className={`${COMPONENT_NAME} ${COMPONENT_NAME}--${isEatingOut ? "orange" : "green"}`}>
            {isEatingOut ? "外食" : "自炊"}
        </div>
    )
};