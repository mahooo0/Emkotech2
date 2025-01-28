import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import { ROUTES } from '@/services/CONSTANTS';
import { useRouter } from 'next/router';
type Subcategory = {
    id: number;
    name: string;
    image: string;
    category_id: number;
};

export type Category = {
    id: number;
    title: string;
    description: string;
    image: string;
    subcategories: Subcategory[];
    black_icon?: string;
    white_icon?: string;
};
export default function HomeCategory({ data }: { data: Category[] }) {
    const [currentCAtegory, setCurrentCategory] = useState(0);
    const router = useRouter();

    const { lang } = router.query;
    useEffect(() => {
        if (data.length) {
            setCurrentCategory(data[0].id);
        }
    }, []);
    const language = lang?.toString() || 'az';
    return (
        <div className="w-full mt-[34px]">
            <Swiper
                slidesPerView={'auto'}
                grabCursor
                className="bg-[#2677E2] !w-full rounded-[58px] !p-1 !drop-shadow-lg"
            >
                {data.map((item) => (
                    <SwiperSlide className="!w-fit" key={item.id}>
                        <button
                            style={{
                                backgroundColor:
                                    currentCAtegory === item.id
                                        ? '#fff'
                                        : 'transparent',
                                color:
                                    currentCAtegory === item.id
                                        ? '#000000'
                                        : '#FFFFFF',
                                fill:
                                    currentCAtegory === item.id
                                        ? '#000000'
                                        : '#FFFFFF',
                            }}
                            className=" flex flex-row gap-3 py-[11px] px-[28px] rounded-[57px]  duration-300  "
                            onClick={() => setCurrentCategory(item.id)}
                        >
                            {item.black_icon && item.black_icon && (
                                <img
                                    src={
                                        currentCAtegory === item.id
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  flex-row gap-[24px] flex-wrap mt-[42px] ">
                {data
                    .find((item) => item.id === currentCAtegory)
                    ?.subcategories.map((item: Subcategory) => (
                        <Link
                            key={item.id}
                            href={`/${language}/${ROUTES.products[language]}?category=${currentCAtegory}&sub_category=${item.id}`}
                        >
                            <div
                                className="w-full flex flex-col items-center gap-4 justify-center h-[130px] bg-[#EEEEEE] rounded-[18px]"
                                key={item.id}
                            >
                                <img
                                    className="w-[75px] aspect-square"
                                    src={item.image}
                                    alt=""
                                />
                                <p>{item.name}</p>
                            </div>
                        </Link>
                    ))}
                {/* {Array.from({ length: 10 }).map((_, index) => (
                    <div className="w-full flex flex-col items-center gap-4 justify-center h-[130px] bg-[#EEEEEE] rounded-[18px]">
                        <img
                            className="w-[75px] aspect-square"
                            src="https://s3-alpha-sig.figma.com/img/ce5c/a16b/625d749eb78e3d2194c0264eecf156cb?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gchaUTuFCDpU2TQ8yQ~Qps1HrlBpNIDRGeT5WnaJpdLZs4Nwyx4z4bhEhEHLLC3m9TX4zconXrjnVpnk6Wre8zRi0uxM3mIfGmRBmF1Oo8pbrqZPORqzO9hpI17EaxoouvnoZs9uBLhF-E8RGue-pvSrSjKDkLposbODO-hh7thJq8d48wp64UO8IeX7cXr~fYk9Odd6JU7by5s-YnqKBiPsrI-Z-DND~AtxSBzCbyXbDW~A3KtogLf9i2Guuvv~yiww~jqbPBzjlD0UmR29CQSpxKwkO0wKzNuLc5mWnbIUbZ2KGSkaqu--8-tNguu8KOBGRnGT1kz47WtZEQedCw__"
                            alt=""
                        />
                        <p>Turbo-HD Kameralar</p>
                    </div>
                ))} */}
            </div>
        </div>
    );
}
