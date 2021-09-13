import { actionTree, getAccessorType, getterTree, mutationTree } from 'typed-vuex'
import { ResponseRoot } from '~/models/api'
import { Article, FetchedArticle } from '~/models/article'
import { Author, FetchedAuthor } from '~/models/author'
import { Category, FetchedCategory } from '~/models/category'

export const state = () => ({
  data: {
    articles: [] as Array<Article>,
    authors: [] as Array<Author>,
    categories: [] as Array<Category>,
  },
})

type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  titles: (state: RootState) => (state.data.articles !== undefined ? state.data.articles.map(article => article.title) : []),
  slugs: (state: RootState) => (state.data.articles !== undefined ? state.data.articles.map(article => article.id) : []),
  body: (state: RootState) => (state.data.articles !== undefined ? state.data.articles.map(article => article.body) : []),
  descriptions: (state: RootState) => (state.data.articles !== undefined ? state.data.articles.map(article => article.description) : []),
  authors: (state: RootState) => (state.data.authors !== undefined ? state.data.authors.map(author => author.name) : []),
  categories: (state: RootState) => (state.data.categories !== undefined ? state.data.categories.map(category => category.name) : []),
})

export const mutations = mutationTree(state, {
  STORE_ARTICLE(state: RootState, articles: Array<Article>): void {
    state.data.articles = articles
  },

  STORE_AUTHORS(state: RootState, authors: Array<Author>): void {
    state.data.authors = authors
  },

  STORE_CATEGORIES(state: RootState, categories: Array<Category>): void {
    state.data.categories = categories
  },
})

export const actions = actionTree({ state, getters, mutations }, {
  async nuxtServerInit() {
    const accessor: (typeof accessorType) = this.app.$accessor
    await accessor.initialise()
  },

  async initialise(): Promise<void> {
    const accessor: (typeof accessorType) = this.app.$accessor
    await accessor.fetchArticles()
    await accessor.fetchAuthors()
    await accessor.fetchCategories()
  },

  async fetchArticles({ commit }): Promise<void> {
    const articles: Promise<Article[]> = this.$axios
      .$get<ResponseRoot<FetchedArticle>>('/api/v1/blogs' + '?limits=50' + '?orders=-publishedAt', {
        headers: { 'X-API-KEY': this.app.$config.apiKey },
      })
      .then((res) => {
        if (res.contents.length !== res.totalCount)
          throw new Error('totalCount is not equal to articles.len')

        return res.contents.map(val => {
          return {
            id: val.id,
            updatedAt: val.updatedAt,
            publishedAt: val.publishedAt,
            title: val.title,
            categoryIds: (val.categories !== undefined ? val.categories.map((cat): string => cat.id) : []),
            body: val.body,
            authorId: val.author.id,
            relatedArticleIds: (val.relatedArticles !== undefined ? val.relatedArticles.map((rel): string => rel.id) : []),
          }
        })
      })

    commit('STORE_ARTICLE', (await articles))
  },

  async fetchAuthors({ commit }): Promise<void> {
    const authors: Promise<Author[]> = this.$axios
      .$get<ResponseRoot<FetchedAuthor>>('/api/v1/authors' + '?limits=50' + '?orders=-publishedAt', {
        headers: { 'X-API-KEY': this.app.$config.apiKey },
      })
      .then((res) => {
        if (res.contents.length !== res.totalCount)
          throw new Error('totalCount is not equal to authors.len')

        return res.contents.map((val) => {
          return {
            id: val.id,
            createdAt: val.createdAt,
            name: val.name,
            description: val.description,
            avatar: val.avatar,
          }
        })
      })

    commit('STORE_AUTHORS', (await authors))
  },

  async fetchCategories({ commit }): Promise<void> {
    const categories: Promise<Category[]> = this.$axios
      .$get<ResponseRoot<FetchedCategory>>('/api/v1/categories' + '?limits=50' + '?orders=-publishedAt', {
        headers: { 'X-API-KEY': this.app.$config.apiKey },
      })
      .then((res) => {
        if (res.contents.length !== res.totalCount)
          throw new Error('totalCount is not equal to categories.len')

        return res.contents.map(val => {
          return {
            id: val.id,
            name: val.name,
          }
        })
      })

    commit('STORE_CATEGORIES', (await categories))
  },

})


// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})
