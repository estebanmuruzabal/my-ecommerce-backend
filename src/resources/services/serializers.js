/**
 * Imports
 */
import Joi from 'joi';

/**
 * Class containing schema details and serializer methods for service objects
 */
class ServiceSerializer {

    static schema = {
        enabled: Joi.boolean(),
        name: Joi.object({
            en: Joi.string(),
            es: Joi.string()
        }),
        description: Joi.object({
            en: Joi.string(),
            es: Joi.string()
        }),
        images: Joi.array({
            url: Joi.string()
        }),
        pricing: Joi.object({
            currency: Joi.string(),
            price: Joi.number().precision(2),
        }),
        metadata: Joi.object()
    };

    constructor(service) {
        this.service = Object.assign({}, service);
    }

    async serialize() {
        return this.service;
    }
}

/**
 * Exports
 */
export {ServiceSerializer};
