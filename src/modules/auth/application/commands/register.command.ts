export class RegisterCommand {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly username: string,
    public readonly displayName?: string,
  ) {}
}