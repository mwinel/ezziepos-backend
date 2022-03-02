import mongoose from 'mongoose';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto, PatchUserDto } from '../../dtos';
import { UserDoc } from './user.interface';
import { userSchema } from './user.schema';
import { PermissionFlag } from '../../common/middlewares/permissionflag.enum';

const scryptAsync = promisify(scrypt);

class UserModel {
    User = mongoose.model<UserDoc & mongoose.Document>('User', userSchema);

    async create(userFields: CreateUserDto) {
        const user = new this.User({
            ...userFields,
        });
        await user.save();
        return user;
    }

    async getAll(limit = 25, page = 0) {
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async getById(id: string) {
        return this.User.findById(id).exec();
    }

    async getByEmail(email: string) {
        return this.User.findOne({ email: email }).exec();
    }

    async getByEmailWithPassword(email: string) {
        return this.User.findOne({ email: email })
            .select('_id email permissionFlag +password')
            .exec();
    }

    async updateById(id: string, userFields: PatchUserDto | any) {
        const existingUser = await this.User.findOneAndUpdate(
            { _id: id },
            { $set: userFields },
            { new: true }
        ).exec();

        return existingUser;
    }

    async deleteById(id: string) {
        return this.User.deleteOne({ _id: id }).exec();
    }

    // Hash user password.
    async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buffer.toString('hex')}.${salt}`;
    }

    // Compare passwords.
    async compare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = await storedPassword.split('.');
        const buffer = (await scryptAsync(
            suppliedPassword,
            salt,
            64
        )) as Buffer;
        return buffer.toString('hex') === hashedPassword;
    }
}

export default new UserModel();
