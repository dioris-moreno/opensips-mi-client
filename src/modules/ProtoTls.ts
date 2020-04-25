import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'proto_tls';

export default class ProtoTls extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     *
     * @param params.undefined - trace_mode(optional): set tls tracing on and off. This parameter can be missing and the command will show the current tracing status for this module( on or off ); Possible values:
     */
    trace = (params?: { undefined?: string }) => this.execute('tls_trace', params);
}
