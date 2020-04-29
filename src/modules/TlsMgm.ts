import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'tls_mgm';

export class TlsMgm extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * List all domains information.
     */
    list = () => this.execute('tls_list');

    /**
     * Reloads the TLS domains information from the database. The previous DB defined domains are discarded but the script defined domains are preserved.
     */
    reload = () => this.execute('tls_reload');
}

export default TlsMgm;
