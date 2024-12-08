import { makeAutoObservable, runInAction } from 'mobx';
import { IArticle, IComment } from '../types';
import { getArticles } from '../services/articles.service.ts';

class ArticleStore {
  articles: IArticle[] = [];

  constructor() {
    makeAutoObservable(this);
    this.fetchArticles = this.fetchArticles.bind(this);
    this.addArticle = this.addArticle.bind(this);
    this.removeArticle = this.removeArticle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.findArticleById = this.findArticleById.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  addArticle(article: IArticle) {
    runInAction(() => {
      this.articles.push(article);
    });
  }

  updateArticle(articleId: string, updateData: Partial<IArticle>) {
    const articleIndex = this.articles.findIndex(article => article._id === articleId);
    if (articleIndex === -1) {
      console.warn('Article not found');
      return;
    }
    runInAction(() => {
      this.articles[articleIndex] = {...this.articles[articleIndex], ...updateData};
    });
  }

  async fetchArticles() {
    try {
      const articles = await getArticles();
      runInAction(() => {
        this.articles = articles;
      });
    } catch (error) {
      runInAction(() => {
        this.articles = [];
      });
    }
  }

  removeArticle(articleId: string) {
    this.articles = this.articles.filter(article => article._id !== articleId);
  }

  findArticleById(articleId: string): IArticle | undefined {
    return this.articles.find(article => article._id === articleId);
  }

  addComment(articleId: string, comment: IComment) {
    const article = this.findArticleById(articleId);
    article?.comments.push(comment._id)
  }
}

const store = new ArticleStore();
export default store;
