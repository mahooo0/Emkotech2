import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import Link from 'next/link';

interface Partner {
    url: string;
    icon: string;
    name: string;
}

const PartnersSlider = ({ data }: { data: Partner[] }) => {
    return (
        <Swiper
            className="!py-[10px] !mt-[32px]"
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={'auto'}
            freeMode={true}
            autoplay={{
                delay: 0, // Continuous scrolling
            }}
            speed={2500} // Set a longer speed for smoother transitions
            loop={true}
        >
            {/* Duplicate slides for a seamless loop effect */}
            {data.map((item: Partner, index: number) => (
                <SwiperSlide key={index} className="!w-fit">
                    <Link
                        className="flex flex-col rounded-none max-w-[184px]"
                        href={item.url}
                    >
                        <div className="flex flex-col pb-2.5 w-full rounded-2xl bg-white bg-opacity-60 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]">
                            <div className="flex flex-col justify-center px-9 py-6 w-full rounded-2xl border-b bg-white bg-opacity-80 border-neutral-100">
                                <img
                                    loading="lazy"
                                    className="object-contain aspect-[1.86] w-[102px]"
                                    src={item.icon}
                                    alt={item.name}
                                    title={item.name}
                                />
                            </div>
                            <p className="self-center mt-2.5 text-sm text-center text-black text-opacity-80">
                                {item.name}
                            </p>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default PartnersSlider;
