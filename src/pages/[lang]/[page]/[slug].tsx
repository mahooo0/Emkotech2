import ProductDetails, { SlideImage } from '@/pages/products/[id]';
import ProjectsId, { Translation } from '@/pages/projects/[id]';
import {
    getNews,
    getNewsBySlug,
    getPopularNews,
    getProductBySlug,
    getProjectBySlug,
    getTopImages,
    getTopMeta,
} from '@/services/Request';
import { ROUTES } from '@/services/CONSTANTS';
import { getProjects } from '@/services/Request';
import { getTranslations } from '@/services/Request';
import { MetaItem, Project, SiteAssets } from '@/types';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import NewsId, { NewsIdProps } from '@/pages/news/[id]';
import Head from 'next/head';
export type Product = {
    id: number;
    slug: { az: string; en: string; ru: string };
    subcategory_id: number;
    subcategory_name: string;
    category_id: number;
    category_name: string;
    meta_title: string;
    meta_keys: string;
    meta_image: string;
    meta_description: string;
    title: string;
    description: string; // Contains HTML content
    image: string; // URL
    video: string; // URL
    price: number;
    discount: number;
    discounted_price: number;
    item_number: string;
    slide_images: SlideImage[];
};

type SimilarProduct = Product;

type ApiResponse = {
    product: Product;
    similars: SimilarProduct[];
};
interface TranslationsData {
    data: {
        Məhsullar: string;
        PopulyarMəhsullar: string;
        HamısınaBax: string;
        SifarisEt: string;
        Name: string;
        Soyad: string;
        Əlaqə_nömrəsi: string;
        Qeyd: string;
    };
}
interface Props {
    productData: ApiResponse | null;
    translationsData: TranslationsData | null;
    project: Project;

