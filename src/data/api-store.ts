import {db, auth} from '../firebase';
import { MonthlyDate } from '../models';
import { addDoc, collection, deleteDoc, doc, endAt, onSnapshot, where, orderBy, query, setDoc, startAt, Timestamp } from 'firebase/firestore';
import { endOfMonth, startOfMonth } from 'date-fns';

// 表示
const dispMonthly = async (targetDate: Date, setMonthlyDates: React.Dispatch<React.SetStateAction<MonthlyDate[]>>) => {
  if (!auth.currentUser?.uid) return;

  const monthlyCollectionRef = collection(db, 'monthly');
  const sinceAtDate = Timestamp.fromDate(startOfMonth(targetDate));
  const recentAtDate = Timestamp.fromDate(endOfMonth(targetDate));
  const q = query(
    monthlyCollectionRef,
    orderBy('date'),
    where('uid', '==', auth.currentUser?.uid),
    startAt(sinceAtDate),
    endAt(recentAtDate)
  );

  const  monthly: MonthlyDate[] = [];
  
  /* リアルタイムで取得 */
  const unsub = await onSnapshot(q, (querySnapshot) => {
    querySnapshot.docs.map((doc) => {
      const dateData: MonthlyDate = {
        docId: doc.id,
        place: doc.data().place,
        date: doc.data().date.toDate(),
        amounts: doc.data().amounts,
        detail: doc.data().detail,
      };
      monthly.push(dateData);
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
    uid: auth.currentUser?.uid,
    date: Timestamp.fromDate(monthlyDate.date),
    place: monthlyDate.place,
    amounts: monthlyDate.amounts,
    detail: monthlyDate.detail,
  });
};

// 更新
const updateMonthlyDate = async ( monthlyDate: MonthlyDate) => {
  console.log('更新');
  if (!monthlyDate.date) {
    return;
  };

  const monthlyRef = doc(db, 'monthly', monthlyDate.docId);
  const updateObject = {
    date: Timestamp.fromDate(monthlyDate.date),
    place: monthlyDate.place,
    amounts: Number(monthlyDate.amounts),
    detail: monthlyDate.detail,
  };
  setDoc(monthlyRef, updateObject, { merge: true });
};

// 削除
const delMonthlyDate = async (monthlyDate: MonthlyDate) => {
  console.log('削除');
  await deleteDoc(doc(db, 'monthly', monthlyDate.docId));
}

export { dispMonthly, addMonthlyDate, updateMonthlyDate, delMonthlyDate }