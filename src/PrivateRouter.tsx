import { ReactNode } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './AuthProvider';

type Props = {
  children: ReactNode;
  loginUser: boolean;
};
const PrivateRoute = (props: Props) => {
  const { user } = useAuthContext();
  const { children, loginUser } = props;
  return user ? (
    <>
      {children}
      <div className="notice">
        <i>you are in a private route.</i>
      </div>
    </>
  ) : (
    <Navigate to="/signin" />
  );
};

export default PrivateRoute;