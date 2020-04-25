import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'tracer';

export default class Tracer extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Enable/disable tracing(globally or for a specific trace id) or dump info about trace ids. This command requires named parameters (each parameter is ginven in the format param_name=param_value).
     * @param params.id - (optional) the name of the tracing instance. If this parameter is missing the command will either dump info for all tace ids(and return the global tracing state) or set the global tracing state.
     * @param params.mode - (optional) possible values are:
     */
    trace = (params?: { id?: string; mode?: string }) => this.execute('trace', params);

    /**
     * Creates a dynamic tracing destination based using custom filters. This function can be used to debug calls for certain destinations real-time.
     * @param params.id - the name of the tracing instance.
     * @param params.uri - the destination uri for this instance.
     * @param params.filter - (optional) used to filter the traffic received by the sender. This parameter should be an array that can contain multiple filters in the format. Possible values for the argument are:
     * @param params.scope - the scope to engage the tracing for. The format received by this parameter is similar to the one received by the function.
     * @param params.type - the type of messages you want to receive. The format received by this parameter is similar to the one received by the function.
     */
    start = (params: { id: string; uri: string; filter?: string; scope: string; type: string }) =>
        this.execute('trace_start', params);

    /**
     * Stops &osips; from sending traffic to a dynamic trace id created using the command.
     * @param params.id - the name of the tracing instance to be stopped.
     */
    stop = (params: { id: string }) => this.execute('trace_stop', params);
}
