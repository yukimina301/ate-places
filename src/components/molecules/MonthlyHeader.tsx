import {format} from 'date-fns'
import ja from 'date-fns/locale/ja'
import { Anchor } from '../atoms/Anchor';
import { Button } from '../atoms/Button';
import './MonthlyHeader.scss';

type Props = {
  selectedDate: Date;
  onClickPrev: () => void;
  onClickNext: () => void;
  onClickSignOut: () => void;
};

const COMPONENT_NAME = 'MonthlyHeader';

export const MonthlyHeader = (props: Props) => {
  const {selectedDate, onClickPrev, onClickNext, onClickSignOut} = props;

  return (
    <header className={COMPONENT_NAME}>
      <div className={`${COMPONENT_NAME}__month`}>
      <Button
        text='前月'
        onClick={onClickPrev}
      />
      {format(selectedDate, 'yyyy年 MM月', { locale: ja })}
      <Button
        text='次月'
        onClick={onClickNext}
      />
      </div>

      <Anchor className={`${COMPONENT_NAME}__anchor`} text='サインアウト' color='gray' onClick={onClickSignOut}/>
    </header>
  )
};