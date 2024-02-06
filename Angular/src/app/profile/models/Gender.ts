export enum Gender {
    Male, Female, Other
}

export function getGenderString(gender: Gender) {
    switch (gender) {
        case Gender.Male: return "male";
        case Gender.Female: return "female";
        case Gender.Other: return "other";
        default: return "unknown";
    }
}