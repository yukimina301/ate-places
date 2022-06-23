import React from 'react';
import { Input } from '../atoms/Input';
import { RadioGroup } from '../atoms/RadioGroup';
import { TextArea } from '../atoms/TextArea';
import './MonthlyModal.scss';

type Inputs = {
  place: string,
  cost: string,
  detail: string,
}

type Props = {
  selectedDate: Date;
  show: boolean;
  inputs: Inputs;
  updateInputs: (inputs: Inputs) => void;
  onClick: () => void;
  onChangePlace: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCost: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDetail: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const COMPONENT_NAME = 'MonthlyModal';

export const MonthlyModal = (props: Props) => {
  const {selectedDate, show, inputs, onClick, onChangePlace, onChangeCost, onChangeDetail} = props;

  if (show) {
    return (
      <div className={COMPONENT_NAME}>
        <div className={`${COMPONENT_NAME}__content`}>

          <p>{selectedDate.getDate()}</p>

          <form className={`${COMPONENT_NAME}__form`} action="">
            <RadioGroup
              name="place"
              value={['eat-out', 'eat-home']}
              inputValue={inputs.place}
              onChange={onChangePlace}
            />

            ¥ <Input
              name="cost"
              inputValue={inputs.cost}
              onChange={onChangeCost}
            />

            <TextArea
              name='detail'
              inputValue={inputs.detail}
              cols={30}
              rows={5}
              onChange={onChangeDetail}
            />
          </form>

          <button onClick={onClick}>送信して閉じる</button>
        </div>
      </div>
    )
  } else {
    return null;
  }
};