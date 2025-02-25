import React, { createContext, useContext, ReactNode } from 'react';

interface RedirectContextProps {
    redirectTo: (path: string) => void;
}

const RedirectContext = createContext<RedirectContextProps | undefined>(
    undefined
);

export const RedirectProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    return (
        <RedirectContext.Provider value={undefined}>
            {children}
        </RedirectContext.Provider>
    );
};

export const useRedirect = (): RedirectContextProps => {
    const context = useContext(RedirectContext);
    if (!context) {
        throw new Error('useRedirect must be used within a RedirectProvider');
    }
    return context;
};
