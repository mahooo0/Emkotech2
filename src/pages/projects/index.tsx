import BreadcrumbNavigation from '@/components/BreadCamp';

import ProjectCard from '@/components/ProjectCard';
import { getProjects, getTopMeta, getTranslations } from '@/services/Request';
import { parse } from 'cookie';
import React, { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import { MetaItem } from '@/types';
import { useRouter } from 'next/router';
import Head from 'next/head';

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    slug: { az: string; en: string; ru: string };
    image_title: string | null;
    alt: string | null;
}
type TranslationData = Record<string, string>;

interface Translation {
    Layihələr: string;
    Daha_çox: string;
    data: TranslationData;
}
export default function Projects({
    projects,
    translations,
    meta,
}: {
    projects: Project[];
    translations: Translation;
    meta: MetaItem[];
}) {
    const [showAll, setShowAll] = useState(false);
    const router = useRouter();
    console.log('meta:', meta);
    const pagemetas = meta?.find((item) => item.type === 'Projects');
    console.log('projects', projects);
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
            <div>
                {/* <Header activeindex={3} /> */}
                <main className="mt-[94px]">
                    <BreadcrumbNavigation
                        items={[
                            {
                                text: `${translations?.Layihələr}`,
                                path: '/projects',
                            },
                        ]}
                    />
                    <section className="flex flex-col text-black lg:px-[100px] md:px-[60px] px-[30px] ">
                        <div className="flex flex-col rounded-2xl mt-[24px]">
                            <h1 className="self-center text-5xl text-black max-md:text-4xl">
                                {translations?.Layihələr}
                            </h1>
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 max-w-[1100px] grid-cols-1 self-center justify-self-center gap-6 mt-6">
                                {projects
                                    ?.slice(0, showAll ? projects.length : 9)
                                    .map((item: Project) => (
                                        <ProjectCard
                                            data={item}
                                            key={item.id}
                                        />
                                    ))}
                            </div>
                            {projects?.length > 9 && !showAll && (
                                <div className="w-full flex justify-center items-center mt-[50px] ">
                                    <button
                                        onClick={() => setShowAll(true)}
                                        className="bg-[#186FE0] hover:bg-[#1829e0] duration-300 text-white px-[28px] py-[14px] rounded-[18px]"
                                    >
                                        {translations?.Daha_çox}
                                    </button>
                                </div>
                            )}
                        </div>
                    </section>
                </main>
                {/* <Footer /> */}
            </div>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = parse(context.req.headers.cookie || '');
    const language = cookies['accept-language'] || 'en';
    try {
        const projects = await getProjects(language);
        const translations = await getTranslations(language);
        const meta = await getTopMeta(language);

        return {
            props: {
                projects: projects.data || [],
                translations: translations.data || {},
                meta,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                projects: [],
                translations: {},
                meta: [],
            },
        };
    }
}
