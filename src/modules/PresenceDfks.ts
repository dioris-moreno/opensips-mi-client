import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'presence_dfks';

export default class PresenceDfks extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Triggers the sending of NOTIFY messages containing a feature status update to all watchers.
     */
    setFeature = () => this.execute('dfks_set_feature');
}
