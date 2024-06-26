/// <reference types="multer" />
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as UserPost } from './entities/post.entity';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(file: Express.Multer.File, body: any): Promise<any>;
    findAll(): Promise<UserPost[]>;
    findOne(id: string): string;
    update(id: string, updatePostDto: UpdatePostDto): string;
    remove(id: string): string;
}
