import * as winston from 'winston';

export const uncaughtExceptionLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  defaultMeta: { service: 'Application uncaught exception logger' },
  transports: [
    new winston.transports.Console({
      format: winston.format.json()
    })
  ]
});

export const uncaughtRejectionLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  defaultMeta: { service: 'Application uncaught rejection logger' },
  transports: [
    new winston.transports.Console({
      format: winston.format.json()
    })
  ]
});

const winstonControllerLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  defaultMeta: { service: 'Controller logger' },
  transports: [
    new winston.transports.Console({
      consoleWarnLevels: ['error', 'warn'],
      format: winston.format.json()
    })
  ]
});

export function ControllerLogger() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async (...args: any) => {
      try {
        await originalMethod.apply(this, args);
      } catch (e) {
        winstonControllerLogger.error('There is an error in controller', {
          methodName: propertyKey,
          arguments: args,
          errorMessage: e.message
        });
        throw Error(e);
      }
    };

    return descriptor;
  };
}
