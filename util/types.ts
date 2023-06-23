//import { DefaultUser } from "next-auth/core/types"

// Interface to defining our object of response functions
export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
    FIND?: Function
    PUTROLE?: Function
}

export interface User {
    _id?: number
    name: String,
    email: String,
    password: String,
    profilePhoto?: String | undefined,
    created: Number
}

export interface ProjectRecord {
    _id?: number,
    name: String,
    text: String,
}

/*declare module 'next-auth' {
    interface Session {
        user?: DefaultUser & {
            id: string;
            role: String[] | String,
            userData: User;
        };
    }
}*/

declare module 'styled-components' {
    interface DefaultTheme {
        body: string,
        text: string
        name: string
    }
}