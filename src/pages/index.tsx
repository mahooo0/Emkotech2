import { ProductSwiper } from '@/components/ProductSwipper';
import { useRouter } from 'next/router';
import { parse } from 'cookie';

import {
    getBottomBanner,
    getCustomers,
    GetDiscountedProduct,
    getPartners,
    GetPopulyarProduct,
    getProductCategories,
    getProducts,
    getStatistics,
    getTopBanner,
    getTopImages,
    getTopMeta,
    getTranslations,
} from '@/services/Request';
import PartnersSlider from '@/components/PartnersSwipper';
import React from 'react';
import { Product } from './products/[id]';
import { TranslationsData } from './contact';
import { GetServerSidePropsContext } from 'next';
import { ROUTES } from '@/services/CONSTANTS';
import Link from 'next/link';
import { MetaItem, SiteAssets } from '@/types';
import Head from 'next/head';
import HomeCategory, { Category } from '@/components/HomeCategory';
// import VideoBanner from '@/components/Vidio';

interface Statistic {
    statistic: string;
    value: string;
}

// interface Project {
//     slug: { az: string; en: string; ru: string };
//     id: number;
//     title: string;
//     description: string;
//     image: string;
// }
interface Customer {
    id: number;
    name: string;
    description: string;
    icon: string;
}
interface TopBannerData {
    data: {
        title: string;
        description: string;
        button_text: string;
        video: string;
    };
}

// interface ProductCategory {
//     id: number;
//     title: string;
//     description: string;
//     image: string;
// }
interface ButtonBannerData {
    data: {
        title: string;
        description: string;
        button_text: string;
        image: string;
    };
}
interface Partner {
    name: string;
    url: string;
    icon: string;
}

interface PartnerData {
    data: Partner[];
}

interface HomePageProps {
    topBannerData: TopBannerData;
    statisticsData: { data: Statistic[]; projects: [] };
    productsData: { data: Product[] };
    customersData: { data: Customer[] };
    bottomBannerData: ButtonBannerData;
    partnersData: PartnerData;
    productCategoriesData: { data: Category[] };
    translationsData: TranslationsData;
    Meta: MetaItem[];
    Logo: SiteAssets;
    DiscountedProducts: Product[];
    PopulyarProduct: Product[];
}

