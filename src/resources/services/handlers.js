/**
 * Imports
 */
import {Service} from './models';
import log from './logging';
import {ServiceSerializer} from './serializers';

/**
 * API handler for services service endpoint
 */
class ServicesHandler {

    /**
     * Process GET request
     * Return the Service's Service
     */
    static async get(request, reply) {

        // Only authenticated Admins can see Services that are not enabled
        let isAdmin = request.auth.credentials && request.auth.credentials.scope && request.auth.credentials.scope.indexOf('admin') !== -1;
        let enabled = !isAdmin;

        return reply({items: await Service.find({
            tags: request.query.tags ? request.query.tags.split(',') : null
        }, enabled)});
    }

    /**
     * Process POST request
     * Create a new Service
     */


    static async post(request, reply) {
        try {
            let service = await Service.create(request.payload);
            return reply(service).code(201);
        } catch (err) {
            if (err) {
                return reply(BadRequest.invalidParameters('payload', {[err.param]: [err.message]})).code(400);
            } else {
                log.error(err, 'Unable to create service');
                return reply().code(500);
            }
        }

    }
}

/**
 * API handler for Service ID endpoint
 */
class ServiceIdHandler {

    /**
     * Process GET request
     */
    static async get(request, reply) {
        let service = await Service.get(request.params.serviceId);
        // Note: Only authenticated Admins can see Services that are not enabled
        let isAdmin = request.auth.credentials && request.auth.credentials.scope && request.auth.credentials.scope.indexOf('admin') !== -1;
        if (service && (service.enabled === true || isAdmin)) {
            return reply(service);
        } else {
            return reply().code(404);
        }
    }

    /**
     * Process PUT request
     */
    static async put(request, reply) {

        // Check if service with given ID exists
        let service = await Service.get(request.params.serviceId);
        if (!service) {
            return reply().code(404);
        }

        // Update service
        service = await Service.update(request.params.serviceId, request.payload);
        return reply(service);
    }

    /**
     * Process DELETE request
     */
    static async delete(request, reply) {

        // Check if service with given ID exists
        let service = await Service.get(request.params.serviceId);
        if (!service) {
            return reply().code(404);
        }

        // delete the service
        try {
            service = await Service.del(request.params.serviceId, request.payload);
            return reply().code(201);
        } catch (err) {
            if (err.name === ErrorName.VALIDATION_ERROR) {
                return reply(BadRequest.invalidParameters('payload', {[err.param]: [err.message]})).code(400);
            } else {
                log.error(err, 'Unable to delete service');
                return reply().code(500);
            }
        }
    }

}

/**
 * Exports
 */
export {ServicesHandler, ServiceIdHandler};
