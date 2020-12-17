
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateTodoInput {
    name: string;
    done?: boolean;
    user_id: string;
}

export class UpdateTodoInput {
    name?: string;
    done?: boolean;
}

export class UserInput {
    firstName?: string;
    lastName?: string;
    age?: number;
}

export abstract class IMutation {
    abstract createTodo(payload: CreateTodoInput): Todo | Promise<Todo>;

    abstract updateTodo(id: string, payload: UpdateTodoInput): Todo | Promise<Todo>;

    abstract deleteTodo(id: string): boolean | Promise<boolean>;

    abstract updateUser(id: string, payload: UserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract todo(id: string): Todo | Promise<Todo>;

    abstract todoList(): Todo[] | Promise<Todo[]>;

    abstract user(id: string): User | Promise<User>;

    abstract userList(): User[] | Promise<User[]>;
}

export class Todo {
    id: string;
    name: string;
    done?: boolean;
    user_id: string;
    user?: User;
}

export class User {
    id: string;
    firstName?: string;
    lastName?: string;
    age?: number;
    todoes?: Todo[];
}
