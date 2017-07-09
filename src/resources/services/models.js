/**
 * Imports
 */
 import config from '../../config';
import {rethinkdb, Decorators as DBDecorators} from '../../core/db';

/**
 * Database tables
 */
const tables = {
    Service: 'Services'
};

/**
 * Service model
 */
class Service {

    /**
     * Create a new Service
     */
    @DBDecorators.table(tables.Service)
    static async create({name, tags}) {

        // Insert Service into database
        let obj = {
            name,
            tags,
            description: {},
            images: [],
            pricing: {
                currency: config.app.defaultCurrency,
                usdprice: 0,
                arsprice: 0
            },
            enabled: false,
            metadata: {},
            createdAt: new Date()
        };
        let insert = await this.table.insert(obj).run();

        // Get Service object and return it
        return await this.table.get(insert.generated_keys[0]).run();
    }

    /**
     * Return Services Service
     */
    @DBDecorators.table(tables.Service)
    static async find({tags=null}, enabled) {

        // Build query
        let query = this.table.filter((enabled === true) ? {enabled: true} : {});

        // Default sorting: alphabetically
        query = query.orderBy(rethinkdb.asc('name'));

        // Filter by those that contain given tags
        if (tags) {
            query = query.filter(function (service) {
                return service('tags').contains(...tags);
            });
        }

        // Execute query and return
        return await query.run();
    }

    /**
     * Return Service with given ID
     */
    @DBDecorators.table(tables.Service)
    static async get(serviceId) {
        return await this.table.get(serviceId).run();
    }

    /**
     * Delete Service
     */
    @DBDecorators.table(tables.Service)
    static async del(serviceId) {

        // Update Service
        await this.table.get(serviceId).delete().run();

        // Fetch Service's latest state and return.
        return await Service.get(serviceId);
    }

    /**
     * Update service images
     * @param serviceId - the service unique ID
     * @param images - an array of image objects (that contain URL and other info)
     * @returns the saved service object
     */
    @DBDecorators.table(tables.Service)
    static async updateImages(serviceId, images) {

        // Update Service
        await this.table.get(serviceId).update({images, updatedAt: new Date()}).run();

        // Fetch service's latest state and return.
        return await Service.get(serviceId);
    }

    /**
     * Update Service
     */
    @DBDecorators.table(tables.Service)
    static async update(serviceId, {enabled, name, description=null, images, pricing, tags, metadata}) {
        let obj = {
            enabled,
            name,
            description,
            images,
            pricing,
            tags,
            metadata,
            updatedAt: new Date()
        };
        if (description != null) {
            obj.description = description;
        }

        // Update Service
        await this.table.get(serviceId).update(obj).run();

        // Fetch Service's latest state and return.
        return await Service.get(serviceId);
    }
}

/**
 * Export
 */
export {tables, Service};
