import axios from 'axios';

export const getTopBanner = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/home/top-banner',
            { headers: { 'Accept-Language': language } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching top banner:', error);
        throw error;
    }
};
export const getTopMeta = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/metas',
            { headers: { 'Accept-Language': language } }
        );
        return response.data.data;
    } catch (error) {
        console.error('Error fetching top banner:', error);
        throw error;
    }
};
export const GetDiscountedProduct = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/products/discount',
            { headers: { 'Accept-Language': language } }
        );
        return response.data.data;
    } catch (error) {
        console.error('Error fetching top banner:', error);
        throw error;
    }
};
export const GetPopulyarProduct = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/products/popular',
            { headers: { 'Accept-Language': language } }
        );
        return response.data.data;
    } catch (error) {
        console.error('Error fetching top banner:', error);
        throw error;
    }
};
export const getTopImages = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/logos',
            { headers: { 'Accept-Language': language } }
        );
        return response.data.data;
    } catch (error) {
        console.error('Error fetching top banner:', error);
        throw error;
    }
};
export const getStatistics = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/home/statistics',
            { headers: { 'Accept-Language': language } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching statistics:', error);
        throw error;
    }
};
export const getProducts = async (language) => {
    try {
        const response = await axios.get(
            `https://emkotech.epart.az/api/products`,
            { headers: { 'Accept-Language': language } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
export const getCustomers = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/customers',
            { headers: { 'Accept-Language': language } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};
export const getBottomBanner = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/home/bottom-banner',
            { headers: { 'Accept-Language': language } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching bottom banner:', error);
        throw error;
    }
};
export const getPartners = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/partners',
            { headers: { 'Accept-Language': language } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching partners:', error);
        throw error;
    }
};
export const getProductCategories = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/product-categories',
            { headers: { 'Accept-Language': language } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching product categories:', error);
        throw error;
    }
};
export const getProductCategoriesHOME = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/home/product-categories',
            { headers: { 'Accept-Language': language } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching product categories:', error);
        throw error;
    }
};
export const getAbout = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/about',
            { headers: { 'Accept-Language': language } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching about:', error);
        throw error;
    }
};
export const getAboutBanner = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/about-banner',
            { headers: { 'Accept-Language': language } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching about banner:', error);
        throw error;
    }
};
export const getProduct = async (language, id) => {
    try {
        console.log('id', id);
        if (!id) {
            return;
        }
        const response = await axios.get(
            `https://emkotech.epart.az/api/product/${id}`,
            { headers: { 'Accept-Language': language } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};
export const getNews = async (language, page) => {
    console.log(language);
    try {
        const response = await axios.get(
            `https://emkotech.epart.az/api/news?page=${page}`,
            {
                headers: {
                    'Accept-Language': language,
                },
                timeout: 5000,
            }
        );
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout:', error);
            throw new Error('Request timed out. Please try again.');
        }
        if (!navigator.onLine) {
            console.error('No internet connection');
            throw new Error('Please check your internet connection');
        }
        console.error('Error fetching news:', error);
        throw error;
    }
};
export const getNewsById = async (language, id) => {
    console.log('id', id);
    if (!id) {
        console.log('id not found');

        return;
    }
    try {
        const response = await axios.get(
            `https://emkotech.epart.az/api/news/${id}`,
            { headers: { 'Accept-Language': language } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching news by id:', error);
        throw error;
    }
};
export const getProjects = async (language) => {
    try {
        const response = await axios.get(
            `https://emkotech.epart.az/api/projects`,
            {
                headers: {
                    'Accept-Language': language,
                },
                timeout: 5000,
            }
        );
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout:', error);
            throw new Error('Request timed out. Please try again.');
        }
        if (!navigator.onLine) {
            console.error('No internet connection');
            throw new Error('Please check your internet connection');
        }
        console.error('Error fetching projects:', error);
        throw error;
    }
};
export const getProjectById = async (language, id) => {
    console.log('id', id);

    if (!id) {
        return;
    }
    try {
        const response = await axios.get(
            `https://emkotech.epart.az/api/projects/${id}`,
            { headers: { 'Accept-Language': language } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching project by id:', error);
        throw error;
    }
};
export const getContacts = async (language) => {
    try {
        const response = await axios.get(
            `https://emkotech.epart.az/api/contacts`,
            {
                headers: {
                    'Accept-Language': language,
                },
                timeout: 5000,
            }
        );
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout:', error);
            throw new Error('Request timed out. Please try again.');
        }
        if (!navigator.onLine) {
            console.error('No internet connection');
            throw new Error('Please check your internet connection');
        }
        console.error('Error fetching contacts:', error);
        throw error;
    }
};
export const getFooter = async (language) => {
    try {
        const response = await axios.get(
            `https://emkotech.epart.az/api/footer`,
            {
                headers: {
                    'Accept-Language': language,
                },
                timeout: 5000,
            }
        );
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout:', error);
            throw new Error('Request timed out. Please try again.');
        }
        if (!navigator.onLine) {
            console.error('No internet connection');
            throw new Error('Please check your internet connection');
        }
        console.error('Error fetching footer:', error);
        throw error;
    }
};
export const getPopularNews = async (language) => {
    try {
        const response = await axios.get(
            `https://emkotech.epart.az/api/news?type=popular`,
            {
                headers: {
                    'Accept-Language': language,
                },
                timeout: 5000,
            }
        );
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout:', error);
            throw new Error('Request timed out. Please try again.');
        }
        if (!navigator.onLine) {
            console.error('No internet connection');
            throw new Error('Please check your internet connection');
        }
        console.error('Error fetching popular news:', error);
        throw error;
    }
};
export const postUserRequest = async (data) => {
    try {
        const response = await axios.post(
            `https://emkotech.epart.az/api/user-request`,
            data,
            {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout:', error);
            throw new Error('Request timed out. Please try again.');
        }
        if (!navigator.onLine) {
            console.error('No internet connection');
            throw new Error('Please check your internet connection');
        }
        console.error('Error submitting user request:', error);
        throw error;
    }
};
export const getTranslations = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/translations',
            {
                headers: {
                    'Accept-Language': language,
                },
                timeout: 5000,
            }
        );
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout:', error);
            throw new Error('Request timed out. Please try again.');
        }
        if (!navigator.onLine) {
            console.error('No internet connection');
            throw new Error('Please check your internet connection');
        }
        console.error('Error fetching translations:', error);
        throw error;
    }
};
export const getProductsByParams = async (
    language,
    page = 1,
    search,
    category,
    sort,
    subCategory
) => {
    try {
        const response = await axios.get(
            `https://emkotech.epart.az/api/products${
                page ? `?page=${page}` : ''
            }${category ? `&category=${category}` : ''}${
                sort ? `&sort=${sort}` : ''
            }${search ? `&search=${search}` : ''}${
                subCategory ? `&subcategory=${subCategory}` : ''
            }`,
            {
                headers: {
                    'Accept-Language': language,
                },
                timeout: 5000,
            }
        );
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout:', error);
            throw new Error('Request timed out. Please try again.');
        }
        if (!navigator.onLine) {
            console.error('No internet connection');
            throw new Error('Please check your internet connection');
        }
        console.error('Error fetching products:', error);
        throw error;
    }
};
export const getProductSubCategories = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/product-subcategories',
            {
                headers: {
                    'Accept-Language': language,
                },
                timeout: 5000,
            }
        );
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout:', error);
            throw new Error('Request timed out. Please try again.');
        }
        if (!navigator.onLine) {
            console.error('No internet connection');
            throw new Error('Please check your internet connection');
        }
        console.error('Error fetching product subcategories:', error);
        throw error;
    }
};
export const getPages = async (language) => {
    try {
        const response = await axios.get(
            'https://emkotech.epart.az/api/pages',
            {
                headers: {
                    'Accept-Language': language,
                },
                timeout: 5000,
            }
        );
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error('Request timeout:', error);
            throw new Error('Request timed out. Please try again.');
        }
        if (!navigator.onLine) {
            console.error('No internet connection');
            throw new Error('Please check your internet connection');
        }
        console.error('Error fetching pages:', error);
        throw error;
    }
};
