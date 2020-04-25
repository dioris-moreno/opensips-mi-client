import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'proto_ws';

export default class ProtoWs extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     *
     * @param params.trace_mode - (optional) set ws tracing on and off. This parameter can be missing and the command will show the current tracing status for this module( on or off ); Possible values:
     */
    trace = (params?: { trace_mode?: string }) => this.execute('ws_trace', params);
}
