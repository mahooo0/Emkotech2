import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const fetchRedirects = async () => {
            try {
                const res = await fetch(
                    'https://emkotech.epart.az/api/redirects'
                );
                const { data } = await res.json();

                if (!data || !Array.isArray(data)) return;

                const currentPath = window.location.pathname;
                console.log('currentPath', currentPath);

                const redirectEntry = data.find(
                    (entry: { from: string }) => entry.from === currentPath
                );

                if (redirectEntry) {
                    router.push(`${redirectEntry.to}`);
                }
            } catch (error) {
                console.error('Redirect Fetch Error:', error);
            }
        };

        fetchRedirects();
    }, [router.pathname]);
};

export default useRedirect;
