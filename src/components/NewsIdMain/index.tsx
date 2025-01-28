import React from 'react';

interface NewsData {
    image: string;
    description: string;
}

function MainID({ data }: { data: NewsData }) {
    return (
        <div className="flex flex-col pb-5 rounded-none  w-full">
            <div className="flex  lg:flex-row flex-col-reverse gap-6 w-full max-md:max-w-full">
                {/* icons */}
                <div className="flex lg:flex-col flex-row gap-4">
                    <img
                        loading="lazy"
                        src="/images/faceboock.png"
                        className="object-contain shrink-0 self-start w-[34px] cursor-pointer"
                        onClick={() => {
                            const url = window.location.href;
                            navigator.clipboard.writeText(url);
                            window.open(
                                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                    url
                                )}`
                            );
                        }}
                    />
                    <img
                        loading="lazy"
                        src="/svg/instagram.svg"
                        className="object-contain shrink-0 self-start w-[34px] cursor-pointer"
                        onClick={() => {
                            const url = window.location.href;
                            navigator.clipboard.writeText(url);
                            window.open(
                                `https://www.instagram.com/direct/inbox?text=${encodeURIComponent(
                                    url
                                )}`
                            );
                        }}
                    />
                    <img
                        loading="lazy"
                        src="/svg/twitter.svg"
                        className="object-contain shrink-0 self-start w-[34px] cursor-pointer"
                        onClick={() => {
                            const url = window.location.href;
                            navigator.clipboard.writeText(url);
                            window.open(
                                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                    url
                                )}`
                            );
                        }}
                    />
                    <img
                        loading="lazy"
                        src="/svg/whatsup.svg"
                        className="object-contain shrink-0 self-start w-[34px] cursor-pointer"
                        onClick={() => {
                            const url = window.location.href;
                            navigator.clipboard.writeText(url);
                            window.open(
                                `https://api.whatsapp.com/send?text=${encodeURIComponent(
                                    url
                                )}`
                            );
                        }}
                    />
                </div>

                <img
                    loading="lazy"
                    src={data.image}
                    className="object-cover rounded-lg grow shrink-0  aspect-[1.22] basis-0 lg:w-[80%] w-full max-md:max-w-full"
                />
            </div>
            <div className="flex flex-col pr-1 lg:pl-14 pl-0 mt-6 w-full  max-md:max-w-full">
                <div
                    className="self-start text-base leading-10 text-neutral-600 max-md:max-w-full"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                ></div>
                {/* <div className="self-start mt-16 text-2xl font-medium tracking-normal leading-10 text-neutral-900 max-md:mt-10 max-md:max-w-full">
                    What's Special About WP Page Builder?
                </div>
                <div className="self-start mt-5 text-base leading-10 text-neutral-600 max-md:max-w-full">
                    Wondering what makes WP Page Builder so special? The plugin,
                    developed by Themeum, offers modern features for site
                    building. Let's look at some of the key features WP Page
                    Builder includes.
                </div>
                <img
                    loading="lazy"
                    src="https://s3-alpha-sig.figma.com/img/9e97/0195/1037e90a76c9822bddac28a446066f6a?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H33GUk1bc8bKPTLBOGg12GISiuREXIhkMSEHlLuHSwfEmSVgP~mDdkTLLiOIekKboNh8fk6xtELzD4qONSaJTgTHd3nDdPw-MFQlR0PhjCLHGUbjIMaExI0ZoqrlAe5-PLss-HW6ifRkpVcILw~uB2hiVAIAsQ5VMZoSuYBWXFC-Ei0zDrQHrNUUJ29EyPy1kV5FoV9Gy8gI3uL25IAQRukiB~LZZyFvmHrpcIqKF8OK2dt77CaE4chBvztTdEncH3akROkF~Wp5YL3VBxu~5dtEfQIiyrhpo1YMuf3jETmumjO7Yknbo0oodcNeteCbUuCOf0~comtQwvAw2sAQVw__"
                    className="object-cover mt-16 w-full rounded-none aspect-[1.21] max-md:mt-10 max-md:max-w-full"
                />
                <div className="mt-8 text-base leading-7 text-neutral-600 max-md:max-w-full">
                    <span>Here are some of the amazing add-ons included:</span>
                    <br />
                    <strong>• Form:</strong> Create web forms effortlessly,
                    style them conveniently, and enable reCAPTCHA easily.
                    <br />
                    <br />
                    <strong>• Carousel:</strong> Create stunning hero sliders
                    with no additional cost.
                    <br />
                    <strong>• Post Grid:</strong> Display blog posts in
                    customizable grids.
                    <br />
                    <strong>• Feature Box:</strong> Highlight features of
                    products effectively.
                    <br />
                    <strong>• Accordion:</strong> Collapse text content with
                    customizability.
                </div>
                <div className="mt-14 max-md:mt-10 max-md:max-w-full">
                    <div className="flex gap-5 max-md:flex-col">
                        <div className="flex flex-row gap-[15px] h-[524px] w-6/12 max-md:ml-0 max-md:w-full">
                            <img
                                loading="lazy"
                                src="https://s3-alpha-sig.figma.com/img/9e97/0195/1037e90a76c9822bddac28a446066f6a?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H33GUk1bc8bKPTLBOGg12GISiuREXIhkMSEHlLuHSwfEmSVgP~mDdkTLLiOIekKboNh8fk6xtELzD4qONSaJTgTHd3nDdPw-MFQlR0PhjCLHGUbjIMaExI0ZoqrlAe5-PLss-HW6ifRkpVcILw~uB2hiVAIAsQ5VMZoSuYBWXFC-Ei0zDrQHrNUUJ29EyPy1kV5FoV9Gy8gI3uL25IAQRukiB~LZZyFvmHrpcIqKF8OK2dt77CaE4chBvztTdEncH3akROkF~Wp5YL3VBxu~5dtEfQIiyrhpo1YMuf3jETmumjO7Yknbo0oodcNeteCbUuCOf0~comtQwvAw2sAQVw__"
                                className="object-cover rounded-none"
                            />
                            <img
                                loading="lazy"
                                src="https://s3-alpha-sig.figma.com/img/9e97/0195/1037e90a76c9822bddac28a446066f6a?Expires=1731888000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H33GUk1bc8bKPTLBOGg12GISiuREXIhkMSEHlLuHSwfEmSVgP~mDdkTLLiOIekKboNh8fk6xtELzD4qONSaJTgTHd3nDdPw-MFQlR0PhjCLHGUbjIMaExI0ZoqrlAe5-PLss-HW6ifRkpVcILw~uB2hiVAIAsQ5VMZoSuYBWXFC-Ei0zDrQHrNUUJ29EyPy1kV5FoV9Gy8gI3uL25IAQRukiB~LZZyFvmHrpcIqKF8OK2dt77CaE4chBvztTdEncH3akROkF~Wp5YL3VBxu~5dtEfQIiyrhpo1YMuf3jETmumjO7Yknbo0oodcNeteCbUuCOf0~comtQwvAw2sAQVw__"
                                className="object-cover rounded-none"
                            />
                        </div>
                    </div>
                </div>
                <p className="text-[#9283E0] text-[24px] font-light text-center mt-[61px]">
                    " WP Page Builder offers a lot of ready-to-use design blocks
                    to make your site development process a lot faster and
                    easier "
                </p> */}
            </div>
        </div>
    );
}

export default MainID;
