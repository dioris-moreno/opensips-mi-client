import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'rtpengine';

export default class Rtpengine extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Enables/disables an RTP proxy.
     * @param params.url - the RTP proxy url (exactly as defined in the config file).
     * @param params.enable - 1 - enable, 0 - disable the RTP proxy.
     */
    enable = (params: { url: string; enable: number }) => this.execute('rtpengine_enable', params);

    /**
     * Displays all the RTP proxies and their information: set and status (disabled or not, weight and recheck_ticks).
     */
    show = () => this.execute('rtpengine_show');

    /**
     * Reloads all rtpengine sets from the database. Used only when the db_url parameter is set.
     */
    reload = () => this.execute('rtpengine_reload');

    /**
     * Terminates the SIP dialog by the SIP Call-ID given as parameter.
     * @param params.callid - SIP Call-ID.
     */
    teardown = (params: { callid: string }) => this.execute('teardown', params);
}
