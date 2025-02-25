import BreadcrumbNavigation from '@/components/BreadCamp';

import {
    getAbout,
    getAboutBanner,
    getTopMeta,
    getTranslations,
} from '@/services/Request';
import { MetaItem, SiteAssets } from '@/types';
import { parse } from 'cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
interface CameraData {
    id: number;
    title: string;
    description: string;
    image: string;
    image2: string;
    image3: string;
}
interface AboutBunnerItem {
    id: number;
    title: string;
    description: string;
    image: string;
}
type TranslationData = Record<string, string>;

export interface Translation {
    data: TranslationData;
}
interface AboutBunner {
    data: AboutBunnerItem[];
}
interface AboutData {
    data: CameraData[];
}
interface AboutBannerItem {
    id: number;
    image: string;
    title: string;
    description: string;
}

interface AboutUsProps {
    aboutData: AboutData;
    aboutBannerData: AboutBunner;
    translationsData: Translation;
    meta: MetaItem[];
    Logo: SiteAssets;
}

export default function AboutUs({
    aboutData,
    aboutBannerData,
    translationsData,
    meta,
}: AboutUsProps) {
    const router = useRouter();

    if (!aboutData || !aboutBannerData || !translationsData || !meta)
        return <p>error</p>;
    console.log('meta:', meta);

    const pagemetas = meta?.find((item) => item.type === 'Abouts');
    console.log('pagemetas', pagemetas);
    const baseUrl =
        typeof window !== 'undefined'
            ? window.location.origin
            : 'https://emkotech.com';

    const fullUrl = `${baseUrl}${router.asPath}`;
    return (
        <>
            <Head>
                <title>{pagemetas?.['meta-title']}</title>
                <link rel="canonical" href={fullUrl} />

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
                <main>
                    <BreadcrumbNavigation
                        items={[
                            {
                                text: `${translationsData?.data?.Haqqımızda}`,
                                path: '/aboutus',
                            },
                        ]}
                    />
                    <section className="flex flex-col-reverse max-sm:flex-col rounded-2xl  gap-6 mt-6">
                        <div className="z-10 mt-0 max-md:-mr-2 max-md:max-w-full">
                            <div className="flex lg:gap-[0] gap-5 flex-col items-center lg:px-[100px] md:px-[60px] px-[30px]">
                                <div className="flex flex-col w-full max-md:ml-0 max-md:w-full ">
                                    <h1 className="lg:text-5xl leading-[64px] max-md:leading-10 text-[2rem] text-black lg:mt-10 mt-0 max-md:max-w-full  lg:leading-[56px] text-center ">
                                        {aboutData?.data[0].title}
                                    </h1>
                                </div>
                                <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: aboutData?.data[0]
                                                .description,
                                        }}
                                        className="lg:mt-4 mt-0 text-lg text-black  max-md:max-w-full leading-6 leandingforHtml text-start"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-0 w-full max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col mt-0">
                                <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                                    <Image
                                        loading="lazy"
                                        src={aboutData?.data[0].image}
                                        alt="About Image 1"
                                        width={800}
                                        height={600}
                                        className="object-cover object-center w-full rounded-none aspect-square max-md:mt-6 max-md:max-w-full max-h-[480px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="flex flex-col rounded-2xl lg:px-[100px] md:px-[60px] px-[30px] lg:mt-[120px] mt-[60px]">
                        <h2 className="self-center text-5xl font-medium text-black max-md:max-w-full max-md:text-4xl">
                            <span className="text-[#EA9B12] ">
                                {translationsData?.data?.Yekunlaşdırma}{' '}
                            </span>
                            <span className="">
                                {translationsData?.data?.Şirkətimizin}
                            </span>
                        </h2>
                        <div className="lg:mt-12 mt-0 w-full  max-md:max-w-full">
                            <div className="flex gap-5 max-md:flex-col mt-6">
                                {aboutBannerData?.data.map(
                                    (item: AboutBannerItem) => (
                                        <div
                                            className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full"
                                            key={item.id}
                                        >
                                            <div className="flex flex-col grow p-5 w-full text-black bg-indigo-50 rounded-2xl border border-blue-200 border-solid lg:mt-6 mt-0">
                                                <Image
                                                    loading="lazy"
                                                    src={item.image}
                                                    alt={item.title}
                                                    width={54}
                                                    height={54}
                                                    className="object-contain aspect-square w-[54px]"
                                                />
                                                <div className="flex flex-col mt-5 w-full">
                                                    <div className="text-lg font-semibold">
                                                        {item.title}
                                                    </div>
                                                    <div
                                                        className="mt-1.5 text-sm"
                                                        dangerouslySetInnerHTML={{
                                                            __html: item.description,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = parse(context.req.headers.cookie || '');
    const lang = cookies['accept-language'] || 'az';

    try {
        const [aboutData, aboutBannerData, translationsData, meta] =
            await Promise.all([
                getAbout(lang),
                getAboutBanner(lang),
                getTranslations(lang),
                getTopMeta(lang),
            ]);

        return {
            props: {
                aboutData,
                aboutBannerData,
                translationsData,
                meta,
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
            },
        };
    }
}
