export type LoginPayload = {
    username: string;
    password: string;
} 

export type LoginResponse = {
    tokenType: string;
    accessToken: string;
}