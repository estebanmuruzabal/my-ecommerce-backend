/**
 * Imports
 */
import Joi from 'joi';

// API endpoint handlers
import {
    ServicesHandler,
    ServiceIdHandler
} from './handlers';

/**
 * Routes
 */
export default [
    {
        path: '',
        method: 'GET',
        config: {
            handler: {async: ServicesHandler.get},
            auth: {
                mode: 'try',
                strategy: 'jwt'
            },
            description: 'Get all the services',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().optional()
                }).unknown(),
                query: {
                    tags: Joi.string().optional()
                }
            }
        }
    },
    {
        path: '',
        method: 'POST',
        config: {
            handler: {async: ServicesHandler.post},
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            description: 'Create new service',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
                payload: {
                    name: Joi.object().required(),
                    tags: Joi.array().optional()
                }
            },
            response: {
                schema: {
                    id: Joi.string(),
                    name: Joi.object(),
                    tags: Joi.array()
                }
            }
        }
    },
    {
        path: '/{serviceId}',
        method: 'GET',
        config: {
            handler: {async: ServiceIdHandler.get},
            auth: {
                mode: 'try',
                strategy: 'jwt'
            },
            description: 'Get service',
            notes: 'Returns a service by the id passed in the path',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().optional()
                }).unknown(),
                params: {
                    serviceId: Joi.string().required().description('the id for the service'),
                }
            }
        }
    },
    {
        path: '/{serviceId}',
        method: 'DELETE',
        config: {
            handler: {async: ServiceIdHandler.delete},
            auth: {
                mode: 'try',
                strategy: 'jwt'
            },
            description: 'Delete service',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().optional()
                }).unknown(),
                params: {
                    serviceId: Joi.string().required().description('the id for the service'),
                }
            }
        }
    },
    {
        path: '/{serviceId}',
        method: 'PUT',
        config: {
            handler: {async: ServiceIdHandler.put},
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            description: 'Update service',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
                params: {
                    serviceId: Joi.string().required().description('the id for the service'),
                },
                payload: {
                    enabled: Joi.boolean().required(),
                    name: Joi.object({
                        en: Joi.string().required(),
                        es: Joi.string().required()
                    }).required(),
                    description: Joi.object({
                        en: Joi.string().required(),
                        es: Joi.string().required()
                    }).required(),
                    images: Joi.array({
                        url: Joi.string().required()
                    }).required(),
                    pricing: Joi.object({
                        currency: Joi.string().required(),
                        usdprice: Joi.number().precision(2).required(),
                        arsprice: Joi.number().precision(2).required()
                    }).required(),
                    tags: Joi.array().required(),
                    metadata: Joi.object().required()
                }
            }
        }
    }
];
