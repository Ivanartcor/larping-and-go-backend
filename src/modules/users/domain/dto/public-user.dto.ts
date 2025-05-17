export interface PublicUserDto {
    id: string;
    username: string;
    displayName?: string;
    avatarUrl?: string;          // alias a character.avatarUrl
    activeCharacter: {
        id: string;
        name: string;
        slug: string;
        avatarUrl?: string;
    } | null;
}
