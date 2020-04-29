import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'sl';

export class Sl extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Returns the statistics of the module.
     * @param name - (optional) get only the statistic named "name".
     * @param options - (optional) use keepGroupName=true to get the original names of the stats.
     */
    getStatistics = async (name?: Sl.Stats | Sl.StatsTypes, options?: { keepGroupName: boolean }) => {
        return this.getModuleStats(name, options);
    };
}

export namespace Sl {
    export type AllStats = 'all';
    export type C1xxRepliesStat = '1xx_replies';
    export type C2xxRepliesStat = '2xx_replies';
    export type C3xxRepliesStat = '3xx_replies';
    export type C4xxRepliesStat = '4xx_replies';
    export type C5xxRepliesStat = '5xx_replies';
    export type C6xxRepliesStat = '6xx_replies';
    export type SentRepliesStat = 'sent_replies';
    export type SentErrRepliesStat = 'sent_err_replies';
    export type ReceivedAcksStat = 'received_ACKs';
    export type StatsTypes =
        | AllStats
        | C1xxRepliesStat
        | C2xxRepliesStat
        | C3xxRepliesStat
        | C4xxRepliesStat
        | C5xxRepliesStat
        | C6xxRepliesStat
        | SentRepliesStat
        | SentErrRepliesStat
        | ReceivedAcksStat;
    export enum Stats {
        All = 'all',
        C1xxReplies = '1xx_replies',
        C2xxReplies = '2xx_replies',
        C3xxReplies = '3xx_replies',
        C4xxReplies = '4xx_replies',
        C5xxReplies = '5xx_replies',
        C6xxReplies = '6xx_replies',
        SentReplies = 'sent_replies',
        SentErrReplies = 'sent_err_replies',
        ReceivedAcks = 'received_ACKs',
    }
}

export default Sl;
