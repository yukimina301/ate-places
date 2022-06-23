import {startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths} from 'date-fns'
import { useEffect, useState } from 'react';
import {MonthlyHeader} from '../molecules/MonthlyHeader'
import {EachDate} from '../molecules/EachDate'
import { MonthlyModal } from './MonthlyModal';

type Inputs = {
  place: string,
  cost: string,
  detail: string,
}

const COMPONENT_NAME = 'Monthly';

export const Monthly = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState(eachDayOfInterval({start: new Date(), end: new Date()}));
  const [isModalShow, setIsModalShow] = useState(false);
  const [inputs, setInputs] = useState({
    place: '',
    cost: '',
    detail: '',
  });

  useEffect(() => {
    const firstDayOfSelectedMonth = startOfMonth(selectedDate);
    const lastDayOfSelectedMonth = endOfMonth(selectedDate);
    setSelectedDates(eachDayOfInterval({start: firstDayOfSelectedMonth, end: lastDayOfSelectedMonth}));
  }, [selectedDate]);

  const updateInputs = (inputs: Inputs) => setInputs(inputs);

  const initInputValue = () => {
    updateInputs({
      place: '',
      cost: '',
      detail: ''
    });
  }

  const handleClickPrev = () => {
    setSelectedDate((prevState) => subMonths(prevState, 1));
  };

  const handleClickNext = () => {
    setSelectedDate((prevState) => addMonths(prevState, 1));
  };

  const handleShowModal = () => {
    setIsModalShow(true);
  };

  const handleCloseModal = () => {
    alert(`${inputs.place}, ${inputs.cost}, ${inputs.detail}`);
    initInputValue();
    setIsModalShow(false);
  };

  const handleChangePlace = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInputs({...inputs, place: e.target.value});
  };

  const handleChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInputs({...inputs, cost: e.target.value});
  }

  const handleChangeDetail = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateInputs({...inputs, detail: e.target.value});
  }

  return (
    <div className={COMPONENT_NAME}>
      <MonthlyHeader
        selectedDate={selectedDate}
        onClickPrev={handleClickPrev}
        onClickNext={handleClickNext}
      />
      {selectedDates.map((date, index) => (
        <EachDate
          date={date}
          dataByDate= {{isEatingOut: true, amounts: 1000}}
          key={index}
          onClick={handleShowModal}
        />
      ))}
      <MonthlyModal
        selectedDate={selectedDate}
        show={isModalShow}
        inputs={inputs}
        updateInputs={updateInputs}
        onClick={handleCloseModal}
        onChangePlace={handleChangePlace}
        onChangeCost={handleChangeCost}
        onChangeDetail={handleChangeDetail}
      />
    </div>
  );
}

export default Monthly;