export default function Home({
    topBannerData,
    statisticsData,
    productsData,
    customersData,
    bottomBannerData,
    partnersData,
    productCategoriesData,
    translationsData,
    Meta,
    Logo,
    DiscountedProducts,
    PopulyarProduct,
}: HomePageProps) {
    const router = useRouter();
    const { lang } = router.query;
    const language = lang ? lang?.toString() : 'az';
    const pagemetas = Meta?.find((item) => item.type === 'Home');
    console.log('PopulyarProduct', PopulyarProduct);
    const baseUrl =
        typeof window !== 'undefined'
            ? window.location.origin
            : 'https://emkotech.com'; // Fallback for SSR
    const fullUrl = `${baseUrl}${router.asPath}`;
    console.log('productCategoriesData', productCategoriesData);
    console.log('productsData', productsData);

    return (
        <>
            {/* <Header activeindex={0} />{' '} */}
            <Head>
                <link rel="icon" href={Logo.favicon} type="image/webp" />
                {/* Optional: Add other icons for better compatibility */}
                <link rel="apple-touch-icon" href={Logo.favicon} />

                <title>{pagemetas?.['meta-title']}</title>
                <meta
                    name="description"
                    content={pagemetas?.['meta-description']}
                />
                <link rel="canonical" href={fullUrl} />
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
            <section className=" relative max-h-[553px] mt-[70px] max-sm:h-[420px]">
                <video
                    className="  w-full h-[100%] z-0 object-cover max-h-[553px] "
                    loop={true}
                    autoPlay={true}
                    muted={true}
                    src={topBannerData?.data?.video}
                ></video>
                <div className="flex absolute  top-0 left-0 overflow-hidden z-10 flex-col justify-center items-start px-[100px] py-44 bg-black bg-opacity-20 max-md:px-5 max-md:py-24 w-full h-full max-sm:p-0 max-sm:justify-end max-sm:px-[33px] max-sm:py-[40px]">
                    <div className="flex flex-col max-w-full w-[652px]">
                        <h1 className="self-start lg:text-5xl md:text-3xl text-2xl font-medium text-white  max-md:max-w-full max-sm:text-[20px] max-sm:font-medium max-sm:leading-8 ">
                            {topBannerData?.data?.title}
                        </h1>
                        <div
                            className="mt-3.5 lg:text-lg   md:text-lg text-[12px] text-gray-200 max-md:max-w-full max-sm:text-[16px]"
                            dangerouslySetInnerHTML={{
                                __html: topBannerData?.data?.description,
                            }}
                        ></div>
                        <Link
                            href={`/${language}/${ROUTES.products[language]}`}
                        >
                            {' '}
                            <button className="w-[200px]  h-[47px]  relative flex justify-between items-center mt-[20px]">
                                <img
                                    src="/images/homebtn.png"
                                    alt=""
                                    className="w-full h-full absolute"
                                />
                                <span className="z-20 w-[75%]  h-full flex justify-center items-center text-white">
                                    {translationsData?.data?.Daha_çox}
                                </span>
                                <svg
                                    className="w-[20%]  z-20"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.91 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91 4.08002"
                                        stroke="white"
                                        stroke-width="1.5"
                                        stroke-miterlimit="10"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="lg:mt-[100px] md:mt-[80px] mt-[40px] lg:px-[100px] md:px-[60px] px-[30px]">
                <div className="flex flex-col rounded-2xl">
                    <h2 className="self-center text-5xl text-black text-wrap  max-md:text-4xl mr-2">
                        {translationsData?.data?.statisciksTitle}
                    </h2>
                    <div className="flex overflow-hidden flex-col justify-center items-center px-16 py-14 mt-12 w-full rounded-2xl bg-zinc-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                        <div className="flex flex-nowrap w-full gap-10 max-sm:gap-6 justify-center items-center text-2xl text-center text-[#0B458F] border-b border-[#0B458F] max-md:max-w-full">
                            {statisticsData.data.map(
                                (item: Statistic, index: number) => (
                                    <div
                                        key={index}
                                        className="flex flex-col grow shrink justify-center self-stretch my-auto whitespace-nowrap  w-[157px]"
                                    >
                                        <h3 className="gap-2.5 self-stretch lg:p-2.5 p-0 w-full font-medium max-sm:text-[14px]">
                                            {item.statistic}
                                        </h3>
                                        <p className="gap-2.5 self-stretch lg:p-2.5 p-0 mt-2.5 w-full font-semibold max-sm:text-[14px]">
                                            {item.value}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                        {/* <div className="flex  lg:flex-row md:flex-row justify-between flex-col lg:gap-[140px] md:gap-[140px] gap-10 mt-12 w-full max-md:mt-10 max-md:max-w-full">
                            <p className=" text-lg text-wrap text-[#BDBDC1] lg:w-[776px] w-full max-sm:text-[16px]">
                                {translationsData?.data?.statisciksdesc}
                            </p>
                            <Link
                                href={`/${language}/${ROUTES.products[language]}`}
                            >
                                <button className="gap-2.5  text-nowrap leading-[20px] self-start p-2.5 mt-1.5 px-[20px] py-[10px]  text-base font-medium text-[#0B458F] border border-[#0B458F] border-solid rounded-[35px] max-sm:w-full">
                                    {translationsData?.data?.Hamısına_bax}
                                </button>
                            </Link>
                        </div>
                        <div className="w-full flex justify-center">
                            <div className="grid lg:grid-cols-3 grid-cols-1 w-full self-center  justify-items-center justify-self-center gap-6 mt-6 mx-auto">
                                {statisticsData.projects.map(
                                    (item: Project) => (
                                        <ProjectCard
                                            key={item.id}
                                            data={item}
                                        />
                                    )
                                )}
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>{' '}
            <section className=" lg:mt-[100px] md:mt-[80px] mt-[40px]">
                <div className="w-full flex  lg:justify-center md:justify-center justify-start lg:flex-row md:flex-row flex-wrap flex-col lg:px-[100px] md:px-[60px] px-[30px]  ">
                    <h2 className="text-5xl text-black text-wrap  max-md:text-4xl ">
                        {translationsData?.data?.Populyar_Məhsullar}
                    </h2>
                    <div className=" lg:absolute md:absolute  static lg:right-[100px] md:right-[60px] right-[30px] flex  h-[48px] items-end max-sm:hidden ">
                        <Link
                            href={`/${language}/${ROUTES.products[language]}?search=popular`}
                        >
                            <button className="flex gap-2.5 justify-center items-center self-end text-base font-medium rounded-[35px] text-blue-600 text-opacity-90">
                                <p className="self-stretch my-auto text-nowrap ">
                                    {translationsData?.data?.Hamısına_bax}
                                </p>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/b0bcb315d4534a4ad48392d7c96985a79c21ac585f3284b9a6268cac196f65a9?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                                />
                            </button>
                        </Link>
                    </div>
                </div>
                <ProductSwiper data={PopulyarProduct} />
                <div className="w-full  justify-center mt-7 max-sm:flex hidden ">
                    <Link href={`/${language}/${ROUTES.products[language]}`}>
                        <button className="flex gap-2.5 justify-center items-center self-end text-base font-medium rounded-[35px] text-blue-600 text-opacity-90">
                            <p className="self-stretch my-auto text-nowrap ">
                                {translationsData?.data?.Hamısına_bax}
                            </p>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/b0bcb315d4534a4ad48392d7c96985a79c21ac585f3284b9a6268cac196f65a9?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                            />
                        </button>
                    </Link>
                </div>
            </section>
            <section className=" lg:mt-[100px] md:mt-[80px] mt-[40px]">
                <div className="w-full flex  lg:justify-center md:justify-center justify-start lg:flex-row md:flex-row flex-col  lg:px-[100px] md:px-[60px] px-[30px] ">
                    <h2 className="text-5xl text-black text-wrap  max-md:text-4xl ">
                        {translationsData?.data?.Endirimli_məhsullar}
                    </h2>
                    <div className=" lg:absolute md:absolute  static lg:right-[100px] md:right-[60px] right-[30px] flex  h-[48px] items-end max-sm:hidden ">
                        <Link
                            href={`/${language}/${ROUTES.products[language]}?search=discount`}
                        >
                            <button className="flex gap-2.5 justify-center items-center self-end text-base font-medium rounded-[35px] text-blue-600 text-opacity-90">
                                <p className="self-stretch my-auto text-nowrap ">
                                    {translationsData?.data?.Hamısına_bax}
                                </p>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/b0bcb315d4534a4ad48392d7c96985a79c21ac585f3284b9a6268cac196f65a9?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                                />
                            </button>
                        </Link>
                    </div>
                </div>
                <ProductSwiper data={DiscountedProducts} />
                <div className="w-full  justify-center mt-7 max-sm:flex hidden ">
                    <Link href={`/${language}/${ROUTES.products[language]}`}>
                        <button className="flex gap-2.5 justify-center items-center self-end text-base font-medium rounded-[35px] text-blue-600 text-opacity-90">
                            <p className="self-stretch my-auto text-nowrap ">
                                {translationsData?.data?.Hamısına_bax}
                            </p>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/b0bcb315d4534a4ad48392d7c96985a79c21ac585f3284b9a6268cac196f65a9?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                            />
                        </button>
                    </Link>
                </div>
            </section>{' '}
            <section className="w-full lg:px-[100px] md:px-[60px] px-[30px]">
                <div className="w-full flex gap-4  lg:mt-[100px] md:mt-[80px] mt-[40px] lg:justify-center md:justify-center justify-between lg:flex-row md:flex-row flex-col  ">
                    <h2 className="text-5xl text-black text-wrap  max-md:text-4xl">
                        {translationsData?.data?.Kateqoriyalar}
                    </h2>
                    <div className=" lg:absolute md:absolute  static lg:right-[100px] md:right-[60px] right-[30px] flex  h-[48px] items-end max-sm:hidden ">
                        <Link
                            href={`/${language}/${ROUTES.products[language]}`}
                        >
                            {' '}
                            <button className="flex gap-2.5 justify-center items-center self-end text-base font-medium rounded-[35px] text-blue-600 text-opacity-90">
                                <p className="self-stretch my-auto text-nowrap ">
                                    {translationsData?.data?.Hamısına_bax}
                                </p>
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/b0bcb315d4534a4ad48392d7c96985a79c21ac585f3284b9a6268cac196f65a9?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                                />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
            <HomeCategory data={productCategoriesData.data} />
            <section className="flex flex-col rounded-none lg:px-[100px] md:px-[60px] px-[30px] lg:mt-[120px] mt-[60px]">
                <div className="self-center text-5xl text-black text-wrap  max-md:text-4xl mr-2">
                    {translationsData?.data?.Müştərilərimiz}
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 lg:gap-6 gap-3 mt-8 w-full max-md:max-w-full">
                    {customersData.data.map((item: Customer, index: number) => (
                        <div
                            className="  flex flex-1 gap-3.5  rounded-2xl bg-white bg-opacity-70 shadow-[0px_0px_4px_rgba(0,0,0,0.05)]"
                            key={index}
                        >
                            <div className="flex flex-col justify-center items-start px-5 py-4 bg-white rounded-2xl border-r border-neutral-100 border-opacity-90">
                                <img
                                    loading="lazy"
                                    src={item.icon}
                                    className="object-contain w-12 aspect-square"
                                />
                            </div>
                            <div className="flex flex-col my-auto justify-normal gap-2">
                                <div className="self-start text-sm font-bold text-black">
                                    {item.name}
                                </div>
                                <div
                                    className=" text-sm text-purple-950 text-opacity-80"
                                    dangerouslySetInnerHTML={{
                                        __html: item.description,
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}{' '}
                </div>
                <div
                    className="lg:mt-[120px] mt-[60px] rounded-lg max-sm:h-[204px]"
                    style={{
                        backgroundImage: `url("${bottomBannerData.data.image}")`,
                        backgroundSize: 'cover', // This ensures the image covers the area
                        backgroundPosition: 'center', // This centers the image within the div
                    }}
                >
                    <div className="flex overflow-hidden flex-col items-start px-20 py-20 font-medium rounded-2xl bg-black bg-opacity-30 max-md:px-5 max-sm:h-[204px] max-sm:p-0 max-sm:justify-center max-sm:px-[28px] ">
                        <h4 className="text-5xl text-white max-md:text-4xl max-sm:text-[20px]">
                            {bottomBannerData.data.title}
                        </h4>
                        <div
                            className="mt-1 text-lg text-gray-200 w-[604px] max-md:max-w-full max-sm:text-[14px]"
                            dangerouslySetInnerHTML={{
                                __html: bottomBannerData.data.description,
                            }}
                        ></div>
                        <Link
                            href={`/${language}/${ROUTES.products[language]}`}
                        >
                            <button className="gap-2.5  self-stretch py-2.5 px-[62px] leading-[20px] mt-5 text-base text-black w-fit whitespace-nowrap bg-white rounded-[35px]">
                                {bottomBannerData.data.button_text}
                            </button>
                        </Link>
                    </div>
                </div>
            </section>{' '}
            <section className="ProductSwippenSection flex flex-col rounded-none  lg:mt-[120px] mt-[60px] w-[100%] overflow-hidden">
                <div className="self-center text-5xl text-black text-wrap  max-md:text-4xl mr-2">
                    {translationsData.data.Partnyorlar}
                </div>
                <PartnersSlider data={partnersData.data} />
            </section>{' '}
        </>
    );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = parse(context.req.headers.cookie || '');
    const lang = cookies['accept-language'] || 'az';
    console.log(lang);

    try {
        const topBannerData = await getTopBanner(lang);
        const statisticsData = await getStatistics(lang);
        const productsData = await getProducts(lang);
        const customersData = await getCustomers(lang);
        const bottomBannerData = await getBottomBanner(lang);
        const partnersData = await getPartners(lang);
        const productCategoriesData = await getProductCategories(lang);
        const translationsData = await getTranslations(lang);
        const Meta = await getTopMeta(lang);
        const Logo = await getTopImages(lang);
        const DiscountedProducts = await GetDiscountedProduct(lang);
        const PopulyarProduct = await GetPopulyarProduct(lang);
        // const [
        //     statisticsData,
        //     productsData,
        //     customersData,
        //     bottomBannerData,
        //     partnersData,
        //     productCategoriesData,
        //     translationsData,
        //     Meta,
        //     Logo,
        //     DiscountedProducts,
        //     PopulyarProduct,
        // ] = await Promise.all([
        //     getStatistics(lang),
        //     getProducts(lang),
        //     getCustomers(lang),
        //     getBottomBanner(lang),
        //     getPartners(lang),
        //     getProductCategories(lang),
        //     getTranslations(lang),
        //     getTopMeta(lang),
        //     getTopImages(lang),
        //     GetDiscountedProduct(lang),
        //     GetPopulyarProduct(lang),
        // ]);

        return {
            props: {
                topBannerData,
                statisticsData,
                productsData,
                customersData,
                bottomBannerData,
                partnersData,
                productCategoriesData,
                translationsData,
                Meta,
                Logo,
                DiscountedProducts,
                PopulyarProduct,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                topBannerData: null,
                statisticsData: [],
                productsData: [],
                customersData: [],
                bottomBannerData: null,
                partnersData: null,
                productCategoriesData: [],
                translationsData: null,
                Meta: [],
                Logo: {},
            },
        };
    }
}
