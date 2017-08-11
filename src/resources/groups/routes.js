/**
 * Imports
 */
import Joi from 'joi';

// API endpoint handlers
import {
    GroupsHandler,
    GroupIdHandler
} from './handlers';

/**
 * Routes
 */
export default [
    {
        path: '',
        method: 'GET',
        config: {
            handler: {async: GroupsHandler.get},
            auth: {
                mode: 'try',
                strategy: 'jwt'
            },
            description: 'Get all the groups',
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
            handler: {async: GroupsHandler.post},
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            description: 'Create new group',
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
        path: '/{groupId}',
        method: 'GET',
        config: {
            handler: {async: GroupIdHandler.get},
            auth: {
                mode: 'try',
                strategy: 'jwt'
            },
            description: 'Get group',
            notes: 'Returns a group by the id passed in the path',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().optional()
                }).unknown(),
                params: {
                    groupId: Joi.string().required().description('the id for the group'),
                }
            }
        }
    },
    {
        path: '/{groupId}',
        method: 'DELETE',
        config: {
            handler: {async: GroupIdHandler.delete},
            auth: {
                mode: 'try',
                strategy: 'jwt'
            },
            description: 'Delete group',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().optional()
                }).unknown(),
                params: {
                    groupId: Joi.string().required().description('the id for the group'),
                }
            }
        }
    },
    {
        path: '/{groupId}',
        method: 'PUT',
        config: {
            handler: {async: GroupIdHandler.put},
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            description: 'Update group',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
                params: {
                    groupId: Joi.string().required().description('the id for the group'),
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
