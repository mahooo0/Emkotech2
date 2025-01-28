import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import ProjectCard from '../ProjectCard';
import { Swiper as SwiperType } from 'swiper';
import { Project } from '@/pages/projects/[id]';
export const ProjectSwiper = ({ data }: { data: Project[] }) => {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div>
            <Swiper
                className="!mt-[60px] lg:!mx-[90px] md:!mx-[60px] !mx-[30px] !px-[10px]"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={24}
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
                }}
            >
                {data?.map((item, i) => (
                    <SwiperSlide className="!py-[10px]" key={i}>
                        <ProjectCard key={i} data={item} />
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
