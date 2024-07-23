import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create contexts
const UserContext = createContext(null);
const UserUpdateContext = createContext(null);
const UserLogoutContext = createContext(null);

// Custom hooks
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const useSetUser = () => {
  const context = useContext(UserUpdateContext);
  if (!context) {
    throw new Error('useSetUser must be used within a UserProvider');
  }
  return context;
};

export const useLogout = () => {
  const context = useContext(UserLogoutContext);
  if (!context) {
    throw new Error('useLogout must be used within a UserProvider');
  }
  return context;
};

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    console.log('UserProvider: Fetching current user data');
    axios.get('https://helthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/router_login/getCurrentUser', { withCredentials: true })
      .then(response => {
        console.log('User data fetched:', response.data);
        setUser(response.data || null); // Set user data or null if no user is found
      })
      .catch(error => {
        console.error('UserProvider: Error fetching current user:', error);
        setUser(null);
      })
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  const logout = () => {
    axios.post('https://helthlabback-git-vercelback-bytebuzzers-projects.vercel.app/api/router_login/logout', {}, { withCredentials: true })
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        console.error('UserProvider: Error logging out:', error);
      });
  };

  console.log('UserProvider: Rendering provider with user:', user);

  return (
    <UserContext.Provider value={{ user, isReady }}>
      <UserUpdateContext.Provider value={setUser}>
        <UserLogoutContext.Provider value={logout}>
          {children}
        </UserLogoutContext.Provider>
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};
