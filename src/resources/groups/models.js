/**
 * Imports
 */
 import config from '../../config';
import {rethinkdb, Decorators as DBDecorators} from '../../core/db';

/**
 * Database tables
 */
const tables = {
    Group: 'Groups'
};

/**
 * Group model
 */
class Group {

    /**
     * Create a new Group
     */
    @DBDecorators.table(tables.Group)
    static async create({name, tags}) {

        let obj = {
            name,
            buyers: [],
            tags,
            updatedAt: new Date()
        };

        let insert = await this.table.insert(obj).run();

        // Get Group object and return it
        return await this.table.get(insert.generated_keys[0]).run();
    }


    @DBDecorators.table(tables.Group)
    static async find({tags=null}) {
        let enabled = false
        // Build query
        let query = this.table.filter((enabled === true) ? {enabled: true} : {});

        // Default sorting: alphabetically
        query = query.orderBy(rethinkdb.asc('name'));

        // Filter by those that contain given tags
        if (tags) {
            query = query.filter(function (groups) {
                return groups('tags').contains(...tags);
            });
        }

        // Execute query and return
        return await query.run();
    }


    /**
     * Return Group with given ID
     */
    @DBDecorators.table(tables.Group)
    static async get(groupId) {
        return await this.table.get(groupId).run();
    }

    /**
     * Delete Group
     */
    @DBDecorators.table(tables.Group)
    static async del(groupId) {

        // Update Group
        await this.table.get(groupId).delete().run();

        // Fetch Group's latest state and return.
        return await Group.get(groupId);
    }

    /**
     * Update Group images
     * @param groupId - the group unique ID
     * @param images - an array of image objects (that contain URL and other info)
     * @returns the saved group object
     */
    @DBDecorators.table(tables.Group)
    static async updateImages(groupId, images) {

        // Update Group
        await this.table.get(groupId).update({images, updatedAt: new Date()}).run();

        // Fetch group's latest state and return.
        return await Group.get(groupId);
    }

    /**
     * Update Group
     */
    @DBDecorators.table(tables.Group)
    static async update(groupId, { name, description=null, buyers, pricing, tags, metadata}) {
        let obj = {
            enabled,
            name,
            description,
            buyers,
            pricing,
            tags,
            metadata,
            updatedAt: new Date()
        };
        if (description != null) {
            obj.description = description;
        }

        // Update Group
        await this.table.get(groupId).update(obj).run();

        // Fetch Group's latest state and return.
        return await Group.get(groupId);
    }
}

/**
 * Export
 */
export {tables, Group};
