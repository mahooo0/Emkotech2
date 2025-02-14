import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { NewsData } from '../NewsCard';
import { Swiper as SwiperType } from 'swiper';
import { useRouter } from 'next/router';
import { ROUTES } from '@/services/CONSTANTS';
import Link from 'next/link';

export const NewsSwiper = ({ data }: { data: NewsData[] }) => {
    const swiperRef = useRef<SwiperType | null>(null);
    const router = useRouter();
    const { lang } = router.query;
    const language = lang ? lang?.toString() : 'az';
    return (
        <div>
            <Swiper
                className="!mt-[60px] lg:!mx-[90px] md:!mx-[60px] !mx-[30px] !px-[10px]"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={50}
                breakpoints={{
                    268: {
                        slidesPerView: 1,
                    },
                    568: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1240: {
                        slidesPerView: 4,
                    },
                }}
            >
                {data?.map((item: NewsData, i: number) => (
                    <SwiperSlide
                        className="!py-[10px] !flex !justify-center"
                        key={i}
                    >
                        <Link
                            onClick={() => {
                                localStorage.setItem(
                                    'slug',
                                    JSON.stringify(item.slug)
                                );
                            }}
                            href={`/${language}/${ROUTES.news[language]}/${
                                item.slug[(language as 'az') || 'en' || 'ru']
                            }?id=${item.id}`}
                        >
                            {' '}
                            <div
                                key={i}
                                className="flex cursor-pointer overflow-hidden flex-col justify-center bg-white rounded-2xl "
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
                                    </div>
                                    <div className="flex flex-col mt-8 w-full text-xs tracking-normal leading-snug">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/fc4fa5e45336e80ee82c9e821d94df4e3e27afda654d7ada6355603f32e5f7b5?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                                            className="object-contain w-full aspect-[250]"
                                        />
                                        <div className="flex gap-10 justify-between items-center mt-4 w-full">
                                            <div className="gap-2 self-stretch my-auto">
                                                {item.date}
                                            </div>
                                            <div className="flex gap-2 justify-center items-center self-stretch my-auto whitespace-nowrap">
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/773a2b2554008121fab7182cf9957a2babbd8eb738963406bc2d4d2955deddfe?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                                                    className="object-contain shrink-0 self-stretch my-auto w-3.5 aspect-square"
                                                />
                                                <div className="self-stretch my-auto">
                                                    {item.views}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex gap-4 mt-4 justify-start lg:!px-[100px] md:!px-[60px] !px-[30px] ">
                <button
                    style={{ boxShadow: '0px 0px 11px 0px #D2D6411F' }}
                    className="bg-white  w-[42px] h-[42px] rounded-full flex justify-center items-center stroke-[#BDBDC1] hover:stroke-[#D2D641]"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M20.25 12H3.75"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M10.5 5.25L3.75 12L10.5 18.75"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
                <button
                    style={{ boxShadow: '0px 0px 11px 0px #D2D6411F' }}
                    className=" text-white w-[42px] h-[42px] rounded-full flex justify-center items-center stroke-[#BDBDC1] hover:stroke-[#D2D641]"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3.75 12H20.25"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M13.5 5.25L20.25 12L13.5 18.75"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};
