import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'sql_cacher';

export default class SqlCacher extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Reloads the entire SQL table in cache in mode.
     * @param params.id - the caching entry's id
     * @param params.key - (optional) - the specific key to be reloaded, only makes sense in mode.
     */
    cacherReload = (params: { id: string; key?: string }) => this.execute('sql_cacher_reload', params);
}
