import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'tm';

export class Tm extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Generates and sends a local SIP request.
     * @param params.method - request method
     * @param params.ruri - request SIP URI
     * @param params.headers - set of additional headers to be added to the request; at least and headers must be specified)
     * @param params.next_hop - (optional) next hop SIP URI (OBP).
     * @param params.socket - (optional) local socket to be used for sending the request.
     * @param params.body - (optional) request body (if present, requires the and headers)
     */
    uacDlg = (params: {
        method: string;
        ruri: string;
        headers: string;
        next_hop?: string;
        socket?: string;
        body?: string;
    }) => this.execute('t_uac_dlg', params);

    /**
     * Generates and sends a CANCEL for an existing SIP request.
     * @param params.callid - callid of the INVITE request to be cancelled.
     * @param params.cseq - cseq of the INVITE request to be cancelled.
     */
    uacCancel = (params: { callid: string; cseq: string }) => this.execute('t_uac_cancel', params);

    /**
     * Gets information about the load of TM internal hash table.
     */
    hash = () => this.execute('t_hash');

    /**
     * Generates and sends a reply for an existing inbound SIP transaction.
     * @param params.code - reply code
     * @param params.reason - reason phrase.
     * @param params.trans_id - transaction identifier (has the hash_entry:label format)
     * @param params.to_tag - To tag to be added to TO header
     * @param params.new_headers - (optional) extra headers to be appended to the reply.
     * @param params.body - (optional) reply body (if present, requires the and headers)
     */
    reply = (params: {
        code: number;
        reason: string;
        trans_id: string;
        to_tag: string;
        new_headers?: string;
        body?: string;
    }) => this.execute('t_reply', params);

    /**
     * Returns the statistics of the module.
     * @param name - (optional) get only the statistic named "name".
     * @param options - (optional) use keepGroupName=true to get the original names of the stats.
     */
    getStatistics = async (name?: Tm.Stats | Tm.StatsTypes, options?: { keepGroupName: boolean }) => {
        return this.getModuleStats(name, options);
    };
}

export namespace Tm {
    export type AllStats = 'all';
    export type ReceivedRepliesStat = 'received_replies';
    export type RelayedRepliesStat = 'relayed_replies';
    export type LocalRepliesStat = 'local_replies';
    export type UASTransactionsStat = 'UAS_transactions';
    export type UACTransactionsStat = 'UAC_transactions';
    export type T2xxTransactionsStat = '2xx_transactions';
    export type T3xxTransactionsStat = '3xx_transactions';
    export type T4xxTransactionsStat = '4xx_transactions';
    export type T5xxTransactionsStat = '5xx_transactions';
    export type T6xxTransactionsStat = '6xx_transactions';
    export type InuseTransactionsStat = 'inuse_transactions';
    export type StatsTypes =
        | AllStats
        | ReceivedRepliesStat
        | RelayedRepliesStat
        | LocalRepliesStat
        | UASTransactionsStat
        | UACTransactionsStat
        | T2xxTransactionsStat
        | T3xxTransactionsStat
        | T4xxTransactionsStat
        | T5xxTransactionsStat
        | T6xxTransactionsStat
        | InuseTransactionsStat;
    export enum Stats {
        All = 'all',
        ReceivedReplies = 'received_replies',
        RelayedReplies = 'relayed_replies',
        LocalReplies = 'local_replies',
        UASTransactions = 'UAS_transactions',
        UACTransactions = 'UAC_transactions',
        T2xxTransactions = '2xx_transactions',
        T3xxTransactions = '3xx_transactions',
        T4xxTransactions = '4xx_transactions',
        T5xxTransactions = '5xx_transactions',
        T6xxTransactions = '6xx_transactions',
        InuseTransactions = 'inuse_transactions',
    }
}

export default Tm;
