import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/components/Hoc/LanguageContext';
import {
    getFooter,
    getPages,
    getTopImages,
    getTranslations,
} from '@/services/Request';
import Link from 'next/link';
import { ROUTES } from '@/services/CONSTANTS';

interface SocialMediaItem {
    url: string;
    icon: string;
    id: string;
}
interface Document {
    id: string;
    title: string;
    file_url: string;
}

export function Footer() {
    const { language } = useLanguage();
    const { data } = useQuery({
        queryKey: ['footer', language],
        queryFn: () => getFooter(language),
    });
    const { data: translationsData } = useQuery({
        queryKey: ['translations', language],
        queryFn: () => getTranslations(language),
    });
    const { data: pagesData } = useQuery({
        queryKey: ['pages', language],
        queryFn: () => getPages(language),
    });
    const { data: Logo } = useQuery({
        queryKey: ['Logo', language],
        queryFn: () => getTopImages(language),
    });
    // console.log(data);
    return (
        <footer className="flex flex-col text-sm text-white lg:mt-[120px] mt-[60px]">
            <div className="flex flex-col items-start pt-12 pb-4 w-full bg-slate-900 max-md:max-w-full">
                <div className="flex flex-col items-start lg:px-[100px] md:px-[60px] px-[30px] max-w-full w-full">
                    <img
                        loading="lazy"
                        src={Logo?.footer_logo}
                        className="object-contain max-w-full aspect-[2.52] w-[141px]"
                    />
                    <div className="flex lg:flex-row md:flex-row flex-col gap-10 justify-between self-stretch mt-9 leading-none max-md:max-w-full w-full lg:pr-[25%] pr-0">
                        <div className="grow shrink self-start text-base font-medium leading-7 max-w-[483px] text-white opacity-50 w-[471px] max-md:max-w-full">
                            {translationsData?.data?.footerDescription}
                        </div>
                        <div className="flex flex-col items-start text-white opacity-50 gap-4">
                            {/* {data.data} */}
                            {pagesData?.data?.map((item: Document) => (
                                <Link key={item.id} href={item.file_url}>
                                    <div>{item.title}</div>
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col items-start text-white opacity-50">
                            <Link href={`/${language}`}>
                                <div className="cursor-pointer">
                                    {translationsData?.data?.Əsas_səhifə}
                                </div>
                            </Link>
                            <Link
                                href={`/${language}/${ROUTES.about[language]}`}
                            >
                                {' '}
                                <div className="self-stretch mt-4 cursor-pointer ">
                                    {translationsData?.data?.Haqqımızda}
                                </div>
                            </Link>
                            <Link
                                href={`/${language}/${ROUTES.products[language]}`}
                            >
                                <div className="self-stretch mt-4 cursor-pointer">
                                    {translationsData?.data?.Məhsullar}
                                </div>{' '}
                            </Link>
                            <Link
                                href={`/${language}/${ROUTES.project[language]}`}
                            >
                                {' '}
                                <div className="self-stretch mt-4 cursor-pointer">
                                    {translationsData?.data?.Layihələr}
                                </div>
                            </Link>
                            <Link
                                href={`/${language}/${ROUTES.news[language]}`}
                            >
                                <div className="mt-4 cursor-pointer">
                                    {translationsData?.data?.Xəbərlər}
                                </div>
                            </Link>
                            <Link
                                href={`/${language}/${ROUTES.contact[language]}`}
                            >
                                <div className="mt-4 cursor-pointer">
                                    {translationsData?.data?.Əlaqə}
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-6 opacity-50">
                        {translationsData?.data?.Bizi_sosial_media_da_izləyin}
                    </div>
                    <div className="flex gap-4 flex-row">
                        {data?.data?.map((item: SocialMediaItem) => (
                            <Link key={item.id} href={item.url}>
                                <img
                                    loading="lazy"
                                    src={item.icon}
                                    className="object-contain mt-6 w-[16px] h-[16px] "
                                />
                            </Link>
                        ))}
                    </div>
                    {/* <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/e1a8a8d05501b4fbe08402b4f48dfd8e58fe0419287cbb2e38b8f4bb399e30bc?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                        className="object-contain mt-6 w-24 aspect-[5.99]"
                    /> */}
                </div>
                <div className="self-stretch mt-10 w-full bg-white border border-white border-solid opacity-10 min-h-[1px] max-md:max-w-full" />
                <div className="mt-4 lg:ml-[100px] md:ml-[60px] ml-[30px] leading-none  opacity-50">
                    Bütün hüquqlar qorunur @ 166tech
                </div>
            </div>
        </footer>
    );
}
