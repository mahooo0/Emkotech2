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
                    (entry: { original_url: string }) =>
                        entry.original_url === currentPath
                );

                if (redirectEntry) {
                    router.push(`${redirectEntry.redirect_url}`);
                }
            } catch (error) {
                console.error('Redirect Fetch Error:', error);
            }
        };

        fetchRedirects();
    }, [router.pathname]);
};

export default useRedirect;
