import { Gender } from "./Gender"

export type User = {
    id: number,
    firstName: string,
    lastName: string,
    email?: string,
    birthDate?: Date,
    nationality?: string
    gender?: Gender
}
