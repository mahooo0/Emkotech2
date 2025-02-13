import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import * as React from 'react';
import { useLanguage } from '../Hoc/LanguageContext';
import { getTranslations } from '@/services/Request';
import { ROUTES } from '@/services/CONSTANTS';

export interface NewsItem {
    slug: { az: string; en: string; ru: string };
    id: string;
    title: string;
    image: string;
    short_description: string;
}

export function Aside({ data }: { data: NewsItem[] }) {
    const [search, setSearch] = React.useState('');
    const filteredData = data?.filter((item: NewsItem) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );
    const { language } = useLanguage();
    const { data: translationsData } = useQuery({
        queryKey: ['translations', language],
        queryFn: () => getTranslations(language),
    });
    return (
        <section className="lg:w-full lg:min-w-[320px] md:min-w-[320px] min-w-0 w-full">
            <div className="flex  gap-10 justify-between items-center px-6 py-2.5 w-full text-sm font-medium leading-none rounded-2xl border border-gray-200 border-solid bg-neutral-100 text-stone-500">
                <input
                    type="text"
                    placeholder={`${translationsData?.data?.Axtar}`}
                    className="bg-transparent border-none outline-none flex-1 text-stone-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2e19dc35dd213e656474aa0288d1d6968a56aec699761271179437a1d7f07a00?placeholderIfAbsent=true&apiKey=2d5d82cf417847beb8cd2fbbc5e3c099"
                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
            </div>{' '}
            <div className="rounded-[18px] overflow-hidden mt-[14px] bg-white">
                {filteredData.length > 0 && search ? (
                    filteredData.map((item: NewsItem, i: number) => (
                        <Link
                            href={`/${language}/${ROUTES.news[language]}/${
                                item.slug[(language as 'az', 'en', 'ru')]
                            }?`}
                            key={i}
                        >
                            <p
                                key={i}
                                className="h-[74px] px-[30px] flex items-center hover:bg-neutral-100 "
                            >
                                {item.title}
                            </p>
                        </Link>
                    ))
                ) : search ? (
                    <p className="h-[74px] px-[30px] flex items-center ">
                        {translationsData?.data?.Tapılmadı}
                    </p>
                ) : (
                    <></>
                )}
            </div>
            <div className="flex flex-col px-7 pt-4 pb-14 mt-6  text-base tracking-normal bg-white rounded-lg shadow-[0px_0px_8px_rgba(0,0,0,0.084)]  w-full h-fit">
                <div className="flex gap-5 items-start text-neutral-900">
                    <div className=" text-lg tracking-normal leading-[58px] w-full text-center">
                        {translationsData?.data?.Populyar_Məhsullar}
                    </div>
                </div>
                {data?.map((item: NewsItem, i: number) => (
                    <Link
                        href={`/${language}/${ROUTES.news[language]}/${item.slug}?id=${item.id}`}
                        key={i}
                    >
                        <div className="flex gap-5  mt-3" key={i}>
                            <img
                                loading="lazy"
                                src={item.image}
                                className="object-cover shrink-0 rounded-none aspect-[1.04] w-[83px] max-h-[80px]"
                            />
                            <div className="flex flex-col my-auto">
                                <div className="self-start  leading-4 lg:text-[16px] md:text-[16px] text-[13px] text-neutral-400">
                                    {item.title}
                                </div>
                                <div className="mt-4 lg:leading-6 leading-[17px] text-neutral-900 overflow-hidden line-clamp-2 ">
                                    {item.short_description}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
