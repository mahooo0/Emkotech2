import BreadcrumbNavigation from '@/components/BreadCamp';
import { GetServerSidePropsContext } from 'next';
import { NewsData } from '@/components/NewsCard';
import { Aside, NewsItem } from '@/components/NewsIdAside';
import MainID from '@/components/NewsIdMain';
import { NewsSwiper } from '@/components/NewsSwipper';
import {
    getNews,
    getNewsById,
    getPopularNews,
    getTranslations,
} from '@/services/Request';
import React from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/services/CONSTANTS';
import Link from 'next/link';

export interface NewsIdProps {
    newsData: {
        title: string;
        date: string;
        views: number;
        image: string;
        description: string;
        meta_title: string;
        meta_keys: string;
        meta_image: string;
        meta_description: string;
        short_description: string;
    };
    newsList: NewsData[];
    popularData: NewsItem[];
    translationsData: {
        Xəbərlər: string;
        Populyar_xeberler: string;
        Hamısına_bax: string;
    };
    nodata: boolean;
    error: string;
    id: string;
}

export default function NewsId({
    newsData,
    newsList,
    popularData,
    translationsData,
    nodata,
    error,
}: NewsIdProps) {
    const router = useRouter();

    // Handle no data scenario
    if (nodata) {
        console.error('Error fetching data:', error);
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-center text-2xl text-red-500">
                    Failed to load data. Showing default content.
                </h1>
            </div>
        );
    }

    // Loading spinner for fallback states
    if (!newsData || !newsList || !popularData) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
    const { lang } = router.query;
    const language = lang ? lang?.toString() : 'az';
    return (
        <div className="mt-[94px]">
            {/* Breadcrumb Navigation */}
            {translationsData?.Xəbərlər && newsData.title && (
                <BreadcrumbNavigation
                    items={[
                        {
                            text: translationsData.Xəbərlər,
                            path: `/${language}/${ROUTES.news[language]}/`,
                        },
                        {
                            text: newsData.title,
                            path: ``,
                        },
                    ]}
                />
            )}
            <main>
                {/* Title Section */}
                <div className="flex flex-col text-black justify-center w-full mt-[24px]">
                    <h1 className="self-center lg:text-4xl text-[28px] text-center px-3 max-w-[595px]">
                        {newsData.title}
                    </h1>
                </div>

                {/* Main Content Section */}
                <section className="flex mt-3 lg:flex-row flex-col-reverse justify-between lg:px-[100px] md:px-[60px] px-[30px] lg:gap-[76px] gap-[36px]">
                    <div>
                        {/* News Meta Info */}
                        <section className="flex gap-5 items-center mt-4 mb-4 text-base text-neutral-400">
                            <div className="flex gap-2 items-center">
                                <img
                                    loading="lazy"
                                    src="/svg/calendar.svg"
                                    alt="date"
                                    className="w-[18px] h-[18px]"
                                />
                                <span>{newsData.date}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <img
                                    loading="lazy"
                                    src="/svg/views.svg"
                                    alt="views"
                                    className="w-[18px] h-[18px]"
                                />
                                <span>{newsData.views}</span>
                            </div>
                        </section>
                        <MainID data={newsData} />
                    </div>
                    <Aside data={popularData} />
                </section>

                {/* Popular Products Section */}
                <section className="mt-[100px]">
                    <div className="w-full flex lg:justify-center justify-start flex-wrap px-[30px]">
                        <h2 className="text-5xl text-black max-md:text-4xl">
                            {translationsData?.Populyar_xeberler}
                        </h2>
                        <div className="lg:absolute md:absolute static lg:right-[100px] md:right-[60px] right-[30px]">
                            <Link
                                href={`/${language}/${ROUTES.news[language]}`}
                            ></Link>
                            <button className="flex gap-2.5 items-center text-base font-medium text-blue-600">
                                <p>{translationsData?.Hamısına_bax}</p>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/b0bcb315d4534a4ad48392d7c96985a79c21ac585f3284b9a6268cac196f65a9?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                                />
                            </button>
                        </div>
                    </div>
                    <NewsSwiper data={newsList} />
                </section>
            </main>
        </div>
    );
}

// Server-side Data Fetching
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = context?.params?.id; // Get project ID from URL params
    const language = context.req.cookies['accept-language'] || 'en';

    try {
        const [newsData, newsList, popularData, translationsData] =
            await Promise.all([
                getNewsById(language, id),
                getNews(language, 1),
                getPopularNews(language),
                getTranslations(language),
            ]);

        return {
            props: {
                newsData: newsData.data || null,
                newsList: newsList.data || [],
                popularData: popularData.data || [],
                translationsData: translationsData.data || {},
                id,
                nodata: false,
                error: '',
            },
        };
    } catch (error) {
        console.error(error);

        // Default values for error scenarios
        return {
            props: {
                newsData: null,
                newsList: [],
                popularData: [],
                translationsData: {},
                id,
                nodata: true,
                error: `${error}`,
            },
        };
    }
}
