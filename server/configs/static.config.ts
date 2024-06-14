import { join } from "path";



const rootPath = process.cwd() 

export const staticConfig = {
    rootPath: join(rootPath,'files'),
    serveRoot: '/',  
    exclude: ['/api/(.*)'],
  }