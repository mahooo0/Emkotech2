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
