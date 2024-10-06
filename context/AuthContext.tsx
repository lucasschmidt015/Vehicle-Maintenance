import React, { createContext, useContext, useEffect, useState } from 'react';
import { firebase } from '@/services/firebaseConnection';

interface AuthContextData {
    user: firebase.User | null;
    loading: boolean;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user || null);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
        if( !email || !password ) {
            throw new Error('Preencha todos os campos!');
        }
        setLoading(true);
        const loggedUser = await firebase.auth().signInWithEmailAndPassword(email, password);
        setUser(loggedUser.user);
        setLoading(false);
    } catch (error) {
        throw new Error('Erro ao realizar login!');
    }
  }

  const signUp = async (name: string, email: string, password: string, confirmPassword: string) => {
    if(!name || !email || !password || !confirmPassword) {
        throw new Error('Preencha todos os campos!');
    }

    if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem!');
    }

    try {
        setLoading(true);
        const createdUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await firebase.firestore().collection('users').doc(createdUser.user.uid).set({
            name,
            email,
        });
        setUser(createdUser.user);
        setLoading(false);
    } catch (error) {
        throw new Error('Erro ao criar conta!');
    }
  };

  const signOut = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};