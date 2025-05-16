export class Email {
  private constructor(private readonly value: string) {}

  /** Lanza Error si formato inválido */
  static create(raw: string): Email {
    const email = raw.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      throw new Error('Invalid email format');
    return new Email(email);
  }
  toString() { return this.value; }
  equals(other: Email) { return other.value === this.value; }
}
