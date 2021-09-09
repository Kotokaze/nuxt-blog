import { ResContent } from "./api";

export interface Avatar {
  url: string
  height: number
  width: number
}

export interface Author {
  id: string
  createdAt: Date
  name: string
  description?: string
  avatar?: Avatar
}

export interface FetchedAuthor extends Author, ResContent {}
