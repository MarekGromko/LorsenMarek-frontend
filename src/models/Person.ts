import { makeBuilder, makeCompare } from '../utils/utility';

export type Person = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    gender: string
};
export const personBuilder = makeBuilder<Person>(["id", "email", "firstName", "lastName", "email"]);
export const personCompare = makeCompare<Person>(["id", "email", "firstName", "lastName", "email"]);
