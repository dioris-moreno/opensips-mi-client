import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'cpl_c';

export default class CplC extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * For the given user, loads the XML cpl file, compiles it into binary format and stores both format into database.
     * @param params.username - undefined
     * @param params.cpl_filename - undefined
     */
    load = (params: { username: string; cpl_filename: string }) => this.execute('LOAD_CPL', params);

    /**
     * For the given user, removes the entire database record (XML cpl and binary cpl); user with empty cpl scripts are not accepted.
     * @param params.username - undefined
     */
    remove = (params: { username: string }) => this.execute('REMOVE_CPL', params);

    /**
     * For the given user, returns the CPL script in XML format.
     * @param params.username - undefined
     */
    get = (params: { username: string }) => this.execute('GET_CPL', params);
}
