import { Container } from 'typedi';
import { Logger as WinstonLogger } from '../lib/logger';

// Define Constructable type for a class
type Constructable<T = any> = new (...args: any[]) => T;

export function Logger(scope: string): ParameterDecorator {
    return (target: any, propertyKey: string | symbol, index: number): void => {
        const logger = new WinstonLogger(scope);
        const propertyName = propertyKey ? propertyKey.toString() : '';

        // Type target as a Constructable (class constructor)
        Container.registerHandler({
            object: target as Constructable,  // Assert target as a class constructor
            propertyName,
            index,
            value: () => logger,
        });
    };
}

export { LoggerInterface } from '../lib/logger';
