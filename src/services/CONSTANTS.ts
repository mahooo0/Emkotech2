// routes.ts
type Routes = {
    [key: string]: {
        [lang: string]: string;
    };
};

export const ROUTES: Routes = {
    about: {
        az: 'haqimizda',
        en: 'about',
        ru: 'pronas',
    },
    products: {
        az: 'mehsullar',
        en: 'products',
        ru: 'produkti',
    },
    project: {
        az: 'layiheler',
        en: 'projects',
        ru: 'proekti',
    },
    news: {
        az: 'xeberler',
        en: 'news',
        ru: 'novosti',
    },
    contact: {
        az: 'elaqe',
        en: 'contact',
        ru: 'kontakti',
    },
};

export const updateRoutes = (redirects: { from: string; to: string }[]) => {
    redirects.forEach(({ from, to }) => {
        const fromParts = from.split('/').filter(Boolean); // Remove empty strings
        const toParts = to.split('/').filter(Boolean);

        if (fromParts.length === 2 && toParts.length === 2) {
            const [lang, oldPage] = fromParts;
            const [_, newPage] = toParts;
            console.log(_);

            for (const key in ROUTES) {
                console.log('CNDR', ROUTES);
                if (ROUTES[key][lang] === oldPage) {
                    ROUTES[key][lang] = newPage; // Update dynamically
                }
            }
            console.log('🔄 Updated ROUTES:', ROUTES);
        }
    });
};
