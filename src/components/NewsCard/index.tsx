import React from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/services/CONSTANTS';
import Link from 'next/link';

export interface NewsData {
    id: string;
    image: string;
    title: string;
    short_description: string;
    date: string;
    views: number;
    slug: { az: string; en: string; ru: string };
}

export default function NewsCard({ data, i }: { data: NewsData; i: number }) {
    const router = useRouter();
    const { lang } = router.query;
    const language = lang ? lang?.toString() : 'az';
    return (
        <Link
            onClick={() => {
                localStorage.setItem('slug', JSON.stringify(data.slug));
            }}
            href={`/${language}/${ROUTES.news[language]}/${
                data.slug[language as 'az' | 'en' | 'ru']
            }/?id=${data.id}`}
        >
            {' '}
            <div
                key={i}
                className="flex overflow-hidden flex-col justify-center bg-white rounded-2xl max-w-[288px]"
            >
                <div className="flex overflow-hidden flex-col w-full">
                    <img
                        loading="lazy"
                        className="object-cover w-full aspect-[1.38]"
                        src={data.image}
                    />
                </div>
                <div className="flex flex-col justify-center p-6 w-full bg-white text-zinc-800">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-col w-full">
                            <div className="text-xl font-medium leading-snug">
                                {data.title}
                            </div>
                            <div
                                className="mt-2 text-sm tracking-wide leading-5"
                                dangerouslySetInnerHTML={{
                                    __html: data.short_description,
                                }}
                            ></div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-8 w-full text-xs tracking-normal leading-snug">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/fc4fa5e45336e80ee82c9e821d94df4e3e27afda654d7ada6355603f32e5f7b5?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                            className="object-contain w-full aspect-[250]"
                        />
                        <div className="flex gap-10 justify-between items-center mt-4 w-full">
                            <div className="gap-2 self-stretch my-auto">
                                {data.date}
                            </div>
                            <div className="flex gap-2 justify-center items-center self-stretch my-auto whitespace-nowrap">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/773a2b2554008121fab7182cf9957a2babbd8eb738963406bc2d4d2955deddfe?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                                    className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                                />
                                <div className="self-stretch my-auto">
                                    {data.views}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
