import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'proto_wss';

export default class ProtoWss extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     *
     * @param params.trace_mode - (optional) Possible values: on / off
     */
    trace = (params?: { trace_mode?: string }) => this.execute('wss_trace', params);
}
