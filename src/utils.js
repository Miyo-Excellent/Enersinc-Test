// Available environments
const environments = ['development', 'production'];

export function getEnvironment(env = false) {
  const environment = env || process.env.NODE_ENV;

  return isEnvironment(environment) ? environment : 'production';
}

export function isDevelopment() {
  return getEnvironment() === 'development';
}

export function isEnvironment(env) {
  return environments.indexOf(env) !== -1;
}

export function isProduction() {
  return getEnvironment() === 'production';
}
