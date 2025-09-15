import { isEquals } from '../utils/utilTypes';

export type Person = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    gender: string
};
interface PersonBuilder<T = never>{
    id(id: number): PersonBuilder<T | 'id'>;
    firstName(firstName: string): PersonBuilder<T | 'firstName'>;
    lastName(lastName: string): PersonBuilder<T | 'lastName'>;
    gender(gender: string): PersonBuilder<T | 'gender'>;
    email(email: string): PersonBuilder<T | 'email'>;
    build(): isEquals<T, keyof Person> extends true ? Person : Partial<Person>;
}
export const personBuilder = (): PersonBuilder=>{
    let _id,
        _firstName,
        _lastName,
        _email,
        _gender;
    return {
        id(id: number){ _id = id; return this},
        firstName(firstName: string){ _firstName = firstName; return this},
        lastName(lastName: string){ _lastName = lastName; return this},
        gender(gender: string){ _gender = gender; return this},
        email(email: string){ _email = email; return this},
        build(){ 
            return {
                id: _id!,
                firstName: _firstName!,
                lastName: _lastName!,
                email: _email!,
                gender: _gender!,
            };
        }
    } as unknown as PersonBuilder;;
}