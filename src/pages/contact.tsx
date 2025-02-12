import BreadcrumbNavigation from '@/components/BreadCamp';

import React, { useEffect } from 'react';
import {
    getContacts,
    getTopMeta,
    getTranslations,
    postUserRequest,
} from '@/services/Request';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetServerSidePropsContext } from 'next';
import { MetaItem } from '@/types';
import { useRouter } from 'next/router';
import Head from 'next/head';

const ContactSchema = Yup.object().shape({
    fullName: Yup.string().required('Ad və soyad tələb olunur'),
    phone: Yup.string()
        .matches(
            /^[0-9]{2}[0-9]{3}[0-9]{2}[0-9]{2}$/,
            'Telefon nömrəsi düzgün deyil'
        )
        .required('Telefon nömrəsi tələb olunur'),
    notes: Yup.string(),
});

interface FormValues {
    fullName: string;
    phone: string;
    notes: string;
}

interface ContactData {
    id: number;
    icon: string;
    data: string;
}

interface ContactsData {
    image: string;
    data: ContactData[];
    iframe: string;
}

export interface TranslationsData {
    data: {
        [key: string]: string; // To handle dynamic translations
    };
}

interface ContactProps {
    contactsData: ContactsData;
    translationsData: TranslationsData;
    meta: MetaItem[];
}

