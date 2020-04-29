import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'uac_registrant';

export class UacRegistrant extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Lists the registrant records and their status.
     */
    list = () => this.execute('reg_list');

    /**
     * Reloads the registrant records from the database.
     */
    reload = () => this.execute('reg_reload');
}

export default UacRegistrant;
