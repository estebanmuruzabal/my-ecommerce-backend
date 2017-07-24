/**
 * Imports
 */
import Joi from 'joi';

// API endpoint handlers
import {
    CopiesHandler,
    CopiesIdHandler
} from './handlers';

/**
 * Routes
 */
export default [
    {
        path: '',
        method: 'GET',
        config: {
            handler: {async: CopiesHandler.get},
            auth: {
                mode: 'try',
                strategy: 'jwt'
            },
            description: 'Get all the Copies',
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
            handler: {async: CopiesHandler.post},
            auth: {
                mode: 'try',
                strategy: 'jwt'
            },
            description: 'Create new Copies',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().optional()
                }).unknown(),
                payload: {
                    name: Joi.string().optional(),
                    pagetype: Joi.string().optional(),
                    description: Joi.string().optional(),
                    files: Joi.array({
                        url: Joi.string().optional()
                    }).optional(),
                    copiesnum: Joi.string().optional(),
                    phone: Joi.string().min(1).required()
                }
            }
        }
    },
    {
        path: '/{copiesId}',
        method: 'GET',
        config: {
            handler: {async: CopiesIdHandler.get},
            auth: {
                mode: 'try',
                strategy: 'jwt'
            },
            description: 'Get Copies',
            notes: 'Returns a Copies by the id passed in the path',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().optional()
                }).unknown(),
                params: {
                    copiesId: Joi.string().required().description('the id for the Copies'),
                }
            }
        }
    },
    {
        path: '/{copiesId}',
        method: 'DELETE',
        config: {
            handler: {async: CopiesIdHandler.delete},
            auth: {
                mode: 'try',
                strategy: 'jwt'
            },
            description: 'Delete Copies',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().optional()
                }).unknown(),
                params: {
                    copiesId: Joi.string().required().description('the id for the Copies'),
                }
            }
        }
    },
    {
        path: '/{copiesId}',
        method: 'PUT',
        config: {
            handler: {async: CopiesIdHandler.put},
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            description: 'Update Copies',
            tags: ['api'],
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown(),
                params: {
                    copiesId: Joi.string().required().description('the id for the Copies'),
                },
                payload: {
                    pagetype: Joi.string().required(),
                    name: Joi.string().required(),
                    description: Joi.string().optional(),
                    files: Joi.array({
                        url: Joi.string().required()
                    }).required(),
                    copiesnum: Joi.string().optional()
                }
            }
        }
    }
];
