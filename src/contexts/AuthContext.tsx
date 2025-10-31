import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  role: 'farmer' | 'processor' | 'lab' | 'manufacturer' | 'admin';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing authentication on app load
    const savedUser = localStorage.getItem('herbtrace_user');
    const adminToken = localStorage.getItem('adminToken');
    const adminUser = localStorage.getItem('adminUser');

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('herbtrace_user');
      }
    } else if (adminToken && adminUser) {
      try {
        const parsedUser = JSON.parse(adminUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing admin user data:', error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setLoading(true);

    // Handle admin login differently if needed
    if (role === 'admin') {
      const adminUsers = [
        { id: '1', email: 'admin@herbtrace.com', password: 'admin123', role: 'admin', name: 'Admin User' }
      ];
      
      const foundAdmin = adminUsers.find(u => u.email === email && u.password === password);
      if (foundAdmin) {
        const loggedInUser = {
          id: foundAdmin.id,
          email: foundAdmin.email,
          role: foundAdmin.role as User['role'],
          name: foundAdmin.name
        };
        
        setUser(loggedInUser);
        localStorage.setItem('adminToken', 'admin-token-' + Date.now());
        localStorage.setItem('adminUser', JSON.stringify(loggedInUser));
        localStorage.setItem('herbtrace_user', JSON.stringify(loggedInUser));
        
        setLoading(false);
        navigate('/admin');
        return true;
      }
    }

    // Regular user login
    const users = JSON.parse(localStorage.getItem('herbtrace_users') || '[]');
    
    const defaultUsers = [
      { id: '1', email: 'admin@herbtrace.com', password: 'admin123', role: 'admin', name: 'Admin User' },
      { id: '2', email: 'processor@herbtrace.com', password: 'processor123', role: 'processor', name: 'Processor User' },
      { id: '3', email: 'lab@herbtrace.com', password: 'lab123', role: 'lab', name: 'Lab Technician' },
      { id: '4', email: 'manufacturer@herbtrace.com', password: 'manufacturer123', role: 'manufacturer', name: 'Manufacturer User' },
      { id: '5', email: 'farmer@herbtrace.com', password: 'farmer123', role: 'farmer', name: 'Demo Farmer' },
    ];

    const allUsers = [...defaultUsers, ...users];
    const foundUser = allUsers.find(u => u.email === email && u.password === password && u.role === role);

    if (foundUser) {
      const loggedInUser = {
        id: foundUser.id,
        email: foundUser.email,
        role: foundUser.role as User['role'],
        name: foundUser.name
      };
      setUser(loggedInUser);
      localStorage.setItem('herbtrace_user', JSON.stringify(loggedInUser));
      
      // Navigate based on role after successful login
      switch(foundUser.role) {
        case 'farmer':
          navigate('/farmer');
          break;
        case 'admin':
          navigate('/admin');
          break;
        case 'processor':
          navigate('/processor');
          break;
        case 'lab':
          navigate('/lab');
          break;
        case 'manufacturer':
          navigate('/manufacturer');
          break;
        default:
          navigate('/');
      }
      
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    
    const users = JSON.parse(localStorage.getItem('herbtrace_users') || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      setLoading(false);
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      role: 'farmer',
      name
    };

    users.push(newUser);
    localStorage.setItem('herbtrace_users', JSON.stringify(users));

    const loggedInUser = {
      id: newUser.id,
      email: newUser.email,
      role: 'farmer' as User['role'],
      name: newUser.name
    };
    
    setUser(loggedInUser);
    localStorage.setItem('herbtrace_user', JSON.stringify(loggedInUser));
    
    // Navigate to farmer portal after successful registration
    navigate('/farmer');
    
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('herbtrace_user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Navigate to home page after logout
    navigate('/');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
