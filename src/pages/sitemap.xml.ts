import { NewsItem } from '@/components/NewsIdAside';
import { Project } from '@/types';
import { GetServerSideProps } from 'next';
import { Product } from './products/[id]';

// Helper function to format date as 'YYYY-MM-DDTHH:mm:ss+04:00'
const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);

    // Adjust the timezone offset to +04:00 (you can change the offset as needed)
    const timezoneOffset = 4 * 60; // +04:00 offset in minutes
    const localDate = new Date(date.getTime() + timezoneOffset * 60000);

    // Format the date to match '2024-12-20T11:27:15+04:00'
    const localISOString = localDate.toISOString().slice(0, 19); // Remove milliseconds part
    const offset =
        (timezoneOffset >= 0 ? '+' : '-') +
        String(Math.abs(timezoneOffset) / 60).padStart(2, '0') +
        ':00';

    return `${localISOString}${offset}`;
};

const Sitemap = () => {
    return null; // This page renders nothing.
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const host = req.headers.host; // Get the host from the request headers
    const protocol = req.headers['x-forwarded-proto'] || 'http'; // Use 'x-forwarded-proto' for proxies, fallback to 'http'
    const siteUrl = `${protocol}://${host}`; // Construct dynamic site URL

    // Fetch product data from the API
    const ProductApiUrl = 'https://emkotech.epart.az/api/products/all';
    const response = await fetch(ProductApiUrl);
    const { data: products } = await response.json();
    const newsApiUrl = 'https://emkotech.epart.az/api/news/all';
    const responseNews = await fetch(newsApiUrl);
    const { data: news } = await responseNews.json();
    const projectsApiUrl = 'https://emkotech.epart.az/api/projects/all';
    const responseProject = await fetch(projectsApiUrl);
    const { data: projects } = await responseProject.json();
    // Check if products were returned
    if (
        !Array.isArray(
            products || !Array.isArray(news) || !Array.isArray(projects)
        )
    ) {
        return {
            notFound: true, // If no products or invalid data, return a 404 page
        };
    }

    // Generate dynamic paths for each product in different languages
    const dynamicPathsProjects = projects.flatMap((project: Project) => {
        return [
            {
                url: `/az/layihələr/${project.slug.az}?id=${project.id}`,
                lastModified: formatDate(Date.now()),
            },
            {
                url: `/en/projects/${project.slug.en}?id=${project.id}`,
                lastModified: formatDate(Date.now()),
            },
            {
                url: `/ru/проекты/${project.slug.ru}?id=${project.id}`,
                lastModified: formatDate(Date.now()),
            },
        ];
    });
    const dynamicPathsNews = news.flatMap((news: NewsItem) => {
        return [
            {
                url: `/az/xəbərlər/${news.slug.az}?id=${news.id}`,
                lastModified: formatDate(Date.now()),
            },
            {
                url: `/en/news/${news.slug.en}?id=${news.id}`,
                lastModified: formatDate(Date.now()),
            },
            {
                url: `/ru/новости/${news.slug.ru}?id=${news.id}`,
                lastModified: formatDate(Date.now()),
            },
        ];
    });
    const dynamicPaths = products.flatMap((product: Product) => {
        return [
            {
                url: `/az/məhsullar/${product.slug.az}?id=${product.id}`,
                lastModified: formatDate(Date.now()),
            },
            {
                url: `/en/products/${product.slug.en}?id=${product.id}`,
                lastModified: formatDate(Date.now()),
            },
            {
                url: `/ru/продукты/${product.slug.ru}?id=${product.id}`,
                lastModified: formatDate(Date.now()),
            },
        ];
    });

    // Static paths (update as necessary)
    const staticPaths = [
        { url: '/', lastModified: formatDate(Date.now()) },
        { url: '/az', lastModified: formatDate(Date.now()) },
        { url: '/en', lastModified: formatDate(Date.now()) },
        { url: '/ru', lastModified: formatDate(Date.now()) },
        { url: '/az/haqimizda', lastModified: formatDate(Date.now()) },
        { url: '/en/about', lastModified: formatDate(Date.now()) },
        { url: '/ru/пронас', lastModified: formatDate(Date.now()) },
        { url: '/az/məhsullar', lastModified: formatDate(Date.now()) },
        { url: '/en/products', lastModified: formatDate(Date.now()) },
        { url: '/ru/продукты', lastModified: formatDate(Date.now()) },
        { url: '/az/layihələr', lastModified: formatDate(Date.now()) },
        { url: '/en/projects', lastModified: formatDate(Date.now()) },
        { url: '/ru/проекты', lastModified: formatDate(Date.now()) },
        { url: '/az/xəbərlər', lastModified: formatDate(Date.now()) },
        { url: '/en/news', lastModified: formatDate(Date.now()) },
        { url: '/ru/новости', lastModified: formatDate(Date.now()) },
        { url: '/az/əlaqə', lastModified: formatDate(Date.now()) },
        { url: '/en/contact', lastModified: formatDate(Date.now()) },
        { url: '/ru/контакт', lastModified: formatDate(Date.now()) },
    ];

    const allPaths = [
        ...staticPaths,
        ...dynamicPaths,
        ...dynamicPathsNews,
        ...dynamicPathsProjects,
    ];

    // Generate the XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
      .map(
          (path) => `
    <url>
      <loc>${siteUrl}${path.url}</loc>
      <lastmod>${path.lastModified}</lastmod>
    </url>
  `
      )
      .join('')}
</urlset>`;

    // Set response headers
    res.setHeader('Content-Type', 'application/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;
