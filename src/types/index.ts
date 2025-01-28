export interface CameraData {
    id: number;
    title: string;
    description: string;
    image: string;
    image2: string;
    image3: string;
}
export interface AboutBunnerItem {
    id: number;
    title: string;
    description: string;
    image: string;
}
export type TranslationData = Record<string, string>;

export interface Translation {
    Layihələr: string;
    Xəbərlər: string;

    Daha_çox: string;
    data: TranslationData;
}
export interface AboutBunner {
    data: AboutBunnerItem[];
}
export interface AboutData {
    data: CameraData[];
}
export interface AboutBannerItem {
    id: number;
    image: string;
    title: string;
    description: string;
}

export interface AboutUsProps {
    aboutData: AboutData;
    aboutBannerData: AboutBunner;
    translationsData: Translation;
}
export interface Project {
    slug: { az: string; en: string; ru: string };
    id: number;
    title: string;
    description: string;
    image: string;
    meta_title: string;
    meta_keys: string;

    meta_image: string;
    meta_description: string;
}
interface NewsItem {
    slug: {
        az: string;
        en: string;
        ru: string;
    };
    id: number;
    image: string;
    title: string;
    short_description: string;
    date: string;
    views: number;
}
export interface news {
    data: NewsItem[];
    total_pages: number;
}

export interface ContactData {
    id: number;
    icon: string;
    data: string;
}

export interface ContactsData {
    image: string;
    data: ContactData[];
    iframe: string;
}
export interface MetaItem {
    id: number;
    type: string;
    'meta-title': string;
    'meta-description': string;
    'meta-keys': string;
    'meta-image': string;
}
export type SiteAssets = {
    header_logo: string;
    footer_logo: string;
    favicon: string;
};
