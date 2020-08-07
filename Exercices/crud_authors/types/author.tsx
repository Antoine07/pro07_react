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
    message?: string
}

export type CombinateStateApp = { author: SystemStateAuthor }

// TODO voir le type any lorsqu'on a pas de payload

export type SystemAction =
    | {
        type: "LOAD_DATA_AUTHORS",
        payload: ArrayDataAuthor
    }
    | {
        type: "SET_AUHTOR"
        payload: string
    }
    | {
        type: "MESSAGE"
        payload: { message: string, authorId: string }
    }