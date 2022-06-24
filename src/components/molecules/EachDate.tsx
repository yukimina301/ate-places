import './EachDate.scss';
import { Tag } from '../atoms/Tag';


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
                        <th className={`${COMPONENT_NAME}__date`} >{`${date.getDate()}日`}</th>
                        <td className={`${COMPONENT_NAME}__tag`}>
                            <Tag isEatingOut={dataByDate.isEatingOut}/>
                        </td>
                        <td className={`${COMPONENT_NAME}__cost`}>
                            {`¥ ${dataByDate.amounts}`}
                        </td>
                    </tr>
                </tbody>
            </table>
    )
};