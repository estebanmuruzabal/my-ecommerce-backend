/**
 * Imports
 */
import {rethinkdb, Decorators as DBDecorators} from '../../core/db';
import {ValidationError} from '../../core/errors';

/**
 * Database tables
 */
const tables = {
    Copies: 'Copies'
};

/**
 * Content model
 */
class Copies {

    /**
     * Create a new content
     */
    @DBDecorators.table(tables.Copies)
    static async create({name, pagetype, description, files, copiesnum, phone}) {

      // Insert copie into database
      let obj = {
          name,
          pagetype,
          description,
          files: [],
          copiesnum: 0,
          phone,
          createdAt: new Date()
      };
      let insert = await this.table.insert(obj).run();

      // Get product object and return it
      return await this.table.get(insert.generated_keys[0]).run();
    }

    /**
     * Return content with given ID
     */
    @DBDecorators.table(tables.Copies)
    static async get(CopiesId) {
        return await this.table.get(CopiesId).run();
    }



    /**
     * Update copies
     */
    @DBDecorators.table(tables.Copies)
    static async update(copiesId, {pagetype, name, description, files, copiesnum, phone}) {
        let obj = {
            pagetype,
            name,
            description,
            files,
            copiesnum,
            phone,
            updatedAt: new Date()
        };

        await this.table.get(copiesId).update(obj).run();

        // Fetch copies's latest state and return.
        return await Copies.get(copiesId);
    }
}

export {tables, Copies};
