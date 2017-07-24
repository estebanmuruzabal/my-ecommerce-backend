/**
 * Imports
 */
import {Copies} from './models';
import log from './logging';
/**
 * API handler for copies endpoint
 */
class CopiesHandler {

    /**
     * Process GET request
     * Return the copies
     */
    static async get(request, reply) {

        // Only authenticated Admins can see copies that are not enabled
        let isAdmin = request.auth.credentials && request.auth.credentials.scope && request.auth.credentials.scope.indexOf('admin') !== -1;
        let enabled = !isAdmin;

        return reply({items: await Copies.find()});
    }

    /**
     * Process POST request
     * Create a new copies
     */
     static async post(request, reply) {
         try {
             let copies = await Copies.create(request.payload);
             return reply(copies).code(201);
         } catch (err) {
             if (err.name === ErrorName.VALIDATION_ERROR) {
                 return reply(BadRequest.invalidParameters('payload', {[err.param]: [err.message]})).code(400);
             } else {
                 log.error(err, 'Unable to create new copies');
                 return reply().code(500);
             }
         }
     }

}

/**
 * API handler for copies ID endpoint
 */
class CopiesIdHandler {

    /**
     * Process GET request
     */
    static async get(request, reply) {
        let copies = await Copies.get(request.params.copiesId);
        // Note: Only authenticated Admins can see copies that are not enabled
        let isAdmin = request.auth.credentials && request.auth.credentials.scope && request.auth.credentials.scope.indexOf('admin') !== -1;
        if (copies && isAdmin) {
            return reply(copies);
        } else {
            return reply().code(404);
        }
    }

    /**
     * Process PUT request
     */
    static async put(request, reply) {

        // Check if copies with given ID exists
        let copies = await Copies.get(request.params.copiesId);
        if (!copies) {
            return reply().code(404);
        }

        // Update copies
        copies = await Copies.update(request.params.copiesId, request.payload);
        return reply(copies);
    }

    /**
     * Process DELETE request
     */
    static async delete(request, reply) {

        // Check if copies with given ID exists
        let copies = await Copies.get(request.params.copiesId);
        if (!copies) {
            return reply().code(404);
        }

        // delete the copies
        try {
            copies = await Copies.del(request.params.copiesId, request.payload);
            return reply().code(201);
        } catch (err) {
            if (err.name === ErrorName.VALIDATION_ERROR) {
                return reply(BadRequest.invalidParameters('payload', {[err.param]: [err.message]})).code(400);
            } else {
                log.error(err, 'Unable to delete copies');
                return reply().code(500);
            }
        }
    }

}

/**
 * Exports
 */
export {CopiesHandler, CopiesIdHandler};
