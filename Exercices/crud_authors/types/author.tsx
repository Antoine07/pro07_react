import { Reducer, CombinedState } from "redux"

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

export interface SystemStateAuthor {
    authors: ArrayDataAuthor
    status: boolean
    authorId : string
}

export interface SystemAction {
    type: string 
    payload: ArrayDataAuthor
}

export type CombinateStateApp = { author : SystemStateAuthor }

export type RootReducer = Reducer<CombinedState<CombinateStateApp>, SystemAction >