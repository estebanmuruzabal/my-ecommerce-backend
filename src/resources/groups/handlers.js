/**
 * Imports
 */
import {Group} from './models';
import log from './logging';

/**
 * API handler for groups group endpoint
 */
class GroupsHandler {

    /**
     * Process GET request
     * Return the Group's Group
     */
    static async get(request, reply) {
        return reply({items: await Group.find({
            tags: request.query.tags ? request.query.tags.split(',') : null
        })});
    }

    /**
     * Process POST request
     * Create a new Group
     */

    static async post(request, reply) {
        try {
            let group = await Group.create(request.payload);
            return reply(group).code(201);
        } catch (err) {
            if (err) {
                return reply(BadRequest.invalidParameters('payload', {[err.param]: [err.message]})).code(400);
            } else {
                log.error(err, 'Unable to create group');
                return reply().code(500);
            }
        }

    }
}

/**
 * API handler for Group ID endpoint
 */
class GroupIdHandler {

    /**
     * Process GET request
     */
    static async get(request, reply) {
        let group = await Group.get(request.params.groupId);

        if (group) {
            return reply(group);
        } else {
            return reply().code(404);
        }
    }

    /**
     * Process PUT request
     */
    static async put(request, reply) {

        // Check if group with given ID exists
        let group = await Group.get(request.params.groupId);
        if (!group) {
            return reply().code(404);
        }
        if (group.buyers.size == 18) {
            return reply(BadRequest.invalidParameters('payload', {'group.buyers': ['Max quontity of buyers reached']})).code(400);
        } else {
            group = await Group.update(request.params.groupId, request.payload);
            return reply(group);
        }
    }

    /**
     * Process DELETE request
     */
    static async delete(request, reply) {

        // Check if group with given ID exists
        let group = await Group.get(request.params.groupId);
        if (!group) {
            return reply().code(404);
        }

        // delete the group
        try {
            group = await Group.del(request.params.groupId, request.payload);
            return reply().code(201);
        } catch (err) {
            if (err.name === ErrorName.VALIDATION_ERROR) {
                return reply(BadRequest.invalidParameters('payload', {[err.param]: [err.message]})).code(400);
            } else {
                log.error(err, 'Unable to delete group');
                return reply().code(500);
            }
        }
    }

}

/**
 * Exports
 */
export {GroupsHandler, GroupIdHandler};
