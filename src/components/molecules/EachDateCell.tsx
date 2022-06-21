import React from "react";
import {Tag} from "../atoms/Tag"

type Props = {
    dataByDate: {
    isEatingOut: boolean;
    amounts: number;
    }
};

const COMPONENT_NAME = 'EachDateCell';

export const EachDateCell = (props: Props) => {
    const {dataByDate} = props;

    return (
        <div className={COMPONENT_NAME}>
            <Tag isEatingOut={dataByDate.isEatingOut}/>
            {`¥ ${dataByDate.amounts}`}
        </div>
    )
};