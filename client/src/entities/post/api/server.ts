import { $serverApi } from "@/shared/configs/axiosBase"
import { IPost } from "../interfaces/post"




export const getPosts = async ()=> {
    try {
        const data : {data: IPost[]} = await $serverApi.get('/posts')
        return data?.data
    } catch(e) {
        console.error(e)
    }
}