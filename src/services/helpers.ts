import { ROUTES } from './CONSTANTS';

export function updateLangAndRoute(
    url: string,
    newLang: 'az' | 'en' | 'ru'
): string {
    // Split the URL into parts and remove leading/trailing slashes
    const urlParts = url.split('/').filter(Boolean);

    console.log('urlParts', urlParts);

    // Add language if it's missing or update if necessary
    if (['az', 'en', 'ru'].includes(urlParts[0])) {
        urlParts[0] = newLang; // Update the language part
    } else {
        urlParts.unshift(newLang); // Add the language part if missing
    }

    // Translate the route if it matches any route key in ROUTES
    if (urlParts.length > 1) {
        const currentRoute = urlParts[1];
        console.log('currentRoute', currentRoute);

        // Check if the current route matches any key in ROUTES
        const routeKey = Object.keys(ROUTES).find((key) =>
            Object.values(ROUTES[key]).includes(currentRoute)
        );

        if (routeKey) {
            urlParts[1] = ROUTES[routeKey][newLang]; // Translate the route to the new language
        }
    }

    // If there's an ID segment, it should remain untouched
    if (urlParts.length > 2) {
        console.log('urlParts', urlParts);
        if (urlParts[2] === 'detail') {
            const slug = localStorage.getItem('slug');
            if (!slug) {
                return `/${urlParts.join('/')}`;
            }

            const newSlug = JSON.parse(slug);

            urlParts[3] = newSlug[newLang];
        } else {
            const CAtegorySlugStr = localStorage.getItem('categorySlug');
            if (!CAtegorySlugStr) {
                return `/${urlParts.join('/')}`;
            }
            const CAtegorySlug = JSON.parse(CAtegorySlugStr);
            urlParts[2] = CAtegorySlug[newLang];
            if (urlParts[3]) {
                const SubCategorySlugStr =
                    localStorage.getItem('SubCategorySlug');
                if (!SubCategorySlugStr) {
                    return `/${urlParts.join('/')}`;
                }
                const SubCategorySlug = JSON.parse(SubCategorySlugStr);
                urlParts[3] = SubCategorySlug[newLang];
            }
        }
    }
    console.log('path', `/${urlParts.join('/')}`);

    return `/${urlParts.join('/')}`;
}

// Example usage:
const url = '/az/haqımızda';
const newLang: 'az' | 'en' | 'ru' = 'ru';

console.log(updateLangAndRoute(url, newLang)); // Output: "/ru/пронас"
