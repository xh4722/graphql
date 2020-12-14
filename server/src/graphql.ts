
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class UserInput {
    firstName?: string;
    lastName?: string;
    age?: number;
}

export abstract class IMutation {
    abstract updateUser(id: string, payload: UserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract todo(id: string): Todo | Promise<Todo>;

    abstract user(id: string): User | Promise<User>;
}

export class Todo {
    id: string;
    name: string;
    done?: boolean;
}

export class User {
    id: string;
    firstName?: string;
    lastName?: string;
    age?: number;
    todoes?: Todo[];
}
