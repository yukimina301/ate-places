import { RadioGroup } from '../atoms/RadioGroup';
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
  updateInputs: (nputs: Inputs) => void;
  onClick: () => void;
};

const COMPONENT_NAME = 'MonthlyModal';

export const MonthlyModal = (props: Props) => {
  const {selectedDate, show, onClick} = props;

  if (show) {
    return (
      <div className={COMPONENT_NAME}>
        <div className={`${COMPONENT_NAME}__content`}>

          <p>{selectedDate.getDate()}</p>

          <form className={`${COMPONENT_NAME}__form`} action="">
            {/* <RadioGroup
              name="place"
              value={['eat-out', 'eat-home']}

            ></RadioGroup> */}
            <label className={`${COMPONENT_NAME}__label`} htmlFor="eat-out-id">
              eatout
              <input type="radio" id="eat-out-id" value="eat-out" name="place"/>
            </label>

            <label className={`${COMPONENT_NAME}__label`} htmlFor="eat-home-id">
              eathome
              <input type="radio" id="eat-home-id" value="eat-home" name="place"/>
            </label>

            <label className={`${COMPONENT_NAME}__label`} htmlFor="cost-id">
              ¥ <input type="text" id="cost-id" name="cost"/>
            </label>

            <label className={`${COMPONENT_NAME}__label`} htmlFor="ate-detail-id">
              <textarea name="detail" id="ate-detail-id" cols={30} rows={5}></textarea>
            </label>
          </form>

          <button onClick={onClick}>閉じる</button>
        </div>
      </div>
    )
  } else {
    return null;
  }
};