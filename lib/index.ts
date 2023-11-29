import { monthNames } from "@/data/months";
import { NewsProps } from "@/types";
import sql from "better-sqlite3";

const db = sql("news_DB.db");

export const getAllNews = async (): Promise<NewsProps[]> => {
  const news: NewsProps[] = db
    .prepare("SELECT * FROM news")
    .all() as NewsProps[];
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
};

export const getNewsItem = async (
  slug: string
): Promise<NewsProps | undefined> => {
  const newsItem = db
    .prepare("SELECT * FROM news WHERE slug = ?")
    .get(slug) as NewsProps;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return newsItem;
};

export const getRelatedNews = async (): Promise<NewsProps[]> => {
  const relatedNews: NewsProps[] = db
    .prepare("SELECT * FROM related_news")
    .all() as NewsProps[];
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return relatedNews;
};

export const getRelatedNewsItem = async (
  slug: string
): Promise<NewsProps | undefined> => {
  const newsItem = db
    .prepare("SELECT * FROM related_news WHERE slug = ?")
    .get(slug) as NewsProps;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return newsItem;
};

export const getLatestNews = async (): Promise<NewsProps[]> => {
  const latestNews: NewsProps[] = db
    .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3")
    .all() as NewsProps[];
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return latestNews;
};

export const getAvailableNewsYears = async (): Promise<string[]> => {
  const years: string[] = db
    .prepare("SELECT DISTINCT strftime('%Y', date) AS year FROM news")
    .all()
    .map((row: any) => row.year)
    .sort((a, b) => b - a);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return years;
};

export const getNewsForYear = async (year: string): Promise<NewsProps[]> => {
  const news: NewsProps[] = db
    .prepare("SELECT * FROM news WHERE strftime('%Y', date) = ?")
    .all(year) as NewsProps[];
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
};

export const getAvailableYearMonths = async (
  year: string
): Promise<string[]> => {
  const months: number[] = db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) AS month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year)
    .map((row: any) => parseInt(row.month));

  const sortedMonths: number[] = months.sort((a, b) => a - b);
  const monthNamesSorted: string[] = sortedMonths.map(
    (month) => monthNames[month - 1]
  );

  await new Promise((resolve) => setTimeout(resolve, 2000));
  return monthNamesSorted;
};

export const getNewsForMonth = async (
  year: string,
  month: string
): Promise<NewsProps[]> => {
  const news: NewsProps[] = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ?"
    )
    .all(year, month) as NewsProps[];
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
};