const Contact = ({ contactsData, translationsData, meta }: ContactProps) => {
    const handleSubmit = async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
    ) => {
        const newValues = {
            category_id: '2',
            name: values.fullName,
            phone: values.phone,
            note: values.notes,
        };
        try {
            await postUserRequest(newValues);
            toast.success('Müraciət göndərildi');
        } catch (error) {
            toast.error('Müraciət göndərilərkən xəta baş verdi');
            console.error(error);
        }
        setSubmitting(false);
    };

    useEffect(() => {
        if (contactsData) {
            const element = document.getElementById('iframe_div');
            if (element) {
                element.innerHTML = contactsData.iframe;
            }
        }
    }, [contactsData]);
    const router = useRouter();
    const pagemetas = meta?.find((item) => item.type === 'Contacts');
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
                <main>
                    <BreadcrumbNavigation
                        items={[
                            {
                                text: translationsData?.data?.Əlaqə,
                                path: '/contact',
                            },
                        ]}
                    />
                    <section className="flex flex-col text-black lg:px-[100px] md:px-[60px] px-[16px] mt-6">
                        {translationsData && translationsData.data ? (
                            <h1 className="text-[48px] font-normal text-center">
                                {translationsData?.data?.Əlaqə}
                            </h1>
                        ) : (
                            <p>Loading...</p>
                        )}
                        <div
                            className="rounded-[16px] overflow-hidden mt-6"
                            style={{
                                backgroundImage: `url(${contactsData?.image})`,
                                backgroundSize: 'cover',
                            }}
                        >
                            <div className="p-16 w-full lg:px-[60px] md:px-5 px-4 max-md:max-w-full bg-opacity-60 bg-black">
                                <div className="flex lg:gap-[111px] gap-5 max-md:flex-col">
                                    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                                        <div className="flex flex-col mt-1 text-white max-md:mt-10 max-md:max-w-full">
                                            <h1 className="text-4xl font-semibold max-md:max-w-full">
                                                {
                                                    translationsData?.data
                                                        ?.Bizimlə_əlaqə
                                                }
                                            </h1>
                                            <div className="flex flex-col mt-7 gap-3 w-full text-base max-md:max-w-full">
                                                {contactsData?.data?.map(
                                                    (contact) => (
                                                        <div
                                                            key={contact.id}
                                                            className="flex overflow-hidden flex-col justify-center items-start p-2 w-full rounded-2xl bg-white bg-opacity-20 max-md:pr-5 max-md:max-w-full"
                                                        >
                                                            <div className="flex gap-3 items-center">
                                                                <img
                                                                    loading="lazy"
                                                                    src={
                                                                        contact.icon
                                                                    }
                                                                    className="object-contain shrink-0 self-stretch my-auto w-12 aspect-square rounded-[100px]"
                                                                />
                                                                <div className="self-stretch my-auto">
                                                                    {
                                                                        contact.data
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                                        <div className="flex overflow-hidden flex-col grow justify-center p-7 w-full rounded-3xl bg-white bg-opacity-20 lg:px-5 md:px-5 px-2 max-md:mt-10 max-md:max-w-full">
                                            <div className="flex flex-col max-md:max-w-full">
                                                <div className="text-xl font-semibold text-center text-white max-md:max-w-full">
                                                    {
                                                        translationsData?.data
                                                            ?.Formu_doldur_biz_əlaqə_saxlayaq
                                                    }
                                                </div>
                                                <Formik
                                                    initialValues={{
                                                        fullName: '',
                                                        phone: '',
                                                        notes: '',
                                                    }}
                                                    validationSchema={
                                                        ContactSchema
                                                    }
                                                    onSubmit={handleSubmit}
                                                >
                                                    {({
                                                        errors,
                                                        touched,
                                                        isSubmitting,
                                                    }) => (
                                                        <Form className="flex flex-col mt-7 w-full text-base max-md:max-w-full">
                                                            <div className="flex flex-col w-full text-black text-opacity-60 max-md:max-w-full">
                                                                <Field
                                                                    name="fullName"
                                                                    type="text"
                                                                    placeholder={
                                                                        translationsData
                                                                            ?.data
                                                                            ?.Ad_və_soyad
                                                                    }
                                                                    className="px-5 py-5 w-full h-[56px] bg-white border border-solid border-black border-opacity-10 rounded-[100px] outline-none"
                                                                />
                                                                {errors.fullName &&
                                                                    touched.fullName && (
                                                                        <div className="text-red-500 mt-1 ml-4">
                                                                            {
                                                                                errors.fullName
                                                                            }
                                                                        </div>
                                                                    )}
                                                            </div>
                                                            <div className="flex flex-col mt-3 w-full text-black text-opacity-60 max-md:max-w-full">
                                                                <div className="flex items-center px-5 py-5 w-full h-[56px] bg-white border border-solid border-black border-opacity-10 rounded-[100px]">
                                                                    <span className="text-black">
                                                                        +994
                                                                    </span>
                                                                    <Field
                                                                        name="phone"
                                                                        type="tel"
                                                                        placeholder="00 000 00 00"
                                                                        className="ml-2 w-full bg-transparent outline-none"
                                                                    />
                                                                </div>
                                                                {errors.phone &&
                                                                    touched.phone && (
                                                                        <div className="text-red-500 mt-1 ml-4">
                                                                            {
                                                                                errors.phone
                                                                            }
                                                                        </div>
                                                                    )}
                                                            </div>
                                                            <div className="flex flex-col mt-3 w-full rounded-2xl min-h-[111px] max-md:max-w-full">
                                                                <Field
                                                                    as="textarea"
                                                                    name="notes"
                                                                    placeholder={
                                                                        translationsData
                                                                            ?.data
                                                                            ?.Qeyd
                                                                    }
                                                                    className="px-5 pt-4 pb-20 w-full bg-white border border-solid border-black border-opacity-10 rounded-3xl outline-none resize-none"
                                                                />
                                                            </div>
                                                            <button
                                                                type="submit"
                                                                disabled={
                                                                    isSubmitting
                                                                }
                                                                className="self-stretch px-7 py-3.5 mt-7 font-medium text-white bg-blue-600 rounded-[18px] max-md:px-5 max-md:max-w-full disabled:opacity-50"
                                                            >
                                                                {isSubmitting
                                                                    ? translationsData
                                                                          ?.data
                                                                          ?.Göndərilir_
                                                                    : translationsData
                                                                          ?.data
                                                                          ?.Göndər}
                                                            </button>
                                                        </Form>
                                                    )}
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            id="iframe_div"
                            className="w-full h-[570px] rounded-xl mt-[20px] iframecantainer"
                        />
                    </section>
                </main>
                <ToastContainer />
            </div>
        </>
    );
};

export default Contact;

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    // const lang = cookies['accept-language'] || 'az';
    const { lang } = context.params as { lang: string };

    try {
        const contactsData = await getContacts(lang);
        const translationsData = await getTranslations(lang);
        const meta = await getTopMeta(lang);

        if (!contactsData || !translationsData || !meta) {
            throw new Error('Missing data');
        }

        return {
            props: {
                lang,
                contactsData,
                translationsData,
                meta,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                lang,
                contactsData: null,
                translationsData: null,
                meta: [],
            },
        };
    }
};
