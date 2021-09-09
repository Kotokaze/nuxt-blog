import { ResContent } from "./api";

export interface Category {
  id: string
  name: string
}

export interface FetchedCategory extends Category, ResContent {}
