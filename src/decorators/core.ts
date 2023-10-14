import { RouteDefinition } from "../common/interface.common";

/**
 * Controller decorator
 * @param prefix 
 * @returns 
 */
export function Controller(prefix: string = ''): ClassDecorator {
    return function(target: any) {
        Reflect.defineMetadata('prefix', prefix, target);

        if(!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
    }
}

/**
 * GET decorator
 * @param path 
 * @returns 
 */
export function Get(path: string = ''): any {
    return function (target: any, propertyKey: string) {
        
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;
        routes.push({
            requestMethod: 'get',
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    }
}


/**
 * Post decorator
 * @param path 
 * @returns 
 */
export function Post(path: string = ''): any {
    return function (target: any, propertyKey: string) {
        
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;
        routes.push({
            requestMethod: 'post',
            path,
            methodName: propertyKey
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    }
}

/**
 * Module decorator
 * @param payload 
 * @returns 
 */
export function Module(payload: {imports?: any, controllers?: any, providers?: any}): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata('module', payload, target);

        if(!Reflect.hasMetadata('routes', target)) {
            Reflect.defineMetadata('routes', [], target);
        }
    }
}