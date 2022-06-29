import React, { useRef } from 'react';
import {format} from 'date-fns'
import ja from 'date-fns/locale/ja'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
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
  disabled: boolean;
  selectedDate: Date;
  show: boolean;
  inputs: Inputs;
  updateInputs: (inputs: Inputs) => void;
  onChangePlace: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAmounts: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDetail: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSaveClick: () => void;
  onCloseClick: () => void;
};

const COMPONENT_NAME = 'MonthlyModal';

export const MonthlyModal = (props: Props) => {
  const {disabled, selectedDate, show, inputs, onChangePlace, onChangeAmounts, onChangeDetail, onSaveClick, onCloseClick} = props;

  const contentRef = useRef<HTMLDivElement>(null);
  const onOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (contentRef.current && !contentRef.current.contains(event.target)) {
      onCloseClick();
    }
  };

  if (show) {
    return (
      <div className={COMPONENT_NAME} onClick={onOverlayClick}>
        <div ref={contentRef} className={`${COMPONENT_NAME}__content`}>
          <header className={`${COMPONENT_NAME}__header`}>
            <FontAwesomeIcon className={`${COMPONENT_NAME}__icon`} icon={faXmark} onClick={onCloseClick}/>
          </header>

          <div className={`${COMPONENT_NAME}__date`}>{format(selectedDate, 'MM/dd (E)', { locale: ja })}</div>

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
            disabled={disabled}
            text="保存する"
            onClick={onSaveClick}
            />
          </footer>
        </div>
      </div>
    )
  } else {
    return null;
  }
};