import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'proto_tls';

export class ProtoTls extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Returns or set the current tracing status.
     * @param [params.trace_mode] - Possible values: on / off
     */
    trace = (params?: { trace_mode?: string }) => this.execute('tls_trace', params);
}

export default ProtoTls;
