import React, { useState } from 'react';
import { useLanguage } from '../Hoc/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { getTranslations } from '@/services/Request';
import { Product, SlideImage } from '@/pages/products/[id]';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import FancyboxExample from '../Fancybox';
interface TranslationsData {
    data: {
        Məhsullar: string;
        PopulyarMəhsullar: string;
        HamısınaBax: string;
        SifarisEt: string;
        Name: string;
        Soyad: string;
        Əlaqə_nömrəsi: string;
        Qeyd: string;
    };
} // interface SlideImage {
//     id: string;
//     image: string;
// }

const EssentialCamera: React.FC<{
    data: Product | undefined;
    anction: () => void;
    translationsData: TranslationsData | null;
}> = ({ data, anction, translationsData }) => {
    const [selectedImage, setSelectedImage] = useState<number>(0);
    const [isopen, setisopen] = useState<boolean>(false);
    const { language } = useLanguage();
    useQuery({
        queryKey: ['translations', language],
        queryFn: () => getTranslations(language),
    });
    console.log(data);

    const handleImageClick = (index: number) => {
        setSelectedImage(index);
    };

    const images = data?.slide_images?.map((item: SlideImage) => item?.image);
    return (
        <div className="rounded-none mt-6">
            <div className="flex gap-5 max-md:flex-col">
                <section className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                    <div
                        className="flex overflow-hidden relative gap-4 flex-col grow  max-h-[700px]    justify-center pl-[50px] items-start  rounded-none pointer-events-auto max-md:px-5 max-md:py-10 max-md:mt-6 max-md:max-w-full "
                        // style={{
                        //     backgroundImage: `url('${data?.slide_images[selectedImage].image}')`,
                        //     backgroundRepeat: 'no-repeat',
                        //     backgroundSize: 'cover',
                        //     backgroundPosition: 'center',
                        // }}
                    >
                        <img
                            src={data?.slide_images[selectedImage]?.image}
                            alt=""
                            onClick={() => setisopen(true)}
                            className="w-full  md:h-full lg:h-[700px] h-[300px] object-cover rounded-[18px]  top-0 right-0  "
                        />
                        <div
                            className="max-h-[400px] pl-4 lg:absolute md:absolute  w-fit z-[1]  pr-2 flex flex-row lg:flex-col md:flex-col gap-5 overflow-x-scroll lg:overflow-y-scroll md:overflow-y-scroll 
  [&::-webkit-scrollbar]:h-[3px] 
  lg:[&::-webkit-scrollbar]:w-[3px] 
  [&::-webkit-scrollbar-thumb]:bg-gray-300 
  [&::-webkit-scrollbar-track]:bg-transparent"
                        >
                            {' '}
                            {data?.slide_images?.map(
                                (item: SlideImage, index: number) => (
                                    <img
                                        key={index}
                                        src={item.image}
                                        alt={`${item.id}`}
                                        className={`object-cover rounded-2xl aspect-square w-[84px] cursor-pointer ${
                                            index > 0 ? '' : ''
                                        } ${
                                            selectedImage === index
                                                ? 'border-2 border-blue-600'
                                                : ''
                                        }`}
                                        onClick={() => handleImageClick(index)}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </section>
                <section className="flex flex-col  w-6/12  max-md:w-full lg:pr-[100px]  lg:px-0 pr-[20px] px-[20px]">
                    <div className="flex flex-col items-start  w-full max-md:max-w-full">
                        <h1 className="text-4xl text-black">{data?.title}</h1>
                        <h2 className="mt-2.5 text-xl text-black">
                            {data?.category_name}
                        </h2>
                        <p className="mt-2 text-base text-neutral-400">
                            {data?.subcategory_name}
                        </p>
                        {data?.discount ? (
                            <span className="gap-2.5 self-stretch py-1 pr-2 pl-2 mt-5 text-xs text-white bg-[#EA9B12] min-h-[22px] rounded-[41px] w-fit">
                                sale{' '}
                                {Math.floor(
                                    ((data.price - data.discounted_price) /
                                        data.price) *
                                        100
                                )}
                                %
                            </span>
                        ) : (
                            <></>
                        )}
                        <div className="flex gap-1.5 mt-1.5 whitespace-nowrap items-end justify-end">
                            <span className="grow text-3xl text-blue-600">
                                {data?.price}₼
                            </span>
                            <span className="  text-base text-neutral-400 line-through">
                                {data?.discounted_price === data?.price
                                    ? ''
                                    : `${data?.discounted_price}₼`}
                            </span>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: data?.description || '',
                            }}
                            className="self-stretch mt-9 text-base text-neutral-800 max-md:mr-1 max-md:max-w-full"
                        ></div>
                    </div>
                    <button
                        onClick={anction}
                        className="gap-2.5 self-stretch px-2.5 py-4 mt-16 text-lg font-medium text-white whitespace-nowrap rounded-2xl bg-blue-600 bg-opacity-90 min-h-[54px] max-md:mt-10 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
                    >
                        {translationsData?.data?.SifarisEt}
                    </button>
                </section>

                <FancyboxExample
                    setisopen={setisopen}
                    images={images}
                    isOpen={isopen}
                    currentImageIndex={selectedImage}
                />
            </div>
        </div>
    );
};

export default EssentialCamera;
