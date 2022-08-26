export class User {
  constructor(private readonly _email: string, private readonly _name: string) {}

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  public async setPassword(password: string) {}
}
