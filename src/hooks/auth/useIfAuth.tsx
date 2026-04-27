import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../../api";

interface User {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
}

interface UseIfAuthResult {
    user: User | null;
    isLoading: boolean;
}

export default function useIfAuth(): UseIfAuthResult {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const loadCurrentUser = async () => {
        setIsLoading(true);

        try {
            const response = await fetchCurrentUser();

            if (!response.success) return;

            setUser(response.user);
        } catch(err) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadCurrentUser();
    }, []);

    return { user, isLoading };
}
