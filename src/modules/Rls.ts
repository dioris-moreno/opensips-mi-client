import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'rls';

export default class Rls extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Triggers updating backend subscriptions after a resources-list or rls-services document has been updated.
     * @param params.presentity_uri - the uri of the user who made the change and whose subscriptions should be updated
     */
    updateSubscriptions = (params: { presentity_uri: string }) => this.execute('rls_update_subscriptions', params);
}
