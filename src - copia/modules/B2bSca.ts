import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'b2b_sca';

export default class B2bSca extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * It lists the appearances belonging to a shared line/call.
     */
    list = () => this.execute('sca_list');
}
