export interface AuthProvider<Token> {
  generate: (option: any) => Promise<Token>;
  validate: (token: string) => Promise<boolean>;
  token?: Token;
}
