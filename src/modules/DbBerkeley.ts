import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'db_berkeley';

export class DbBerkeley extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Causes db_berkeley module to re-read the contents of specified table (or dbenv). The db_berkeley DB actually loads each table on demand, as opposed to loading all at mod_init time. The bdb_reload operation is implemented as a close followed by a reopen. Note- bdb_reload will fail if a table has not been accessed before (because the close will fail).
     * @param params.table_path - to reload a particular table provide the tablename as the arguement; to reload all tables provide the db_path to the db files. The path can be found in opensipsc-cli config variable.
     */
    reload = (params: { table_path: string }) => this.execute('bdb_reload', params);
}

export default DbBerkeley;
