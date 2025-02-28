
// import { UserApi } from '@/api';
import { pageRoutes } from '@/components/routes';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface IUser {
    user: IUserContext | null;
    // setUser: (user: IUserContext | null) => void;
}
// Create a context
const UserContext = createContext<IUser | null>(null);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user,setUser] = useState<IUserContext | null>( window.user); // Initialize user state

    useEffect(() => {
        // if (user?.user_login==null || typeof(user?.user_login) === 'undefined') {
        //     window.location.href = user?.login_url||"/";
        // } else {
        //     UserApi.getUserWorkspaces().then((res) => {
        //         var newUser = {...user,...res};
        //         // console.log(newUser);
        //         setUser(newUser);
        //     }).catch((err) => {
        //         console.error("Error in get user workspaces:", err);
        //     });
        // }
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};