import {startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay} from 'date-fns'
import React, { useEffect, useState } from 'react';
import './SignUp.scss'
import { MonthlyDate, Inputs } from '../models';
import { getMonthly, saveMonthlyDate, deleteMonthlyDate } from '../data/repository';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import { createUserWithEmail, signInWithGoogleAuth } from '../data/api-auth';
import { useNavigate } from 'react-router-dom';


const COMPONENT_NAME = 'SignUp';

export const SignUp = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateEmail = (email: string) => setEmail(email);
  const updatePassword = (password: string) => setPassword(password);

  const onSignUpWithEmailClick = () => {
    createUserWithEmail(navigate, email, password);
  }
  const onSignInWithGoogleAuth = () => {
    signInWithGoogleAuth(navigate);
  }

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateEmail(e.target.value);
  }

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePassword(e.target.value);
  }

  return (
    <div className={COMPONENT_NAME}>
      <div className={`${COMPONENT_NAME}__content`}>
        <form className={`${COMPONENT_NAME}__form`} action="">
          <Input
            type="email"
            name="email"
            inputValue={email}
            onChange={onChangeEmail}
          />

          <Input
            type="password"
            name="password"
            inputValue={password}
            onChange={onChangePassword}
          />

          <Button
            text="登録してログイン"
            onClick={onSignUpWithEmailClick}
          />
        </form>
        <a
          className={`${COMPONENT_NAME}__google-auth`}
          onClick={onSignInWithGoogleAuth}
        >
          googleでログイン
        </a>
      </div>
    </div>
  );
}

export default SignUp;
