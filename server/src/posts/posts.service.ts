import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class PostsService {
  constructor(private readonly db: DbService){}

  async create(data: CreatePostDto) {
    const date = new Date()
      await this.db.post.create({
       data: {
        ...data,
        date
       }
      })
    return null
  }

  async findAll() {
    return await this.db.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            login: true
          }
        }
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
