// import useRedirect from '@/components/Hoc/RedirectContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function notfound() {
    // useRedirect();
    return (
        <div className=" text-black lg:mt-[69px]  mt-[75.68px]">
            <Image
                src={'/images/notfound.png'}
                alt="notfound"
                width={2000}
                height={2000}
                className="w-[70%] h-auto mx-auto "
            />
            <div className="max-w-[960px] mx-auto flex justify-center items-center flex-col gap-6 mt-[50px]">
                <h1 className="text-[48px] font-normal text-center">
                    {' '}
                    Oops, Page Not Found
                </h1>
                <p className="text-[24px] font-normal text-center">
                    The page you were searching for seems to have taken a detour
                    into deep space.{' '}
                </p>
                <Link href="/">
                    <button className="w-[260px] h-[41px] bg-[#186FE0F0] rounded-[18px] text-[16px] font-normal text-white flex justify-center items-center">
                        ANA SƏHİFƏ
                    </button>
                </Link>
            </div>
        </div>
    );
}
