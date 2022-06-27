import {format} from 'date-fns'
import ja from 'date-fns/locale/ja'
import { Button } from '../atoms/Button';
import './MonthlyHeader.scss';

type Props = {
  selectedDate: Date;
  onClickPrev: () => void;
  onClickNext: () => void;
};

const COMPONENT_NAME = 'MonthlyHeader';

export const MonthlyHeader = (props: Props) => {
  const {selectedDate, onClickPrev, onClickNext} = props;

  return (
    <header className={COMPONENT_NAME}>
      <Button
        text='前月'
        onClick={onClickPrev}
      />
      {format(selectedDate, 'yyyy年 MM月', { locale: ja })}
      <Button
        text='次月'
        onClick={onClickNext}
      />
    </header>
  )
};