import {format} from 'date-fns'
import ja from 'date-fns/locale/ja'

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
      <button onClick={() => onClickPrev()}>prev</button>
      {format(selectedDate, 'yyyy年 MM月', { locale: ja })}
      <button onClick={onClickNext}>next</button>
    </header>
  )
};