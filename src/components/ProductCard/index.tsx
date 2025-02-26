import { useRouter } from 'next/router';
import { Product } from '@/pages/products/[id]';
import Link from 'next/link';
import { ROUTES } from '@/services/CONSTANTS';

const ProductCard = ({ data }: { data: Product }) => {
    const router = useRouter();
    // const { language } = useLanguage();
    const { lang = 'az' } = router.query;
    const language = lang ? lang?.toString() : 'az';
    console.log('ProductCArd:', data);
    return (
        <div
            className="flex flex-col h-full justify-around grow pb-7 w-full hover:border-[#186FE0] border duration-300 bg-white rounded-2xl shadow-[0px_0px_11px_rgba(167,167,167,0.12)] max-md:mt-6 relative "
            key={data.id}
        >
            <Link
                onClick={() => {
                    localStorage.setItem('slug', JSON.stringify(data.slug));
                }}
                href={`/${language}/${
                    ROUTES.products[language as keyof typeof ROUTES.products]
                }/detail/${data?.slug[lang as 'az' | 'en' | 'ru']}`}
            >
                <img
                    loading="lazy"
                    src={data.image}
                    alt={data.alt ? data.alt : data.title}
                    title={data.image_title ? data.image_title : data.title}
                    className="object-cover cursor-pointer w-full rounded-2xl aspect-[1.05]"
                />
            </Link>

            <div className="flex flex-col h-full  justify-between px-3.5 mt-8 w-full">
                <div className="min-h-[56px]">
                    <p className="text-lg font-medium text-black line-clamp-2  ">
                        {data.title}
                        <br />
                    </p>
                </div>

                <div>
                    <div className="flex gap-1.5 items-center self-start  whitespace-nowrap">
                        <p className="self-stretch my-auto text-2xl font-semibold text-black">
                            {data.discounted_price}₼
                        </p>
                        <p className="self-stretch line-through my-auto text-lg font-medium text-stone-300">
                            {' '}
                            {data.discounted_price === data.price
                                ? ''
                                : `${data.price}₼`}
                        </p>
                    </div>
                    {/* <button
                            className="gap-2.5 self-center w-full flex p-2.5 mt-8 text-base text-white rounded-[18px] border border-solid bg-blue-600 bg-opacity-90 hover:bg-[#105ABA] duration-300 border-blue-600 border-opacity-90 max-md:mr-1 justify-center"
                            onClick={() => setIsOpen(true)}
                        >
                            {language === 'az'
                                ? 'İndi Al'
                                : language === 'en'
                                ? 'Buy Now'
                                : 'Купить сейчас'}
                        </button> */}
                    <Link
                        href={`/${language}/${
                            ROUTES.products[
                                language as keyof typeof ROUTES.products
                            ]
                        }/detail/${data?.slug[lang as 'az' | 'en' | 'ru']}`}
                    >
                        {' '}
                        <button
                            className="gap-2.5 w-full flex justify-center self-stretch p-2.5 mt-3.5 text-base text-blue-600 rounded-[18px] hover:bg-[#186FE0F0] hover:text-white duration-300 border border-indigo-500 border-solid max-md:mr-1"
                            onClick={() => {
                                localStorage.setItem(
                                    'slug',
                                    JSON.stringify(data.slug)
                                );
                            }}
                        >
                            {language === 'az'
                                ? 'Ətraflı bax'
                                : language === 'en'
                                ? 'View Details'
                                : 'Подробнее'}
                        </button>
                    </Link>
                </div>
            </div>
            {data.discount ? (
                <div className=" absolute  w-[113px] h-fit top-[16px] left-[-8px] z-[998] ">
                    <img src="/images/salebg.png" alt="" className="w-full" />
                    <div className="w-full h-full px-[30px] py-[8px] absolute top-0 left-0 flex flex-row gap-1 justify-center">
                        <img src="/svg/fire.svg" className="h-4" alt="" />

                        <p className="text-white text-[12px] font-bold">
                            {Math.floor(
                                ((data.price - data.discounted_price) /
                                    data.price) *
                                    100
                            )}
                            %
                        </p>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default ProductCard;
