export type Author = {
    name: string;
    number?: number;
    bio?: string;
    shop_name?: string;
    books?: string[];
  
}

export type ArrayDataAuthor = Array<[string, Author]>

export type DataAuthor = [string, Author]

export type SystemStateAuthor = {
    authors: ArrayDataAuthor
    author: string
    status: boolean
    authorId: string
    message? : string
}

export type CombinateStateApp = { author: SystemStateAuthor }
export type SystemAction = { type: string, payload: ArrayDataAuthor | boolean  | any }