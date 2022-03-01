export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    permissionFlag?: number;
}
