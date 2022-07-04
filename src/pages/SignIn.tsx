import {startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameDay} from 'date-fns'
import React, { useEffect, useState } from 'react';
import './SignIn.scss'
import { MonthlyDate, Inputs } from '../models';
import { getMonthly, saveMonthlyDate, deleteMonthlyDate } from '../data/repository';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';
import { signInWithEmail, signInWithGoogleAuth } from '../data/api-auth';
import { useNavigate } from 'react-router-dom';
import { Anchor } from '../components/atoms/Anchor';


const COMPONENT_NAME = 'SignIn';

export const SignIn = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateEmail = (email: string) => setEmail(email);
  const updatePassword = (password: string) => setPassword(password);

  const onSignInWithEmailClick = () => {
    signInWithEmail(navigate, email, password);
  }

  const onSignInWithGoogleAuthClick = () => {
    signInWithGoogleAuth(navigate);
  }

  const onSignUpClick = () => {
    navigate('/signup');
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
            text="ログイン"
            onClick={onSignInWithEmailClick}
          />
        </form>

        <Anchor onClick={onSignInWithGoogleAuthClick} text='googleでログイン'/>

        <Anchor onClick={onSignUpClick} text='新規作成'/>
      </div>
    </div>
  );
}

export default SignIn;
