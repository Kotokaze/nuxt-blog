import { ResContent } from "./api";
import { FetchedAuthor } from "./author";
import { FetchedCategory } from "./category";

export interface Article {
  id: string
  updatedAt: Date
  publishedAt: Date
  title: string
  categoryIds: Array<string>
  description?: string
  body: string
  authorId: string
  relatedArticleIds: Array<string>
}

export interface FetchedArticle extends Article, ResContent {
  categories: Array<FetchedCategory>
  author: FetchedAuthor
  relatedArticles: Array<FetchedArticle>
}
