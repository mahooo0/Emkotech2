import BreadcrumbNavigation from '@/components/BreadCamp';

import { useRouter } from 'next/router';
import PaginationComponent from '@/components/Pagination';
import ProductCard from '@/components/ProductCard';
import useDebounce from '@/hooks/useDebounce';
import {
    getProductCategories,
    getProductsByParams,
    getProductSubCategories,
    getTopMeta,
    getTranslations,
} from '@/services/Request';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Product } from './[id]';
import Image from 'next/image';
import { ROUTES } from '@/services/CONSTANTS';
import { MetaItem } from '@/types';
import Head from 'next/head';
import CatecoryArticle from '@/components/CategoryArticle';

// interface Product {
//     id: number;
//     title: string;
//     category_id: number;
//     discounted_price: number;
// }

// interface ProductCategory {
//     id: number;
//     title: string;
// }
// export interface ProductData {
//     id: string;
//     image: string;
//     title: string;
//     discounted_price: number;
//     price: number;
//     discount: boolean;
// }
export default function Products() {
    // const { language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const router = useRouter();

    const { lang } = router.query;
    const language = lang ? lang?.toString() : 'az';
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [selectedSort, setSelectedSort] = useState<string>('no');
    // console.log('selectedSort', selectedSort);
    const [selectedSubCategory, setSelectedSubCategory] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [sub, setsub] = useState<Subcategory[] | undefined>([]);
    const { data: productsData, isLoading: productsLoading } = useQuery({
        queryKey: [
            'products',
            language,
            debouncedSearchTerm,
            page,
            selectedCategory,
            selectedSort,
            selectedSubCategory,
        ],
        queryFn: () =>
            getProductsByParams(
                language,
                page,
                debouncedSearchTerm,
                selectedCategory === 0 ? undefined : selectedCategory,
                selectedSort === 'no' ? undefined : selectedSort,
                selectedSubCategory === 0 ? undefined : selectedSubCategory
            ),
    });
    // console.log('selectedSubCategory', selectedSubCategory);
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
    interface Subcategory {
        id: number;
        name: string;
        category_id: number;
        slug: {
            az: string;
            en: string;
            ru: string;
        };
        description: string;
    }
    type ApiResponse<T> = {
        data: T[];
    };

    const {
        data: productCategoriesData,
        isLoading: productCategoriesLoading,
        isError: productCategoriesError,
    } = useQuery<ApiResponse<DataItem>>({
        queryKey: ['productCategories', language],
        queryFn: () => getProductCategories(language),
    });
    const {
        data: productSubCategoriesData,
        isLoading: productSubCategoriesLoading,
        isError: productSubCategoriesError,
    } = useQuery<ApiResponse<Subcategory>>({
        queryKey: ['productSubCategories', language],
        queryFn: () => getProductSubCategories(language),
    });
    const {
        data: meta,
        isLoading: metaLoading,
        isError: metaError,
    } = useQuery<MetaItem[]>({
        queryKey: ['meta', language],
        queryFn: () => getTopMeta(language),
    });
    // console.log('productSubCategoriesData', productSubCategoriesData);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.value);
        setSearchTerm(event.target.value);
    };
    const { category, subcategory, pagination, search } = router.query;

    useEffect(() => {
        if (category) {
            console.log('categoryAAAA', category);
            const CurrentCATEGORY = productCategoriesData?.data.find(
                (item) =>
                    item.slug[language as keyof typeof item.slug] === category
            );
            // console.log('CurrentCATEGORY', CurrentCATEGORY);
            setSelectedCategory(Number(CurrentCATEGORY?.id));
        }
        if (subcategory) {
            console.log('categoryAAAA', category);
            const CurrentCATEGORY = productSubCategoriesData?.data.find(
                (item) =>
                    item.slug[language as keyof typeof item.slug] ===
                    subcategory
            );
            console.log('CurrentCATEGORY', CurrentCATEGORY);
            setSelectedSubCategory(Number(CurrentCATEGORY?.id));
        }
        // if (category) {
        //     // console.log('Category from URL:', category);
        //     setSelectedCategory(Number(category));
        // }
        if (Number(pagination) > 0) {
            setPage(Number(pagination));
        }
        // if (subcategory) {
        //     setSelectedSubCategory(Number(subcategory));
        // }
        if (search) {
            setSelectedSort(search.toString());
        }
    }, [category, subcategory, pagination, search]);
    useEffect(() => {
        if (selectedCategory) {
            console.log(
                'data',
                productCategoriesData?.data.find(
                    (item) => item.id === selectedCategory
                )?.subcategories
            );
            setsub(
                productCategoriesData?.data.find(
                    (item) => item.id === selectedCategory
                )?.subcategories
            );
        }
    }, [productCategoriesData, selectedCategory]);
    // console.log(productsData);

    const { data: translationsData } = useQuery({
        queryKey: ['translations', language],
        queryFn: () => getTranslations(language),
    });
    if (
        productCategoriesLoading ||
        productSubCategoriesLoading ||
        metaLoading
    ) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (productCategoriesError || productSubCategoriesError || metaError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>Error</p>
                </div>
            </div>
        );
    }
    const pagemetas = meta?.find((item) => item.type === 'Products');
    console.log('pagemetas', pagemetas);
    const baseUrl =
        typeof window !== 'undefined'
            ? window.location.origin
            : 'https://emkotech.com'; // Fallback for SSR
    const fullUrl = `${baseUrl}${router.asPath}`;
    return (
        <>
            <Head>
                <link rel="canonical" href={fullUrl} />

                <title>{pagemetas?.['meta-title']}</title>
                <meta
                    name="description"
                    content={pagemetas?.['meta-description']}
                />
                <meta name="keywords" content={pagemetas?.['meta-keys']} />
                <meta property="og:title" content={pagemetas?.['meta-title']} />
                <meta
                    property="og:description"
                    content={pagemetas?.['meta-description']}
                />
                <meta property="og:image" content={pagemetas?.['meta-image']} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={fullUrl} />
                <meta
                    property="og:site_name"
                    content={pagemetas?.['meta-title']}
                />
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:description"
                    content={pagemetas?.['meta-description']}
                />
                <meta
                    name="twitter:title"
                    content={pagemetas?.['meta-title']}
                />
                <meta
                    name="twitter:image"
                    content={pagemetas?.['meta-image']}
                />
                <meta name="twitter:site" content="@emkotech" />
                <meta name="twitter:creator" content="@emkotech" />
            </Head>
            <div className="mt-[94px]">
                {/* <Header activeindex={1} /> */}
                {selectedCategory === 0 ? (
                    <BreadcrumbNavigation
                        items={[
                            {
                                text: `${translationsData?.data?.Məhsullar}`,
                                path: `/${language}/${ROUTES.products[language]}`,
                            },
                        ]}
                    />
                ) : selectedSubCategory === 0 ? (
                    <BreadcrumbNavigation
                        items={[
                            {
                                text: `${translationsData?.data?.Məhsullar}`,
                                path: `/${language}/${ROUTES.products[language]}`,
                            },
                            {
                                text: `${
                                    productCategoriesData?.data.find(
                                        (item) => item.id === selectedCategory
                                    )?.title
                                }`,
                                path: `/${language}/${
                                    ROUTES.products[language]
                                }/${
                                    productCategoriesData?.data.find(
                                        (item) => item.id === selectedCategory
                                    )?.slug[language as 'az' | 'en' | 'ru']
                                }`,
                            },
                        ]}
                    />
                ) : (
                    <BreadcrumbNavigation
                        items={[
                            {
                                text: `${translationsData?.data?.Məhsullar}`,
                                path: `/${language}/${ROUTES.products[language]}`,
                            },
                            {
                                text: `${
                                    productCategoriesData?.data.find(
                                        (item) => item.id === selectedCategory
                                    )?.title
                                }`,
                                path: `/${language}/${
                                    ROUTES.products[language]
                                }/${
                                    productCategoriesData?.data.find(
                                        (item) => item.id === selectedCategory
                                    )?.slug[language as 'az' | 'en' | 'ru']
                                }`,
                            },
                            {
                                text: `${
                                    productSubCategoriesData?.data.find(
                                        (item) =>
                                            item.id === selectedSubCategory
                                    )?.name
                                }`,
                                path: `/${language}/${
                                    ROUTES.products[language]
                                }/${
                                    productCategoriesData?.data.find(
                                        (item) => item.id === selectedCategory
                                    )?.slug[language as 'az' | 'en' | 'ru']
                                }/${
                                    productSubCategoriesData?.data.find(
                                        (item) =>
                                            item.id === selectedSubCategory
                                    )?.slug[language as 'az' | 'en' | 'ru']
                                }`,
                            },
                        ]}
                    />
                )}

                {/* <BreadcrumbNavigation
                    items={[
                        {
                            text: `${translationsData?.data?.Məhsullar}`,
                            path: `/${language}/${ROUTES.products[language]}`,
                        },
                        // {
                        //     text: productData?.product.category_name,
                        //     path: `/${language}/${ROUTES.products[language]}?category=${productData?.product.category_id}`,
                        // },
                        // {
                        //     text: productData?.product?.subcategory_name,
                        //     path: `/${language}/${ROUTES.products[language]}?category=${productData?.product.category_id}&sub_category=${productData?.product?.subcategory_id}`,
                        // },
                        // {
                        //     text: productData?.product?.title,
                        //     path: router.asPath,
                        // },
                    ]}
                /> */}
                <main>
                    <section className="flex flex-col text-black">
                        <h1
                            data-layername="məhsullar"
                            className="self-center text-5xl max-md:text-4xl mt-[24px]"
                        >
                            {translationsData?.data?.Məhsullar}
                        </h1>
                        <CatecoryArticle
                            productCategoriesData={productCategoriesData?.data}
                            selectedCategory={selectedCategory}
                            productSubCategoriesData={
                                productSubCategoriesData?.data
                            }
                            selectedSubCategory={selectedSubCategory}
                        />

                        <section
                            data-layername="filter"
                            className="flex flex-wrap lg:gap-6 md:gap-6 gap-3 items-center px-28 py-8 mt-6 w-full text-base bg-white max-md:px-5 max-md:max-w-full"
                        >
                            <div className="flex grow overflow-hidden  shrink gap-10 justify-between items-center self-stretch pr-3 cursor-pointer  appearance-auto  whitespace-nowrap rounded-2xl border border-solid border-neutral-200 min-w-[240px] w-[230px] max-md:px-5">
                                <select
                                    data-layername="əsasSəhifə"
                                    className="w-full h-full bg-white select-none outline-none border-none px-6"
                                    value={
                                        productCategoriesData?.data.find(
                                            (item) =>
                                                item.id === selectedCategory
                                        )?.slug[language as 'az' | 'en' | 'ru']
                                    }
                                    onChange={(e) => {
                                        // setSelectedCategory(
                                        //     Number(e.target.value)
                                        // );
                                        // setSelectedSubCategory(0);
                                        router.push(
                                            `/${language}/${ROUTES.products[language]}/${e.target.value}?search=${debouncedSearchTerm}&sort=${selectedSort}&pagination=1`
                                        );
                                    }}
                                >
                                    <option
                                        data-layername="kategoriyalar"
                                        value="0"
                                    >
                                        {translationsData?.data?.category}
                                    </option>
                                    {productCategoriesData?.data?.map(
                                        (item: DataItem, index: number) => (
                                            <option
                                                key={index}
                                                data-layername="kategoriyalar"
                                                value={
                                                    item.slug[
                                                        language as keyof typeof item.slug
                                                    ]
                                                }
                                            >
                                                {item.title}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className="flex grow  bg-none shrink gap-10 justify-between items-center self-stretch pr-3  whitespace-nowrap rounded-2xl border border-solid border-neutral-200 min-w-[240px] w-[230px] max-md:px-5">
                                <select
                                    data-layername="əsasSəhifə"
                                    className="w-full h-full bg-white select-none outline-none border-none px-6"
                                    value={
                                        productSubCategoriesData?.data.find(
                                            (item) =>
                                                item.id === selectedSubCategory
                                        )?.slug[language as 'az' | 'en' | 'ru']
                                    }
                                    onChange={(e) => {
                                        // setSelectedSubCategory(
                                        //     Number(e.target.value)
                                        // )
                                        router.push(
                                            `/${language}/${
                                                ROUTES.products[language]
                                            }/${
                                                productCategoriesData?.data.find(
                                                    (item) =>
                                                        item.id ===
                                                        selectedCategory
                                                )?.slug[
                                                    language as
                                                        | 'az'
                                                        | 'en'
                                                        | 'ru'
                                                ]
                                            }/${
                                                e.target.value
                                            }?search=${debouncedSearchTerm}&sort=${selectedSort}&pagination=1`
                                        );
                                    }}
                                >
                                    <option
                                        data-layername="kategoriyalar"
                                        value="0"
                                    >
                                        {translationsData?.data?.subcategory}
                                    </option>
                                    {
                                        selectedCategory === 0
                                            ? productSubCategoriesData?.data?.map(
                                                  (
                                                      item: Subcategory,
                                                      index: number
                                                  ) => (
                                                      <option
                                                          key={index}
                                                          data-layername="kategoriyalar"
                                                          value={
                                                              item.slug[
                                                                  language as
                                                                      | 'az'
                                                                      | 'en'
                                                                      | 'ru'
                                                              ]
                                                          }
                                                      >
                                                          {item.name}
                                                      </option>
                                                  )
                                              )
                                            : sub?.map(
                                                  (
                                                      item: Subcategory,
                                                      index: number
                                                  ) => (
                                                      <option
                                                          key={index}
                                                          data-layername="kategoriyalar"
                                                          value={
                                                              item.slug[
                                                                  language as
                                                                      | 'az'
                                                                      | 'en'
                                                                      | 'ru'
                                                              ]
                                                          }
                                                      >
                                                          {item.name}
                                                      </option>
                                                  )
                                              )
                                        // ?.subcategories?.map( (item: Subcategory, index: number) => (
                                        //     <option
                                        //         key={index}
                                        //         data-layername="kategoriyalar"
                                        //         value={item.id}
                                        //     >
                                        //         {item.name}
                                        //     </option>
                                        // ))
                                    }
                                </select>
                            </div>
                            <div className="flex grow overflow-hidden  shrink gap-10 justify-between items-center self-stretch pr-3 cursor-pointer  appearance-auto  whitespace-nowrap rounded-2xl border border-solid border-neutral-200 min-w-[240px] w-[230px] max-md:px-5">
                                <select
                                    data-layername="əsasSəhifə"
                                    className="w-full h-full bg-white select-none outline-none border-none px-6"
                                    value={selectedSort}
                                    onChange={(e) => {
                                        setSelectedSort(e.target.value);
                                        router.push(
                                            `/${language}/${
                                                ROUTES.products[language]
                                            }/${
                                                productCategoriesData?.data.find(
                                                    (item) =>
                                                        item.id ===
                                                        selectedCategory
                                                )?.slug[
                                                    language as
                                                        | 'az'
                                                        | 'en'
                                                        | 'ru'
                                                ]
                                            }/${
                                                productSubCategoriesData?.data.find(
                                                    (item) =>
                                                        item.id ===
                                                        selectedSubCategory
                                                )?.slug[
                                                    language as
                                                        | 'az'
                                                        | 'en'
                                                        | 'ru'
                                                ]
                                            }?search=${
                                                e.target.value
                                            }&sort=${selectedSort}&pagination=1`
                                        );
                                    }}
                                >
                                    <option
                                        key={0}
                                        data-layername="kategoriyalar"
                                        value={'no'}
                                    >
                                        {translationsData?.data?.Sort}
                                    </option>
                                    <option key={1} value={'price_asc'}>
                                        {translationsData?.data?.ucuzdan_bahaya}
                                    </option>
                                    <option key={2} value={'price_desc'}>
                                        {translationsData?.data?.bahadan_ucuza}
                                    </option>
                                    <option key={3} value={'title_asc'}>
                                        a-z{' '}
                                    </option>{' '}
                                    <option key={4} value={'title_desc'}>
                                        z-a{' '}
                                    </option>
                                    <option key={5} value={'popular'}>
                                        {translationsData?.data?.popular}
                                    </option>
                                    <option key={5} value={'discount'}>
                                        {translationsData?.data?.discount}
                                    </option>
                                </select>
                            </div>
                            <div
                                data-layername="searchField"
                                className="flex grow shrink gap-10 justify-between items-center self-stretch px-6 py-2.5 my-auto text-sm font-medium leading-none rounded-2xl border border-gray-200 border-solid bg-neutral-100 min-w-[240px] text-stone-500 w-[230px] max-md:px-5"
                            >
                                <label
                                    htmlFor="searchInput"
                                    className="sr-only"
                                >
                                    {translationsData?.data?.Axtar}
                                </label>
                                <input
                                    id="searchInput"
                                    type="text"
                                    placeholder={translationsData?.data?.Axtar}
                                    className="bg-transparent border-none outline-none w-full"
                                    value={searchTerm}
                                    onChange={handleChange}
                                />
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/2e19dc35dd213e656474aa0288d1d6968a56aec699761271179437a1d7f07a00?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                                    alt=""
                                    className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                                />
                            </div>
                        </section>
                    </section>
                    {productsData?.data?.length > 0 ? (
                        <div className="flex justify-center">
                            <section className="grid w-fit   mt-[30px] flex-row lg:grid-cols-4 md:grid-cols-3 items-center justify-self-center sm:grid-cols-2 grid-cols-1 lg:px-[100px] md:px-[60px] px-[30px] justify-center gap-x-4 lg:gap-y-[52px] gap-y-4">
                                {productsLoading
                                    ? Array(8)
                                          .fill(0)
                                          .map((_, index) => (
                                              <div
                                                  key={index}
                                                  className="w-[280px] h-[400px] bg-gray-200 rounded-lg animate-pulse"
                                              >
                                                  <div className="w-full h-[200px] bg-gray-300 rounded-t-lg" />
                                                  <div className="p-4 space-y-3">
                                                      <div className="h-4 bg-gray-300 rounded w-3/4" />
                                                      <div className="h-4 bg-gray-300 rounded w-1/2" />
                                                      <div className="h-4 bg-gray-300 rounded w-1/4" />
                                                  </div>
                                              </div>
                                          ))
                                    : productsData.data.map((item: Product) => (
                                          <ProductCard
                                              key={item.id}
                                              data={item}
                                          />
                                      ))}
                            </section>
                        </div>
                    ) : (
                        <div className=" flex flex-col justify-center items-center lg:mt-[120px] mt-[40px]">
                            <Image
                                src={'/images/empty.png'}
                                alt="empty"
                                width={10000}
                                height={10000}
                                className="lg:w-[30%] w-[40%] h-auto"
                            />
                            <h5 className="text-[#667085] text-[24px] mt-6 font-semibold">
                                {translationsData?.data?.Tapılmadı}{' '}
                            </h5>
                        </div>
                    )}

                    <PaginationComponent
                        totalPages={productsData?.total_page}
                        currentPage={page}
                        onPageChange={(page) => {
                            // setPage(page);
                            // router.push(
                            //     `/${language}/${ROUTES.products[language]}?category=${category}&sub_category=${subcategory}&search=${debouncedSearchTerm}&sort=${selectedSort}&pagination=${page}`
                            // );
                            router.push(
                                `/${language}/${ROUTES.products[language]}/${
                                    productCategoriesData?.data.find(
                                        (item) => item.id === selectedCategory
                                    )?.slug[language as 'az' | 'en' | 'ru']
                                }/${
                                    productSubCategoriesData?.data.find(
                                        (item) =>
                                            item.id === selectedSubCategory
                                    )?.slug[language as 'az' | 'en' | 'ru']
                                }?search=${debouncedSearchTerm}&sort=${selectedSort}&pagination=${page}`
                            );
                        }}
                    />
                </main>
                {/* <Footer /> */}
            </div>
        </>
    );
}
