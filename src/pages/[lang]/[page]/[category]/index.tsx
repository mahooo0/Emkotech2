import Products from '@/pages/products';
import { Project } from '@/pages/projects';
import { ROUTES } from '@/services/CONSTANTS';
import { getTopMeta, getTopImages } from '@/services/Request';
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

    // Ensure lang is a string
    const currentLang = Array.isArray(lang) ? lang[0] : lang;

    // Ensure page matches the expected route

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
    console.log(meta);

    if (page === ROUTES.products[lang]) {
        return {
            props: { Logo },
        };
    }

    // If the page does not match the expected route
    return {
        notFound: true,
    };
}
