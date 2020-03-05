import * as winston from 'winston';

const winstonControllerLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  defaultMeta: { service: 'Controller logger' },
  transports: [
    new winston.transports.Console({ format: winston.format.json() })
  ]
});

export function ControllerLogger() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async (...args: any) => {
      try {
        await originalMethod.apply(this, args);
      } catch (e) {
        winstonControllerLogger.error('There is an error in service layer', {
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
