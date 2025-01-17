import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsItem, getRelatedNewsItem } from "@/lib";

const NewsDetailPage = async ({ params }: { params: { news: string } }) => {
  const { news: newsSlug } = params;
  let newsItem;
  const selectedNews = await getNewsItem(newsSlug);
  const relatedNews = await getRelatedNewsItem(newsSlug);
  if (selectedNews) newsItem = selectedNews;
  else if (relatedNews) newsItem = relatedNews;

  if (!newsItem) notFound();

  return (
    <div className='max-w-2xl mx-12 md:mx-auto px-4 py-8'>
      <div className='flex items-center mb-8'>
        <Link
          href='/news'
          className='text-blue-500 hover:text-blue-700 transition-colors'
        >
          ← Back to News
        </Link>
      </div>
      <h1 className='text-3xl text-left font-bold mb-7'>{newsItem.title}</h1>
      <div className='relative h-80 w-full overflow-hidden mb-6'>
        <Link href={`/news/${newsItem.slug}/image`}>
          <Image
            src={`/news/${newsItem.image}`}
            alt={newsItem.title}
            width={500}
            height={500}
            className='rounded-lg cursor-pointer transition-transform duration-300 transform hover:scale-105'
          />
        </Link>
      </div>
      <div className='flex items-center text-gray-500 mb-4'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 mr-1'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M10 3a7 7 0 0 1 7 7c0 3.86-3.141 7-7 7s-7-3.14-7-7a7 7 0 0 1 7-7zM9 12a1 1 0 0 0 2 0v-2a1 1 0 0 0-2 0v2zm1-5a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1z'
          />
        </svg>
        <span>{new Date(newsItem.date).toLocaleDateString()}</span>
      </div>
      <p className='text-lg text-gray-700 leading-relaxed mb-6'>
        {newsItem.content}
      </p>
      <div className='flex justify-end'>
        <Link
          href={`/news/${newsItem.slug}/share`}
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'
        >
          Share This News
        </Link>
      </div>
    </div>
  );
};

export default NewsDetailPage;
