import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'presence';

export default class Presence extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Triggers sending Notify messages to watchers if a change in watchers authorization or in published state occurred.
     * @param params.presentity_uri - the uri of the user who made the change and whose watchers should be informed
     * @param params.event - the event package
     * @param params.refresh_type - it distinguishes between the two different types of events that can trigger a refresh: a change in watchers authentication: refresh type=0; a statical update in published state (either through direct update in db table or by modifying the pidf manipulation document, if pidf_manipulation parameter is set): refresh_type!= 0.
     */
    refreshWatchers = (params: { presentity_uri: string; event: string; refresh_type: number }) =>
        this.execute('refresh_watchers', params);

    /**
     * Manually triggers the cleanup functions for watchers and presentity tables. Useful if you have set to zero or less.
     */
    cleanup = () => this.execute('cleanup');

    /**
     * Lists all the presentity records.
     */
    presentityList = () => this.execute('pres_phtable_list');

    /**
     * Lists all the subscription records, or the subscriptions for which the "To" and "From" URIs match the given parameters.
     * @param params.from - (optional) wildcard for "From" URI
     * @param params.to - (optional) wildcard for "To" URI
     */
    subscriptionList = (params?: { from?: string; to?: string }) => this.execute('subs_phtable_list', params);

    /**
     * Exposes in the script, by rasing an event, all the presentities of a specific event that match a specified filter.
     * @param params.event - the desired presence event.
     * @param params.filter - (optional) a regular expression (REGEXP) used for filtering the presentities for that event. Only the presentities that match will be exposed. If not specified, all presentities for that event are exposed.
     */
    expose = (params: { event: string; filter?: string }) => this.execute('pres_expose', params);
}
