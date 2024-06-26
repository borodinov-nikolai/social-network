import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DbService } from 'src/db/db.service';
export declare class PostsService {
    private readonly db;
    constructor(db: DbService);
    create(data: CreatePostDto): Promise<any>;
    findAll(): Promise<({
        user: {
            id: number;
            login: string;
        };
    } & {
        id: number;
        title: string;
        image: string;
        text: string;
        date: Date;
        userId: number;
    })[]>;
    findOne(id: number): string;
    update(id: number, updatePostDto: UpdatePostDto): string;
    remove(id: number): string;
}
