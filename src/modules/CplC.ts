import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'cpl_c';

export class Cplc extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * For the given user, loads the XML cpl file, compiles it into binary format and stores both format into database.
     * @param params.username - name of the user
     * @param params.cpl_filename - file name
     */
    load = (params: { username: string; cpl_filename: string }) => this.execute('LOAD_CPL', params);

    /**
     * For the given user, removes the entire database record (XML cpl and binary cpl); user with empty cpl scripts are not accepted.
     * @param params.username - name of the user
     */
    remove = (params: { username: string }) => this.execute('REMOVE_CPL', params);

    /**
     * For the given user, returns the CPL script in XML format.
     * @param params.username - name of the user
     */
    get = (params: { username: string }) => this.execute('GET_CPL', params);
}

export default Cplc;
