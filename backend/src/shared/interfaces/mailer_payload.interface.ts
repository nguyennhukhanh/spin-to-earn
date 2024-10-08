export interface IMailerPayload<T = any> {
  to: string;
  subject?: string;
  data: T;
}
