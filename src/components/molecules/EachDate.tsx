import {EachDateCell} from './EachDateCell';
import './EachDate.scss';


type Props = {
    date: Date;
    dataByDate: {
    isEatingOut: boolean;
    amounts: number;
    }
    onClick: () => void,
};

const COMPONENT_NAME = 'EachDate';

export const EachDate = (props: Props) => {
    const {date, dataByDate, onClick} = props;

    return (
            <table className={`${COMPONENT_NAME}__table`} onClick={onClick}>
                <tbody>
                    <tr>
                        <th>{date.getDate()}</th>
                        <td>
                            <EachDateCell dataByDate={dataByDate}/>
                        </td>
                    </tr>
                </tbody>
            </table>
    )
};