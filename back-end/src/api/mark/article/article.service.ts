import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from '../../../database/article/article.entity';
import { insert } from 'tools/sql';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ArticleRepositoryToken')
    private readonly ArticleRepository: Repository<Article>,
  ) {}

  async find(offset: number, pageSize: number) {
    let articles =  await this.ArticleRepository.find();
    let totalCount = articles.length
    let data = articles.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      articles: data
    }
  }

  async findOne (id: number) {
    let article =  await this.ArticleRepository.findOne({ id });
    return {
      code: 0,
      msg: 'find successed!',
      article
    }
  }

  async findWithFormatData (id, type) {
    let relations = []
    switch(type){
      case "separateWordsProperty": relations.push('sep_words_property')
      case "markEntity": relations.push('mark_entity')
      case 'emotion': relations.push('emotion')
      default: {}
    }
    let article = await this.ArticleRepository.findOne({
      where: { id },
      relations
    })
    return {
      code: 0,
      msg: 'find successed!',
      article
    }    
  }

  async create (args) {
    await insert('user', [
      { key: 'title', value: args.title },
      { key: 'text', value: args.text },
      { key: 'state', value: args.state },
    ])
    return {
      code: 0,
      msg: 'create successed!',
    }
  }

  async update (args) {
    let article = await this.ArticleRepository.findOne({ id: args.id })
    article.title = args.title
    article.text = args.text
    article.state = args.state
    article.contentType = args.contentType
    await this.ArticleRepository.save(article)
    return {
      code: 0,
      msg: 'update successed!',
      article
    }
  }

  async delete ( id: number ) {
    let article = await this.ArticleRepository.findOne({ id })
    await this.ArticleRepository.delete(article)
    return {
      code: 0,
      msg: 'delete successed!',
      article
    }
  }
}