import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'cachedb_local';

export class CachedbLocal extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Removes all local cache entries that match the provided glob param.
     * @param [params.collection] - collection from which the keys shall be removed; if no collection set, the default collection will be used;
     * @param params.glob - keys that match glob will be removed
     */
    removeChunk = (params: { collection?: string; glob: string }) => this.execute('cache_remove_chunk', params);
}

export default CachedbLocal;
