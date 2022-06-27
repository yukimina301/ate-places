import { MonthlyDate, Inputs } from '../models';

import { dispMonthly, addMonthlyDate, updateMonthlyDate, delMonthlyDate } from '../data/api';
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
  if(docId) {
    await updateMonthlyDate({
      docId,
      date,
      place: inputs.place,
      amounts: inputs.amounts,
    });
  } else {
    await addMonthlyDate({
      docId,
      date,
      place: inputs.place,
      amounts: inputs.amounts,
    });
  }
};

// 削除
const deleteMonthlyDate = async (dataByDate: MonthlyDate) => {
  await delMonthlyDate(dataByDate);
};

export { getMonthly, saveMonthlyDate, deleteMonthlyDate};