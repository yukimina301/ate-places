import db from '../firebase';
import { MonthlyDate } from '../models';
import { addDoc, collection, deleteDoc, doc, endAt, getDocs, onSnapshot, orderBy, query, setDoc, startAt, Timestamp } from 'firebase/firestore';
import { endOfMonth, format, startOfMonth } from 'date-fns';

// 表示
const dispMonthly = async (targetDate: Date, setMonthlyDates: React.Dispatch<React.SetStateAction<MonthlyDate[]>>) => {
  const monthlyCollectionRef = collection(db, 'monthly');
  const sinceAtDate = Timestamp.fromDate(startOfMonth(targetDate));
  const recentAtDate = Timestamp.fromDate(endOfMonth(targetDate));
  const q = query(monthlyCollectionRef, orderBy('date'), startAt(sinceAtDate), endAt(recentAtDate));

  const  monthly: MonthlyDate[] = [];
  
  /* リアルタイムで取得 */
  const unsub = await onSnapshot(monthlyCollectionRef, (querySnapshot) => {
    querySnapshot.docs.map((doc) => {
      const date: MonthlyDate = {
        docId: doc.id,
        place: doc.data().place,
        date: doc.data().date.toDate(),
        amounts: doc.data().amounts,
      };
      monthly.push(date);
    });
    setMonthlyDates(monthly);
  });
};

// 登録
const addMonthlyDate = async (monthlyDate: MonthlyDate) => {
  console.log('追加');
  if (!monthlyDate.date) {
    return;
  };

  const monthlyCollectionRef = collection(db, 'monthly');

  await addDoc(monthlyCollectionRef, {
    date: Timestamp.fromDate(monthlyDate.date),
    place: monthlyDate.place,
    amounts: monthlyDate.amounts,
  });
};

// 更新
const updateMonthlyDate = async (monthlyDate: MonthlyDate) => {
  console.log('更新');
  if (!monthlyDate.date) {
    return;
  };

  const monthlyRef = doc(db, 'monthly', monthlyDate.docId);
  const updateObject = {
    date: Timestamp.fromDate(monthlyDate.date),
    place: monthlyDate.place,
    amounts: Number(monthlyDate.amounts),
  };
  setDoc(monthlyRef, updateObject, { merge: true });
};

// 削除
const delMonthlyDate = async (monthlyDate: MonthlyDate) => {
  await deleteDoc(doc(db, 'monthly', monthlyDate.docId));
}

export { dispMonthly, addMonthlyDate, updateMonthlyDate, delMonthlyDate }