import React from 'react';
interface Subcategory {
    id: number;
    description: string;
    name: string;
    category_id: number;
    slug: {
        az: string;
        en: string;
        ru: string;
    };
}
type DataItem = {
    id: number;
    title: string;
    description: string;
    image: string; // URL
    subcategories: Subcategory[];
    slug: {
        az: string;
        en: string;
        ru: string;
    };
};
export default function CatecoryArticle({
    productCategoriesData,
    selectedCategory,
    productSubCategoriesData,
    selectedSubCategory,
}: {
    productCategoriesData?: DataItem[];
    selectedCategory: number;
    productSubCategoriesData?: Subcategory[];
    selectedSubCategory: number;
}) {
    console.log('CatecoryArticle', productSubCategoriesData);
    const currentCategory = productCategoriesData?.find(
        (category) => category.id === selectedCategory
    );
    const currentSubCategory = productSubCategoriesData?.find(
        (subCategory) => subCategory.id === selectedSubCategory
    );
    console.log('currentSubCategory', currentSubCategory);
    if (currentSubCategory) {
        return (
            <div className="flex    overflow-hidden z-10 flex-col justify-center items-start px-[100px] py-[100px] max-md:px-5 max-md:py-24 w-full h-full max-sm:p-0 max-sm:justify-end max-sm:px-[33px] max-sm:py-[40px]">
                <div className="flex flex-col max-w-full max-md:justify-center max-md:items-center  w-[80%] max-sm:w-full">
                    <h1 className="self-start lg:text-5xl md:text-3xl text-2xl font-medium text-black  max-md:max-w-full max-sm:text-[20px] max-sm:font-medium max-sm:leading-8 ">
                        {currentSubCategory.name}
                    </h1>
                    <div
                        className="mt-3.5 lg:text-lg   md:text-lg text-[12px] text-black max-md:max-w-full max-sm:text-[16px]"
                        // dangerouslySetInnerHTML={{
                        //     __html: topBannerData?.data?.description,
                        // }}
                    >
                        {currentSubCategory.description}
                    </div>
                </div>
            </div>
        );
    }
    if (currentCategory) {
        return (
            <div className="flex    overflow-hidden z-10 flex-col justify-center items-start px-[100px] py-[100px] max-md:px-5 max-md:py-24 w-full h-full max-sm:p-0 max-sm:justify-end max-sm:px-[33px] max-sm:py-[40px]">
                <div className="flex flex-col max-w-full w-[652px]">
                    <h1 className="self-start lg:text-5xl md:text-3xl text-2xl font-medium text-black  max-md:max-w-full max-sm:text-[20px] max-sm:font-medium max-sm:leading-8 ">
                        {currentCategory.title}
                    </h1>
                    <div
                        className="mt-3.5 lg:text-lg   md:text-lg text-[12px] text-black max-md:max-w-full max-sm:text-[16px]"
                        // dangerouslySetInnerHTML={{
                        //     __html: topBannerData?.data?.description,
                        // }}
                    >
                        {currentCategory.description}
                    </div>
                </div>
            </div>
        );
    }
}
