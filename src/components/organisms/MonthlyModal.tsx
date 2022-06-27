import React from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { RadioGroup } from '../atoms/RadioGroup';
import { TextArea } from '../atoms/TextArea';
import './MonthlyModal.scss';

type Inputs = {
  place: string,
  amounts: string,
  detail: string,
}

type Props = {
  selectedDate: Date;
  show: boolean;
  inputs: Inputs;
  updateInputs: (inputs: Inputs) => void;
  onCloseClick: () => void;
  onChangePlace: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAmounts: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDetail: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const COMPONENT_NAME = 'MonthlyModal';

export const MonthlyModal = (props: Props) => {
  const {selectedDate, show, inputs, onCloseClick, onChangePlace, onChangeAmounts, onChangeDetail} = props;

  if (show) {
    return (
      <div className={COMPONENT_NAME}>
        <div className={`${COMPONENT_NAME}__content`}>
          <div className={`${COMPONENT_NAME}__date`}>{selectedDate.getDate()}</div>

          <form className={`${COMPONENT_NAME}__form`} action="">
            <RadioGroup
              name="place"
              value={['out', 'home']}
              inputValue={inputs.place}
              onChange={onChangePlace}
            />

            <Input
              name="amounts"
              inputValue={inputs.amounts}
              onChange={onChangeAmounts}
            />

            <TextArea
              name='detail'
              inputValue={inputs.detail}
              cols={30}
              rows={5}
              onChange={onChangeDetail}
            />
          </form>
          <footer className={`${COMPONENT_NAME}__footer`}>
            <Button
            text="送信して閉じる"
            onClick={onCloseClick}
            />
          </footer>
        </div>
      </div>
    )
  } else {
    return null;
  }
};