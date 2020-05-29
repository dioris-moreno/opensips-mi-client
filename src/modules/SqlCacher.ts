import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'sql_cacher';

export class SqlCacher extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Reloads the entire SQL table in cache in full caching mode. Reloads the given key or invalidates all the keys in cache in on demand mode.
     * @param params.id - the id of the caching entry.
     * @param [params.key] - the specific key to be reloaded, only makes sense in on demand mode.
     */
    cacherReload = (params: { id: string; key?: string }) => this.execute('sql_cacher_reload', params);
}

export default SqlCacher;
