import AboutUs from '@/pages/aboutus';
import Contact from '@/pages/contact';
import Nevs from '@/pages/news';
import Products from '@/pages/products';
import Projects, { Project } from '@/pages/projects';
import { ROUTES } from '@/services/CONSTANTS';
import {
    getTranslations,
    getAboutBanner,
    getAbout,
    getProjects,
    getNews,
    getContacts,
    getTopMeta,
    getTopImages,
} from '@/services/Request';
import {
    AboutBunner,
    AboutData,
    ContactsData,
    MetaItem,
    news,
    SiteAssets,
    // Project,
    Translation,
} from '@/types';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

// Define the expected types for the props
interface Props {
    aboutData: AboutData;
    aboutBannerData: AboutBunner;
    translationsData: Translation;
    translations: Translation;
    projects: Project[];
    news: news;
    currentPage: number;
    contactsData: ContactsData;
    meta: MetaItem[];
    Logo: SiteAssets;
}

const DinamicPagesbylanguages = (props: Props) => {
    const router = useRouter();
    const { lang, page } = router.query;

    console.log('page', page);
    console.log('prps', props.translations);

    // Ensure lang is a string
    const currentLang = Array.isArray(lang) ? lang[0] : lang;

    // Ensure page matches the expected route
    if (page === ROUTES.about[currentLang as string]) {
        return (
            <>
                <Head>
                    <link
                        rel="icon"
                        href={props.Logo.favicon}
                        type="image/webp"
                    />
                    {/* Optional: Add other icons for better compatibility */}
                    <link rel="apple-touch-icon" href={props.Logo.favicon} />
                </Head>
                <AboutUs
                    meta={props.meta}
                    aboutBannerData={props.aboutBannerData}
                    aboutData={props.aboutData}
                    translationsData={props.translationsData}
                    Logo={props.Logo}
                />
            </>
        );
    }
    if (page === ROUTES.products[currentLang as string]) {
        return (
            <>
                <Head>
                    <link
                        rel="icon"
                        href={props.Logo.favicon}
                        type="image/webp"
                    />
                    {/* Optional: Add other icons for better compatibility */}
                    <link rel="apple-touch-icon" href={props.Logo.favicon} />
                </Head>{' '}
                <Products />
            </>
        );
    }
    if (page === ROUTES.project[currentLang as string]) {
        return (
            <>
                <Head>
                    <link
                        rel="icon"
                        href={props.Logo.favicon}
                        type="image/webp"
                    />
                    {/* Optional: Add other icons for better compatibility */}
                    <link rel="apple-touch-icon" href={props.Logo.favicon} />
                </Head>
                <Projects
                    translations={props.translations}
                    projects={props.projects}
                    meta={props.meta}
                />
            </>
        );
    }
    if (page === ROUTES.news[currentLang as string]) {
        return (
            <>
                <Head>
                    <link
                        rel="icon"
                        href={props.Logo.favicon}
                        type="image/webp"
                    />
                    {/* Optional: Add other icons for better compatibility */}
                    <link rel="apple-touch-icon" href={props.Logo.favicon} />
                </Head>
                <Nevs
                    currentPage={props.currentPage}
                    news={props.news}
                    translations={props.translations}
                    meta={props.meta}
                />
            </>
        );
    }
    if (page === ROUTES.contact[currentLang as string]) {
        return (
            <>
                <Head>
                    <link
                        rel="icon"
                        href={props.Logo.favicon}
                        type="image/webp"
                    />
                    {/* Optional: Add other icons for better compatibility */}
                    <link rel="apple-touch-icon" href={props.Logo.favicon} />
                </Head>
                <Contact
                    contactsData={props.contactsData}
                    translationsData={props.translationsData}
                    meta={props.meta}
                />
            </>
        );
    }

    return (
        <div className="mt-[100px]">
            <h1>Page: {page}</h1>
            <h1>Language: {currentLang}</h1>
        </div>
    );
};

export default DinamicPagesbylanguages;
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { page, lang } = context.params as { page: string; lang: string };
    const meta = await getTopMeta(lang);
    const Logo = await getTopImages(lang);
    if (page === ROUTES.about[lang]) {
        try {
            const aboutData = await getAbout(lang);
            const aboutBannerData = await getAboutBanner(lang);
            const translationsData = await getTranslations(lang);

            // const [aboutData, aboutBannerData, translationsData] =
            //     await Promise.all([
            //         getAbout(lang),
            //         getAboutBanner(lang),
            //         getTranslations(lang),

            //     ]);

            return {
                props: {
                    aboutData,
                    aboutBannerData,
                    translationsData,
                    meta,
                    Logo,
                },
            };
        } catch (error) {
            console.error('Error fetching data:', error);
            return {
                props: {
                    aboutData: null,
                    aboutBannerData: null,
                    translationsData: null,
                    meta: [],
                    Logo: {},
                },
            };
        }
    }
    if (page === ROUTES.products[lang]) {
        // const Logo = await getTopImages(lang);

        return {
            props: { Logo },
        };
    }
    if (page === ROUTES.project[lang]) {
        try {
            const projects = await getProjects(lang);
            const translations = await getTranslations(lang);
            // const meta = await getTopMeta(lang);
            // const Logo = await getTopImages(lang);

            return {
                props: {
                    projects: projects.data || [],
                    translations: translations.data || {},
                    meta,
                    Logo,
                },
            };
        } catch (error) {
            console.error('Error fetching data:', error);
            return {
                props: {
                    projects: [],
                    translations: {},
                    meta: [],
                },
            };
        }
    }
    if (page === ROUTES.news[lang]) {
        const { query } = context;

        const currentPage = parseInt(
            Array.isArray(query.pagination)
                ? query.pagination[0]
                : query.pagination || '1',
            10
        );
        try {
            const [news] = await Promise.all([getNews(lang, currentPage)]);
            // const news = await getNews(lang);
            const translations = await getTranslations(lang);
            // const meta = await getTopMeta(lang);
            // const Logo = await getTopImages(lang);

            return {
                props: {
                    news,
                    translations: translations?.data || {},
                    currentPage,
                    meta,
                    Logo,
                },
            };
        } catch (error) {
            console.error('Error fetching data:', error);
            return {
                props: {
                    news: { data: [], total_pages: 1 },
                    translations: { Xəbərlər: 'Xəbərlər' },
                    currentPage,
                },
            };
        }
    }
    if (page === ROUTES.contact[lang]) {
        try {
            const contactsData = await getContacts(lang);
            const translationsData = await getTranslations(lang);
            const meta = await getTopMeta(lang);
            const Logo = await getTopImages(lang);

            console.log(contactsData);

            // Ensure that contactsData and translationsData are valid
            if (!contactsData || !translationsData || !meta) {
                throw new Error('Missing data');
            }

            return {
                props: {
                    lang,
                    contactsData,
                    translationsData,
                    meta,
                    Logo,
                },
            };
        } catch (error) {
            console.error('Error fetching data:', error);
            return {
                props: {
                    contactsData: null,
                    translationsData: null,
                    meta: [],
                },
            };
        }
    }
    // If the page does not match the expected route
    return {
        notFound: true,
    };
}
