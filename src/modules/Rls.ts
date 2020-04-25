import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'rls';

export default class Rls extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Triggers updating backend subscriptions after a resources-list or rls-services document has been updated.
     * @param params.undefined - undefined
     */
    updateSubscriptions = (params: { undefined: string }) => this.execute('rls_update_subscriptions', params);
}
