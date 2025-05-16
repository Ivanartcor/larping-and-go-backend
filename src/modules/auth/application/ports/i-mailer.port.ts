/**
 * Enviador de e-mails desde la capa de aplicación.
 */
export interface IMailerPort {
  sendPasswordReset(to: string, resetLink: string): Promise<void>;
  // en el futuro: sendEmailVerification, sendInvite, etc.
}
