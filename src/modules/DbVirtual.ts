import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'db_virtual';

export class DbVirtual extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Return information about global state of the real dbs.
     */
    get = () => this.execute('db_get');

    /**
     * Sets the permissions for real dbs access per set per db.
     * @param params.set_index - index of the set, index 0 corresponds to set number 1
     * @param params.db_url_index - index of the URL of the set, index 0 corresponds to the first URL
     * @param params.may_use_db_flag - 1 or 0: allow or deny processes to use that URL
     * @param params.db_max_consec_retrys - (optional) 1 or 0: suppress or not db_max_consec_retrys
     */
    set = (params: {
        set_index: number;
        db_url_index: number;
        may_use_db_flag: number;
        db_max_consec_retrys?: number;
    }) => this.execute('db_set', params);
}

export default DbVirtual;
