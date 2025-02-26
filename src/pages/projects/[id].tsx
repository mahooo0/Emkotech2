import BreadcrumbNavigation from '@/components/BreadCamp';

import React from 'react';
import {
    getProjectById,
    getProjects,
    getTranslations,
} from '@/services/Request';
import { ProjectSwiper } from '@/components/ProjectSwipper';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { ROUTES } from '@/services/CONSTANTS';

export interface Project {
    slug: { az: string; en: string; ru: string };
    id: number;
    title: string;
    description: string;
    image: string;
    image_title: string | null;
    alt: string | null;
}
type TranslationData = Record<string, string>;

export interface Translation {
    Layihələr: string;
    Digər_Layihələr: string;
    data: TranslationData;
}
export default function ProjectsId({
    project,
    translations,
    relatedProjects,
}: {
    project: Project;
    translations: Translation;
    relatedProjects: Project[];
}) {
    const router = useRouter();
    const { lang } = router.query;
    const language = lang ? lang?.toString() : 'az';
    if (!project) {
        return <div>Error: Project not found</div>;
    }
    return (
        <div>
            {/* <Header activeindex={3} /> */}
            <main className="mt-[94px]">
                <BreadcrumbNavigation
                    items={[
                        {
                            text: `${translations?.Layihələr}`,
                            path: `/${language}/${ROUTES.project[language]}`,
                        },
                        {
                            text: project.title,
                            path: `/${language}/${ROUTES.project[language]}/${project.id}`,
                        },
                    ]}
                />
                <section className="flex flex-col text-black lg:px-[100px] md:px-[60px] px-[30px]">
                    <div className="flex flex-col rounded-2xl mt-[24px]">
                        <span className="self-center text-5xl text-black max-md:text-4xl">
                            {project.title}
                        </span>
                        <div className="flex flex-col rounded-2xl">
                            <div className="lg:mt-6 mt-0 max-md:-mr-0.5 max-md:max-w-full">
                                <div className="flex gap-5 max-md:flex-col">
                                    <div className="flex flex-col w-[41%] max-md:ml-0 max-md:w-full">
                                        <img
                                            loading="lazy"
                                            className="object-cover w-full rounded-2xl aspect-square max-md:mt-6 max-md:max-w-full"
                                            src={project.image}
                                            alt={
                                                project?.alt
                                                    ? project.alt
                                                    : project?.title
                                            }
                                            title={
                                                project?.image_title
                                                    ? project.image_title
                                                    : project?.title
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col ml-5 w-[59%] max-md:ml-0 max-md:w-full">
                                        <div
                                            className="text-base leading-8 text-neutral-600 max-md:mt-6 max-md:max-w-full"
                                            dangerouslySetInnerHTML={{
                                                __html: project.description,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <h2 className="self-center w-full text-center mt-[120px] text-5xl text-black max-md:text-4xl">
                    {translations?.Digər_Layihələr}
                </h2>
                <ProjectSwiper data={relatedProjects} />
                {/* <div className="grid px-[30px] lg:grid-cols-3 grid-cols-1 w-full self-center justify-self-center place-items-center gap-6 mt-[34px] max-w-[1200px] mx-auto">
                    {relatedProjects.map((item: Project) => (
                        <ProjectCard key={item.id} data={item} />
                    ))}
                </div> */}
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const id = context?.params?.id; // Get project ID from URL params
    const language = context.req.cookies['accept-language'] || 'en'; // Use 'accept-language' cookie or fallback to 'en'

    try {
        const [projectResponse, translationsResponse] = await Promise.all([
            getProjectById(language, id),
            getTranslations(language),
        ]);

        // Fetch related projects if needed
        const relatedProjectsResponse = await getProjects(language); // Assuming `getProjects` fetches all projects
        const relatedProjects = relatedProjectsResponse.data.filter(
            (p: Project) => p.id !== Number(id)
        );

        return {
            props: {
                project: projectResponse.data || null,
                translations: translationsResponse.data || {},
                relatedProjects: relatedProjects || [],
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                project: null,
                translations: {},
                relatedProjects: [],
            },
        };
    }
}
