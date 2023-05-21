export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: 'test' | 'dev' | 'prod';
      USER: 'correoapi7@correo.com';
      PASS: 'API**ipa07';
    }
  }
}
