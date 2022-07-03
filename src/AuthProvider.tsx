import { User } from 'firebase/auth';
import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from './firebase';

const AuthContext = createContext<{user: User | null}>({user: null});

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [userGetting, setUserGetting] = useState(true);

    const value = {
        user,
        userGetting,
    };

    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            setUser(user);
            setUserGetting(false);
        });
        return () => {
            unsubscribed();
        };
    }, []);

    return <AuthContext.Provider value={value}>
        {!userGetting && children}
    </AuthContext.Provider>;
}