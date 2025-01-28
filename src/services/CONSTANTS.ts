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
        ru: 'пронас',
    },
    products: {
        az: 'məhsullar',
        en: 'products',
        ru: 'продукты',
    },
    project: {
        az: 'layihələr',
        en: 'projects',
        ru: 'проекты',
    },
    news: {
        az: 'xəbərlər',
        en: 'news',
        ru: 'новости',
    },
    contact: {
        az: 'əlaqə',
        en: 'contact',
        ru: 'контакт',
    },
};
