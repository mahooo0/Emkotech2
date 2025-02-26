import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import { ROUTES } from '@/services/CONSTANTS';
import { useRouter } from 'next/router';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';

type Subcategory = {
    id: number;
    name: string;
    image: string;
    category_id: number;
    slug: { az: string; en: string; ru: string };
    image_title: string | null;
    alt: string | null;
};

export type Category = {
    id: number;
    title: string;
    description: string;
    image: string;
    subcategories: Subcategory[];
    black_icon?: string;
    white_icon?: string;
    slug: { az: string; en: string; ru: string };
};

export default function HomeCategory({ data }: { data: Category[] }) {
    SwiperCore.use([Navigation]);

    const [currentCategory, setCurrentCategory] = useState(0);
    const swiperRef = useRef<SwiperCore | null>(null);
    const router = useRouter();
    console.log('CAtegorySerction,data', data);

    const { lang = 'az' } = router.query;
    useEffect(() => {
        if (data.length) {
            setCurrentCategory(data[0].id);
        }
    }, []);

    const language = lang?.toString() || 'az';

    const handleNext = () => {
        if (swiperRef.current) swiperRef.current.slideNext();
    };

    const handlePrev = () => {
        if (swiperRef.current) swiperRef.current.slidePrev();
    };

    return (
        <div className="w-full mt-[34px] lg:px-[100px] md:px-[60px] px-[30px] relative">
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={'auto'}
                grabCursor
                className="bg-[#2677E2] !w-full rounded-[58px] !p-1 !drop-shadow-lg"
            >
                {data.map((item) => (
                    <SwiperSlide className="!w-fit" key={item.id}>
                        <button
                            style={{
                                backgroundColor:
                                    currentCategory === item.id
                                        ? '#fff'
                                        : 'transparent',
                                color:
                                    currentCategory === item.id
                                        ? '#000000'
                                        : '#FFFFFF',
                                fill:
                                    currentCategory === item.id
                                        ? '#000000'
                                        : '#FFFFFF',
                            }}
                            className="flex flex-row gap-3 py-[11px] px-[28px] rounded-[57px] duration-300"
                            onClick={() => setCurrentCategory(item.id)}
                        >
                            {item.black_icon && (
                                <img
                                    src={
                                        currentCategory === item.id
                                            ? item.black_icon
                                            : item.white_icon
                                    }
                                    alt=""
                                    className="w-[24px] h-[24px]"
                                />
                            )}
                            {item.title}
                        </button>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Prev Button */}
            <button
                className="absolute top-0 lg:left-10 left-1 max-sm:hidden transform "
                onClick={handlePrev}
            >
                <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g filter="url(#filter0_d_66_2445)">
                        <rect
                            width="48"
                            height="48"
                            rx="24"
                            x="4"
                            y="4"
                            fill="white"
                        />
                        <path
                            d="M36.25 28H19.75"
                            stroke="#BDBDC1"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M26.5 34.75L19.75 28L26.5 21.25"
                            stroke="#BDBDC1"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </svg>
            </button>

            {/* Next Button */}
            <button
                className="absolute top-0 lg:right-10 right-1 transform max-sm:hidden  rotate-180"
                onClick={handleNext}
            >
                <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g filter="url(#filter0_d_66_2445)">
                        <rect
                            width="48"
                            height="48"
                            rx="24"
                            x="4"
                            y="4"
                            fill="white"
                        />
                        <path
                            d="M36.25 28H19.75"
                            stroke="#BDBDC1"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M26.5 34.75L19.75 28L26.5 21.25"
                            stroke="#BDBDC1"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </g>
                </svg>
            </button>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-row gap-[24px] flex-wrap mt-[42px]">
                {data
                    .find((item) => item.id === currentCategory)
                    ?.subcategories.map((item: Subcategory) => (
                        <Link
                            key={item.id}
                            href={`/${language}/${ROUTES.products[language]}/${
                                data.find((item) => item.id === currentCategory)
                                    ?.slug[lang as 'az' | 'en' | 'ru']
                            }/${item.slug[lang as 'az' | 'en' | 'ru']}`}
                        >
                            <div className="w-full flex flex-col items-center gap-4 justify-center h-[130px] bg-[#EEEEEE] rounded-[18px]">
                                <img
                                    className="w-[75px] aspect-square"
                                    src={item.image}
                                    alt={item.alt ? item.alt : item.name}
                                    title={
                                        item.image_title
                                            ? item.image_title
                                            : item.name
                                    }
                                />
                                <p>{item.name}</p>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
