import {startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay} from 'date-fns'
import React, { useEffect, useState } from 'react';
import {MonthlyHeader} from '../molecules/MonthlyHeader'
import {EachDate} from '../molecules/EachDate'
import { MonthlyModal } from './MonthlyModal';
import './Monthly.scss'
import { MonthlyDate, Inputs } from '../../models';
import { getMonthly, saveMonthlyDate, deleteMonthlyDate } from '../../data/repository';

const COMPONENT_NAME = 'Monthly';

export const Monthly = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState(eachDayOfInterval({start: new Date(), end: new Date()}));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDocId, setSelectedDocId] = useState('');
  const [isModalShow, setIsModalShow] = useState(false);
  const [monthlyDates, setMonthlyDates] = useState<MonthlyDate[]>([]);
  const [inputs, setInputs] = useState<Inputs>({
    place: '',
    amounts: '',
    detail: '',
  });

  const updateInputs = (inputs: Inputs) => setInputs(inputs);
  const updateDocId = (id: string) => setSelectedDocId(id);
  const disabled = JSON.stringify(Object.values(inputs)) == JSON.stringify(['','','']);

  useEffect(() => {
    getMonthly(
      selectedMonth,
      setMonthlyDates,
    );
  }, []);

  useEffect(() => {
    const firstDayOfSelectedMonth = startOfMonth(selectedMonth);
    const lastDayOfSelectedMonth = endOfMonth(selectedMonth);
    setSelectedDates(eachDayOfInterval({start: firstDayOfSelectedMonth, end: lastDayOfSelectedMonth}));
  }, [selectedMonth]);

  const initInputValue = () => {
    updateInputs({
      place: '',
      amounts: '',
      detail: ''
    });
  }

  const findDateDate = (date: Date) => {
    const found = monthlyDates.find((monthlyDate) => {
      return isSameDay(monthlyDate.date, date);
    });
    return found ? found : {
      docId: '',
      date,
      place: '',
      amounts: '',
      detail: '',
    }
  };

  const handleClickPrev = () => {
    setSelectedMonth((prevState) => subMonths(prevState, 1));
    getMonthly(
      selectedMonth,
      setMonthlyDates
    );

  };

  const handleClickNext = () => {
    setSelectedMonth((prevState) => addMonths(prevState, 1));
    getMonthly(
      selectedMonth,
      setMonthlyDates
    );
  };

  const handleShowModal = (dataByDate: MonthlyDate) => {
    setSelectedDate(dataByDate.date);
    updateDocId(dataByDate.docId);
    updateInputs({
      place: dataByDate.place ? dataByDate.place : '',
      amounts: String(dataByDate.amounts) ? String(dataByDate.amounts) : '',
      detail: dataByDate.detail? dataByDate.detail : '',
    });

    setIsModalShow(true);
  };

  const handleCloseModal = () => {
    initInputValue();
    setIsModalShow(false);
  };

  const handleSaveClick = () => {

    saveMonthlyDate(
      selectedDocId,
      selectedDate,
      inputs
    ).then(() => {
      getMonthly(
        selectedMonth,
        setMonthlyDates
      );
    });
    initInputValue();
    setIsModalShow(false);
  }

  const handleChangePlace = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInputs({...inputs, place: e.target.value});
  };

  const handleChangeAmounts = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateInputs({...inputs, amounts: e.target.value});
  }

  const handleChangeDetail = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateInputs({...inputs, detail: e.target.value});
  }

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, dataByDate: MonthlyDate) => {
    e.stopPropagation();
    deleteMonthlyDate(dataByDate)
    .then(() => {
      getMonthly(
        selectedMonth,
        setMonthlyDates
      );
    });
  }

  return (
    <div className={COMPONENT_NAME}>
      <MonthlyHeader
        selectedDate={selectedMonth}
        onClickPrev={handleClickPrev}
        onClickNext={handleClickNext}
      />
  
      {selectedDates.map((date, index) => (
        <EachDate
          date={date}
          dataByDate= {findDateDate(date) || null}
          key={index}
          onShowClick={handleShowModal}
          onDeleteClick={handleDeleteClick}
        />
      ))}

      <MonthlyModal
        disabled={disabled}
        selectedDate={selectedDate}
        show={isModalShow}
        inputs={inputs}
        updateInputs={updateInputs}
        onChangePlace={handleChangePlace}
        onChangeAmounts={handleChangeAmounts}
        onChangeDetail={handleChangeDetail}
        onSaveClick={handleSaveClick}
        onCloseClick={handleCloseModal}
      />
    </div>
  );
}

export default Monthly;
