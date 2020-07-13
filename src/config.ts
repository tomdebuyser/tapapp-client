export type Environment = 'local' | 'development' | 'test' | 'staging' | 'production';

const nodeEnv = process.env.NODE_ENV;
function assertNodeEnv(env: string | undefined): asserts env {
  if (!env) {
    throw Error('NODE ENV must be specified');
  }
}

assertNodeEnv(nodeEnv);

export class Config {
  static get apiHost(): string {
    return process.env.REACT_APP_API_HOST as string;
  }

  static get brandName(): string {
    return process.env.REACT_APP_BRAND_NAME as string;
  }

  static get environment(): Environment {
    return nodeEnv as Environment;
  }

  static get sentryDsn(): string {
    return process.env.REACT_APP_SENTRY_DSN as string;
  }

  static get payconiqLimit(): number {
    return parseInt(process.env.REACT_APP_PAYCONIQ_LIMIT as string, 10);
  }
}
