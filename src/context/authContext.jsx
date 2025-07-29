import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loggedUser, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser({ ...decoded }); 
        } catch (err) {
          console.error("Invalid token");
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
    };
  
    const logout = () => {
      localStorage.removeItem('authToken');
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ loggedUser, login, logout,loading }}>
        {children}
      </AuthContext.Provider>
    );
  }

  export function useAuth() {
    return useContext(AuthContext);
  }