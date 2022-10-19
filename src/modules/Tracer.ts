import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'tracer';

export class Tracer extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Enable/disable tracing (globally or for a specific trace id) or dump info about trace ids. This command requires named parameters (each parameter is ginven in the format param_name=param_value).
     * @param [params.id] - the name of the tracing instance. If this parameter is missing the command will either dump info for all tace ids(and return the global tracing state) or set the global tracing state.
     * @param [params.mode] - possible values are: on - enable tracing, off - disable tracing
     */
    trace = (params?: { id?: string; mode?: string }) => this.execute('trace', params);

    /**
     * Creates a dynamic tracing destination based using custom filters. This function can be used to debug calls for certain destinations real-time.
     * @param params.id - the name of the tracing instance
     * @param params.uri - the destination uri for this instance
     * @param [params.filter] - used to filter the traffic received by the sender. This parameter should be an array that can contain multiple filters in the format. Possible values for the argument are:
     * @param [params.scope] - what do you want to trace. Possible values are: m/M - trace messages, t/T - trace transactions, d/D - trace dialogs.
     * @param [params.type] - list of types of messages to be traced separated by |. Possible values are: sip - enable sip messages tracing, xlog - enable xlog messages tracing, rest - enable rest messages tracing.
     */
    start = (params: { id: string; uri: string; filter?: string; scope?: string; type?: string }) =>
        this.execute('trace_start', params);

    /**
     * Stops &osips; from sending traffic to a dynamic trace id created using the command.
     * @param params.id - the name of the tracing instance to be stopped.
     */
    stop = (params: { id: string }) => this.execute('trace_stop', params);

    /**
     * Returns the statistics of the module.
     * @param [name] - get only the statistic named "name".
     * @param [options] - use keepGroupName=true to get the original names of the stats.
     */
    getStatistics = async (name?: Tracer.Stats | Tracer.StatsTypes, options?: { keepGroupName: boolean }) => {
        return this.getModuleStats(name, options);
    };
}

export namespace Tracer {
    export type AllStats = 'all';
    export type TracedRequestsStat = 'traced_requests';
    export type TracedRepliesStat = 'traced_replies';
    export type StatsTypes = AllStats | TracedRequestsStat | TracedRepliesStat;
    export enum Stats {
        All = 'all',
        TracedRequests = 'traced_requests',
        TracedReplies = 'traced_replies',
    }
}

export default Tracer;
