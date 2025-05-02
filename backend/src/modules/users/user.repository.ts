import { type UserModel } from "~/modules/users/user.model.js";

class UserRepository {
  private userModel: typeof UserModel;

  public constructor(userModel: typeof UserModel) {
    this.userModel = userModel;
  }

  public async create(entity: any): Promise<any> {
    const { email, passwordHash, passwordSalt } = entity;
    console.log(entity);

    return this.userModel
        .query()
        .insert({
          email,
          password_hash: passwordHash,
          password_salt: passwordSalt,
        })
        .returning("*");
  }

  public async find(id: number): Promise<null | any> {
    return this.userModel
        .query()
        .findById(id)
  }

  public async findByEmail(email: string): Promise<null | any> {
    return this.userModel
        .query()
        .findOne({email})
  }
}

export { UserRepository };