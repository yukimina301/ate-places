import { User } from 'firebase/auth';
import { MonthlyDate, Inputs } from '../models';

import { dispMonthly, addMonthlyDate, updateMonthlyDate, delMonthlyDate } from './api-store';
// 表示
const getMonthly = async (
  selectedMonth: Date,
  setAction: React.Dispatch<React.SetStateAction<MonthlyDate[]>>
) => {
  await dispMonthly(selectedMonth, setAction);
}

// 保存
const saveMonthlyDate = async (
  docId: string,
  date: Date,
  inputs: Inputs,
) => {
  const monthlyDate = {
    docId,
    date,
    place: inputs.place,
    amounts: inputs.amounts,
    detail: inputs.detail,
  };

  if(docId) {
    await updateMonthlyDate(monthlyDate);
  } else {
    await addMonthlyDate(monthlyDate);
  }
};

// 削除
const deleteMonthlyDate = async (dataByDate: MonthlyDate) => {
  await delMonthlyDate(dataByDate);
};

export { getMonthly, saveMonthlyDate, deleteMonthlyDate};