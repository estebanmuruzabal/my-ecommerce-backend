/**
 * Imports
 */
import Joi from 'joi';

/**
 * Class containing schema details and serializer methods for Group objects
 */
class GroupSerializer {

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

    constructor(group) {
        this.group = Object.assign({}, group);
    }

    async serialize() {
        return this.group;
    }
}

/**
 * Exports
 */
export {GroupSerializer};
