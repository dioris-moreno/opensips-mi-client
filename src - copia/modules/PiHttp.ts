import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'pi_http';

export default class PiHttp extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Reloads the layout of the provisioning interface from the framework file.
     */
    reloadTblsAndCmds = () => this.execute('pi_reload_tbls_and_cmds');
}
