import BreadcrumbNavigation from '@/components/BreadCamp';
import PaginationComponent from '@/components/Pagination';
import { ROUTES } from '@/services/CONSTANTS';
import { getNews, getTopMeta, getTranslations } from '@/services/Request';
import { MetaItem, Translation } from '@/types';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface NewsItem {
    slug: {
        az: string;
        en: string;
        ru: string;
    };
    id: number;
    image: string;
    title: string;
    short_description: string;
    date: string;
    views: number;
}

interface NevsProps {
    news: {
        data: NewsItem[];
        total_pages: number;
    };
    translations: Translation;
    currentPage: number;
    meta: MetaItem[];
}

export default function Nevs({
    news,
    translations,
    currentPage,
    meta,
}: NevsProps) {
    const router = useRouter();
    const { lang } = router.query;
    const language = lang ? lang?.toString() : 'az';
    const handlePageChange = (page: number) => {
        router.push(`/${lang}/${ROUTES.news[language]}?pagination=${page}`);
    };
    console.log('meta:', meta);
    const pagemetas = meta?.find((item) => item.type === 'News');
    console.log('pagemetas', pagemetas);
    const baseUrl =
        typeof window !== 'undefined'
            ? window.location.origin
            : 'https://emkotech.com'; // Fallback for SSR
    const fullUrl = `${baseUrl}${router.asPath}`;
    return (
        <>
            <Head>
                <link rel="canonical" href={fullUrl} />

                <title>{pagemetas?.['meta-title']}</title>
                <meta
                    name="description"
                    content={pagemetas?.['meta-description']}
                />
                <meta name="keywords" content={pagemetas?.['meta-keys']} />
                <meta property="og:title" content={pagemetas?.['meta-title']} />
                <meta
                    property="og:description"
                    content={pagemetas?.['meta-description']}
                />
                <meta property="og:image" content={pagemetas?.['meta-image']} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={fullUrl} />
                <meta
                    property="og:site_name"
                    content={pagemetas?.['meta-title']}
                />
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:description"
                    content={pagemetas?.['meta-description']}
                />
                <meta
                    name="twitter:title"
                    content={pagemetas?.['meta-title']}
                />
                <meta
                    name="twitter:image"
                    content={pagemetas?.['meta-image']}
                />
                <meta name="twitter:site" content="@emkotech" />
                <meta name="twitter:creator" content="@emkotech" />
            </Head>
            <div className="mt-[94px]">
                <BreadcrumbNavigation
                    items={[
                        {
                            text: `${translations?.Xəbərlər}`,
                            path: '/news',
                        },
                    ]}
                />
                <main>
                    <section className="flex flex-col text-black">
                        <h1
                            data-layername="məhsullar"
                            className="self-center text-5xl max-md:text-4xl mt-[24px]"
                        >
                            {translations?.Xəbərlər}
                        </h1>
                    </section>
                    <div className="flex justify-center">
                        <section className="w-fit grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 justify-self-center items-center sm:grid-cols-2 gap-x-4 lg:gap-y-[52px] gap-y-8 lg:px-[100px] md:px-[60px] px-[30px] mt-[34px]">
                            {news?.data.map((item: NewsItem, i: number) => (
                                <Link
                                    onClick={() => {
                                        localStorage.setItem(
                                            'slug',
                                            JSON.stringify(item.slug)
                                        );
                                    }}
                                    key={i}
                                    href={`/${language}/${
                                        ROUTES.news[language]
                                    }/${
                                        item.slug[
                                            (language as 'az') || 'en' || 'ru'
                                        ]
                                    }`}
                                >
                                    {' '}
                                    <div
                                        key={i}
                                        className="flex cursor-pointer overflow-hidden flex-col justify-center bg-white rounded-2xl max-w-[288px]"
                                    >
                                        <div className="flex overflow-hidden flex-col w-full">
                                            <img
                                                loading="lazy"
                                                className="object-cover w-full aspect-[1.38]"
                                                src={item.image}
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center p-6 w-full bg-white text-zinc-800">
                                            <div className="flex flex-col w-full">
                                                <h2 className="text-xl font-medium leading-snug h-[2.5em] overflow-hidden">
                                                    {item.title}
                                                </h2>
                                                <div
                                                    className="mt-2 text-sm tracking-wide leading-5 line-clamp-2"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.short_description,
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="flex flex-col mt-8 w-full text-xs tracking-normal leading-snug">
                                                <div className="flex gap-10 justify-between items-center mt-4 w-full">
                                                    <div>{item.date}</div>
                                                    <div className="flex gap-2 justify-center items-center">
                                                        <span>
                                                            {item.views}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </section>
                    </div>

                    <PaginationComponent
                        totalPages={news?.total_pages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </main>
            </div>{' '}
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const { query, req } = context;
    const currentPage = parseInt(
        Array.isArray(query.pagination)
            ? query.pagination[0]
            : query.pagination || '1',
        10
    );
    const language = req.cookies['accept-language'] || 'en';

    try {
        const [news, translations, meta] = await Promise.all([
            getNews(language, currentPage),
            getTranslations(language),
            getTopMeta(language),
        ]);

        return {
            props: {
                news,
                translations: translations?.data || {},
                currentPage,
                meta,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                news: { data: [], total_pages: 1 },
                translations: { Xəbərlər: 'Xəbərlər' },
                currentPage,
                meta: [],
            },
        };
    }
}
