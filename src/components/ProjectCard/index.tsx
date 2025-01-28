import { Project } from '@/pages/projects';
import { ROUTES } from '@/services/CONSTANTS';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function ProjectCard({ data }: { data: Project | undefined }) {
    const router = useRouter();
    const { lang } = router.query;
    const language = lang ? lang?.toString() : 'az';
    return (
        <Link
            href={`/${language}/${ROUTES.project[language]}/${
                data?.slug[(language as 'az') || 'en' || 'ru']
            }?id=${data?.id}`}
        >
            {' '}
            <div
                key={data?.id}
                className="flex cursor-pointer overflow-hidden flex-col pb-14 text-lg bg-white rounded-2xl w-full  shadow-[0px_0px_11px_rgba(143,143,143,0.12)] max-sm:w-[286px]"
            >
                <img
                    loading="lazy"
                    className="object-cover w-full rounded-2xl aspect-[1.52] hover:scale-110 duration-300"
                    src={data?.image}
                />
                <div className="flex flex-col px-5 mt-5 w-full">
                    <div className="self-start font-medium text-black">
                        {data?.title}
                    </div>
                    <div
                        className="mt-2.5 text-[#BDBDC1] line-clamp-2"
                        dangerouslySetInnerHTML={{
                            __html: data?.description || ' ',
                        }}
                    />
                </div>
            </div>
        </Link>
    );
}
