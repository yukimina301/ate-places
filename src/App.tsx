import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AuthProvider } from './AuthProvider';
import {Monthly} from './pages/Monthly';
import {SignIn} from './pages/SignIn';
import {SignUp} from './pages/SignUp';
import PrivateRoute from './PrivateRouter';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<PrivateRoute loginUser={false} children={<Monthly />} />}/>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
