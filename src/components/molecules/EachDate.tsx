import {format} from 'date-fns'
import './EachDate.scss';
import { Tag } from '../atoms/Tag';
import { ja } from 'date-fns/locale';
import { MonthlyDate } from '../../models';
import { Button } from '../atoms/Button';


type Props = {
    date: Date;
    dataByDate: MonthlyDate,
    onClick: (dataByDate: MonthlyDate) => void,
    onDeleteClick: (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>, dataByDate: MonthlyDate) => void,
};

const COMPONENT_NAME = 'EachDate';

export const EachDate = (props: Props) => {
    const {date, dataByDate, onClick, onDeleteClick} = props;

    const tag = dataByDate?.place === 'home' ? {text:'自炊', color: 'orange'}: {text: '外食', color: 'green'};

    return (
        <div className={COMPONENT_NAME}>
            <table className={`${COMPONENT_NAME}__table`} onClick={() => onClick(dataByDate)}>
                <tbody>
                    <tr className={`${COMPONENT_NAME}__tr`} >
                        <th className={`${COMPONENT_NAME}__date`} >{format(date, "d日 (E)", { locale: ja })}</th>
                        <td className={`${COMPONENT_NAME}__tag`}>
                            {dataByDate.place &&
                                <Tag text={tag.text} color={tag.color}/>
                            }
                        </td>
                        <td className={`${COMPONENT_NAME}__amounts`}>
                            {dataByDate.amounts !== '' &&
                                `¥ ${dataByDate.amounts}`
                            }
                        </td>
                        <td className={`${COMPONENT_NAME}__delete`}>
                            <Button
                            text="削除"
                            onClick={(e) => onDeleteClick(e, dataByDate)}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};