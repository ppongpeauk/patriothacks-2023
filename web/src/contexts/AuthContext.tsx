"use client";

import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    const refreshAuth = () => {

    };

    useEffect(() => {
        setLoading(false);
        refreshAuth();
    }, []);

    const exportData = {
        user,
        refreshAuth
    }

    return (
        <AuthContext.Provider value={exportData as any}>
            {
                !loading && children
            }
        </AuthContext.Provider>
    );
}