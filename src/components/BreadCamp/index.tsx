import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface BreadcrumbItem {
    text: string;
    path: string;
}

interface BreadcrumbNavigationProps {
    items: BreadcrumbItem[];
}

const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
    items,
}) => {
    const router = useRouter();
    const { lang } = router.query;
    const language = lang ? lang?.toString() : 'az';
    return (
        <nav
            aria-label="Breadcrumb"
            className="flex gap-1 items-center text-xs font-semibold text-zinc-700 mt-[24px] lg:px-[100px] md:px-[60px] px-[30px]"
        >
            <Link href={`/${language}`}>
                <img
                    loading="lazy"
                    src={'/svg/homeIcon.svg'}
                    alt=""
                    className="object-cover shrink-0 self-stretch my-auto aspect-square min-w-[18px]"
                />
            </Link>
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/a7ef65ed27217eb666cd31dd6d2711e7e0527fdf941456d2cd68d2d9b4b67997?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                alt=""
                className="object-cover shrink-0 self-stretch my-auto aspect-square w-[18px]"
            />
            {items.map((item, index) => (
                <React.Fragment key={index}>
                    <Link href={item.path}>
                        <span
                            className={`self-stretch my-auto line-clamp-1 ${
                                index === items.length - 1
                                    ? 'font-medium text-zinc-400'
                                    : ''
                            }`}
                        >
                            {item.text}
                        </span>
                    </Link>

                    {index < items.length - 1 && (
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/c6f3c7bb740649e5a32c147b3037a1c2/a7ef65ed27217eb666cd31dd6d2711e7e0527fdf941456d2cd68d2d9b4b67997?apiKey=c6f3c7bb740649e5a32c147b3037a1c2&"
                            alt=""
                            className="object-cover shrink-0 self-stretch my-auto aspect-square w-[18px]"
                        />
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default BreadcrumbNavigation;
