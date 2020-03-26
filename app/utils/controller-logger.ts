import { winstonControllerLogger } from './logger';

export function ControllerLogger() {
  return (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor => {
    const originalMethod: any = descriptor.value;
    descriptor.value = async (...args: any): Promise<void> => {
      try {
        await originalMethod.apply(this, args);
      } catch (e) {
        winstonControllerLogger.error('There is an error in controller', {
          methodName: propertyKey,
          arguments: args,
          errorMessage: e.message
        });
      }
    };

    return descriptor;
  };
}
