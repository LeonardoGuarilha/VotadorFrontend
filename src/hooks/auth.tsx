import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface Usuario {
  id: string;
  nome: string;
  email: string;
}

interface SignInCredentials {
  email: string;
  senha: string;
}

interface AuthContextData {
  user: Usuario;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: Usuario): void;
}

interface AuthState {
  token: string;
  usuario: Usuario;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const usuario = localStorage.getItem('@GoBarber:user');

    if (token && usuario) {
      api.defaults.headers.authorization = `Bearer ${token}`;
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, senha }) => {
    const response = await api.post('v1/autenticar', {
      email,
      senha,
    });

    console.log("response.data " + response.data);

    const { token, usuario } = response.data.dados;

    console.log("id " + usuario.id);
    console.log("usuario " + usuario.nome);
    console.log("token " + token);
    
    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(usuario.nome));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, usuario });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (usuario: Usuario) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(usuario));

      setData({
        token: data.token,
        usuario,
      });
    },
    [setData, data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.usuario, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
