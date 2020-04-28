import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'userblacklist';

export class Userblacklist extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Reload the internal global blacklist cache. This is necessary after the database tables for the global blacklist have been changed.
     */
    blacklist = () => this.execute('reload_blacklist');
}

export default Userblacklist;
