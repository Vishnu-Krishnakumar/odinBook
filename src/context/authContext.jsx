import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Socket } from 'socket.io-client';
import { socket } from '../sockets/socket';
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loggedUser, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const now = Math.floor(Date.now() / 1000); 
          const tokenIat = decoded.iat;
          const maxAge = 60 * 60 ;
          if (now - tokenIat > maxAge) {
            throw new Error('Token too old');
          }
      
          setUser({ ...decoded });
        } catch (err) {
          console.error("Invalid token:", err.message);
          localStorage.removeItem('authToken');
          setUser(null);
        }
      }
      setLoading(false)
    }, []);
  
    const login = (token) => {
      localStorage.setItem('authToken', token);
      const decoded = jwtDecode(token);
      setUser({ ...decoded });
      socket.on();
    };
  
    const logout = () => {
      localStorage.removeItem('authToken');
      setUser(null);
      socket.off();
    };
  
    return (
      <AuthContext.Provider value={{ loggedUser, login, logout,loading }}>
        {!loading ? children : <div>Loading...</div>}
      </AuthContext.Provider>
    );
  }

  export function useAuth() {
    return useContext(AuthContext);
  }