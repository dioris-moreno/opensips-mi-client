import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'db_virtual';

export default class DbVirtual extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Return information about global state of the real dbs.
     */
    get = () => this.execute('db_get');

    /**
     * Sets the permissions for real dbs access per set per db.
     * @param params.set_index - undefined
     * @param params.db_url_index - undefined
     * @param params.may_use_db_flag - undefined
     * @param params.ignore_retries - undefined
     */
    set = (params: { set_index: number; db_url_index: number; may_use_db_flag: boolean; ignore_retries?: boolean }) =>
        this.execute('db_set', params);
}
