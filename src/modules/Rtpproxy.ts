import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'rtpproxy';

export default class Rtpproxy extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Enables/Disables a rtp proxy.
     * @param params.url - the rtp proxy url (exactly as defined in the config file).
     * @param params.setid - (optional) the rtpproxy set ID (used for better indentification of the rtpproxy instance to be enabled, for example when a rtpproxy is used in multiple sets).
     * @param params.enable - 1 - enable, 0 - disable. the config file).
     */
    enable = (params: { url: string; setid?: number; enable: number }) => this.execute('rtpproxy_enable', params);

    /**
     * Displays all the rtp proxies and their information: set and status (disabled or not, weight and recheck_ticks).
     */
    show = () => this.execute('rtpproxy_show');

    /**
     * Reload rtp proxies sets from database. The function will delete all previous records and populate the list with the entries from the database table. The db_url parameter must be set if you want to use this command.
     */
    reload = () => this.execute('rtpproxy_reload');
}
