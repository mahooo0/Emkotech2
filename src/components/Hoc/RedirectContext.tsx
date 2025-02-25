import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { updateRoutes } from '@/services/CONSTANTS'; // Import the update function

const useRedirect = () => {
    const [redirects, setRedirects] = useState<
        { from: string; to: string }[] | null
    >(null);
    const router = useRouter();

    useEffect(() => {
        const fetchRedirects = async () => {
            try {
                const res = await fetch(
                    'https://emkotech.epart.az/api/redirects'
                );
                const { data } = await res.json();

                if (!data || !Array.isArray(data)) return;
                setRedirects(data);

                // Update `ROUTES` dynamically based on fetched redirects
                updateRoutes(data);
            } catch (error) {
                console.error('Redirect Fetch Error:', error);
            }
        };

        fetchRedirects();
    }, []);

    useEffect(() => {
        if (!redirects) return;

        const currentPath = window.location.pathname.replace(/^\/|\/$/g, ''); // Normalize path
        console.log('🔎 Checking Redirect for:', currentPath);

        const redirectEntry = redirects.find(
            (entry) => entry.from.replace(/^\/|\/$/g, '') === currentPath
        );

        if (redirectEntry) {
            console.log(
                `🔀 Redirecting from ${currentPath} to ${redirectEntry.to}`
            );
            router.replace(redirectEntry.to.replace(/^\/|\/$/g, ''));
        }
    }, [router.pathname, redirects]);

    return redirects;
};

export default useRedirect;
