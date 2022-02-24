import { Role } from "./role";
export class User {
    id: number;
    schoolId: number;
    schoolName:string;
    username: string;
    password: string;
    name: string;
    firstName: string;
    lastName: string;
    role: Role;
    token?: string;
    notification:number;
}