import { AuthProvider } from "#types/auth_provider";

export interface AuthOption<Token, User> {
  providerName: string;
  generator: (option: User) => Promise<Token>;
  validator: (option: string) => Promise<boolean>;
}

export interface AuthFunction {
  addProvider: <Token, User>(option: AuthOption<Token, User>) => void;
  get: (providerName: string) => AuthProvider<any>;
  validate: (providerName: string, token: string) => Promise<boolean>;
}

export default function auth(): AuthFunction {
  const provider: {
    [name: string]: AuthProvider<any>;
  } = {};

  const addProvider = <Token, User>({
    providerName,
    generator,
    validator,
  }: AuthOption<Token, User>) => {
    provider[providerName] = { generate: generator, validate: validator };
  };

  const get = (providerName: keyof typeof provider) =>
    provider[providerName].token;

  const validate = (providerName: keyof typeof provider, token: string) =>
    provider[providerName].validate(token);

  return {
    addProvider,
    get,
    validate,
  };
}
