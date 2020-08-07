export interface Author {
    "number": number;
    'name': string;
    "bio": string;
    "shop_name": string;
    "books": string[];
}

export type ArrayDataAuthor = Array<[string, Author]>

export type LoadData = { type: string, payload: ArrayDataAuthor }

export type DataAuthor = [string, Author]

export interface SystemState {
    authors: ArrayDataAuthor
    status: boolean
}

export interface SystemAction {
    type: string 
    payload?: ArrayDataAuthor | Author | boolean
}