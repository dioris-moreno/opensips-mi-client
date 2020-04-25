import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'db_text';

export default class DbText extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Write back to hard drive modified tables.
     */
    dump = () => this.execute('dbt_dump');

    /**
     * Causes db_text module to reload cached tables from disk. Depending on parameters it could be a whole cache or a specified database or a single table. If any table cannot be reloaded from disk - the old version preserved and error reported.
     * @param params.db_name - (optional) database name to reload.
     * @param params.table_name - (optional) (cannot be present without the db_name parameter) - specific table to reload.
     */
    reload = (params?: { db_name?: string; table_name?: string }) => this.execute('dbt_reload', params);
}