    translations: Translation;
    relatedProjects: Project[];
    newsProps: NewsIdProps;
    Logo: SiteAssets;
    Metas: MetaItem[];
}
export default function ID(props: Props) {
    const router = useRouter();
    console.log('metas:', props.Metas);
    const baseUrl =
        typeof window !== 'undefined'
            ? window.location.origin
            : 'https://emkotech.com'; // Fallback for SSR
    const fullUrl = `${baseUrl}${router.asPath}`;
    const { lang, page } = router.query;
    const currentLang = Array.isArray(lang) ? lang[0] : lang;
    if (page === ROUTES.products[currentLang as string]) {
        console.log('AAAAAAAA', props.productData);

        return (
            <>
                <Head>
                    <title>
                        <link rel="canonical" href={fullUrl} />

                        {/* {
                            props.Metas.find(
                                (item) => item.type === 'ProductDetail'
                            )?.['meta-title']
                        } */}
                        {props.productData?.product.meta_title}
                    </title>
                    <meta
                        name="description"
                        content={props.productData?.product.meta_description}
                    />
                    <meta
                        name="keywords"
                        content={props.productData?.product.meta_keys}
                    />
                    <meta
                        property="og:title"
                        content={props.productData?.product.meta_title}
                    />
                    <meta
                        property="og:description"
                        content={props.productData?.product.meta_description}
                    />
                    <meta
                        property="og:image"
                        content={props.productData?.product.meta_image}
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={fullUrl} />
                    <meta
                        property="og:site_name"
                        content={props.productData?.product.meta_title}
                    />
                    <meta name="twitter:card" content="summary" />
                    <meta
                        name="twitter:description"
                        content={props.productData?.product.meta_description}
                    />
                    <meta
                        name="twitter:title"
                        content={props.productData?.product.meta_title}
                    />
                    <meta
                        name="twitter:image"
                        content={props.productData?.product.meta_image}
                    />
                    <meta name="twitter:site" content="@emkotech" />
                    <meta name="twitter:creator" content="@emkotech" />
                    <link
                        rel="icon"
                        href={props.Logo.favicon}
                        type="image/webp"
                    />
                    <link rel="apple-touch-icon" href={props.Logo.favicon} />
                </Head>
                <ProductDetails
                    productData={props.productData}
                    translationsData={props.translationsData}
                />
            </>
        );
    }
    if (page === ROUTES.project[currentLang as string]) {
        return (
            <>
                <Head>
                    <link rel="canonical" href={fullUrl} />

                    <title>
                        {props.project.meta_title}
                        {/* {
                            props.Metas.find(
                                (item) => item.type === 'ProjectDetail'
                            )?.['meta-title']
                        } */}
                    </title>
                    <meta
                        name="description"
                        content={props.project.meta_description}
                    />
                    <meta name="keywords" content={props.project.meta_keys} />
                    <meta property="og:title" content={props.project.title} />
                    <meta
                        property="og:description"
                        content={props.project.meta_description}
                    />
                    <meta
                        property="og:image"
                        content={props.project.meta_image}
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={fullUrl} />
                    <meta
                        property="og:site_name"
                        content={props.project.title}
                    />
                    <meta name="twitter:card" content="summary" />
                    <meta
                        name="twitter:description"
                        content={props.project.meta_description}
                    />
                    <meta name="twitter:title" content={props.project.title} />
                    <meta
                        name="twitter:image"
                        content={props.project.meta_image}
                    />
                    <meta name="twitter:site" content="@emkotech" />
                    <meta name="twitter:creator" content="@emkotech" />
                    <link
                        rel="icon"
                        href={props.Logo.favicon}
                        type="image/webp"
                    />
                    <link rel="apple-touch-icon" href={props.Logo.favicon} />
                </Head>
                <ProjectsId
                    project={props.project}
                    translations={props.translations}
                    relatedProjects={props.relatedProjects}
                />
            </>
        );
    }
    if (page === ROUTES.news[currentLang as string]) {
        console.log('AAAAAAAA', props);

        return (
            <>
                <Head>
                    <link rel="canonical" href={fullUrl} />

                    <title>{props.newsProps.newsData.meta_title}</title>
                    <meta
                        name="description"
                        content={props.newsProps.newsData.meta_description}
                    />
                    <meta
                        name="keywords"
                        content={props.newsProps.newsData.meta_keys}
                    />
                    <meta
                        property="og:title"
                        content={props.newsProps.newsData.meta_title}
                    />
                    <meta
                        property="og:description"
                        content={props.newsProps.newsData.meta_description}
                    />
                    <meta
                        property="og:image"
                        content={props.newsProps.newsData.meta_image}
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={fullUrl} />
                    <meta
                        property="og:site_name"
                        content={props.newsProps.newsData.meta_title}
                    />
                    <meta name="twitter:card" content="summary" />
                    <meta
                        name="twitter:description"
                        content={props.newsProps.newsData.meta_description}
                    />
                    <meta
                        name="twitter:title"
                        content={props.newsProps.newsData.meta_title}
                    />
                    <meta
                        name="twitter:image"
                        content={props.newsProps.newsData.meta_image}
                    />
                    <meta name="twitter:site" content="@emkotech" />
                    <meta name="twitter:creator" content="@emkotech" />
                    <link
                        rel="icon"
                        href={props.Logo.favicon}
                        type="image/webp"
                    />
                    <link rel="apple-touch-icon" href={props.Logo.favicon} />
                </Head>
                <NewsId {...props.newsProps} />
            </>
        );
    }
    return <div>ID</div>;
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {
        page,
        lang = 'az',
        slug,
    } = context.params as {
        page: string;
        lang: string;
        slug: string;
    };

    if (!slug) {
        return { notFound: true };
    }

    // const id = context?.query?.id; // Get product ID from URL
    const [Logo, Metas, translationsData] = await Promise.all([
        getTopImages(lang),
        getTopMeta(lang),
        getTranslations(lang),
    ]);

    if (page === ROUTES.products[lang]) {
        try {
            // const [productData, translationsData] = await Promise.all([
            //     getProduct(lang, id), // Fetch product details using language and id
            //     getTranslations(lang), // Fetch translations using language
            // ]);
            const productData = await getProductBySlug(lang, slug);

            if (!productData?.data) {
                return { notFound: true };
            }

            const translationsData = await getTranslations(lang);

            return {
                props: {
                    productData,
                    translationsData: translationsData?.data || {},
                    Logo: Logo || {},
                    Metas: Metas || {},
                },
            };
        } catch (error) {
            console.error('Error fetching data:', error);
            return {
                props: {
                    productData: null,
                    translationsData: null,
                    Logo: {},
                },
            };
        }
    }
    if (page === ROUTES.project[lang]) {
        try {
            const [projectResponse, projectsResponse] = await Promise.all([
                getProjectBySlug(lang, slug),
                getProjects(lang),
            ]);

            if (!projectResponse?.data) {
                return { notFound: true };
            }
            // Fetch related projects if needed
            // const projectResponse = await getProjectById(lang, id);
            const relatedProjects = projectsResponse.data.filter(
                (p: { slug: { [x: string]: string } }) => p.slug[lang] !== slug
            );

            return {
                props: {
                    project: projectResponse.data || null,
                    translations: translationsData?.data || {},
                    relatedProjects: relatedProjects || [],
                    Logo,
                    Metas,
                },
            };
        } catch (error) {
            console.error('Error fetching data:', error);
            return {
                props: {
                    project: null,
                    translations: {},
                    relatedProjects: [],
                    Logo: {},
                },
            };
        }
    }
    if (page === ROUTES.news[lang]) {
        try {
            const [newsDataBySlug, newsList, popularData] = await Promise.all([
                getNewsBySlug(lang, slug),
                getNews(lang, 1),
                getPopularNews(lang),
            ]);
            if (!newsDataBySlug?.data) {
                return { notFound: true };
            }

            return {
                props: {
                    newsProps: {
                        newsData: newsDataBySlug.data,
                        newsList: newsList?.data || [],
                        popularData: popularData?.data || [],
                        translationsData: translationsData?.data || {},
                        nodata: false,
                        error: '',
                    },
                    Logo: Logo,
                    Metas: Metas,
                },
            };
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error;
            // Default values for error scenarios
        }
    }

    // If the page does not match the expected route
    return {
        notFound: true,
    };
}
