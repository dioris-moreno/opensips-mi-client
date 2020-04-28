import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'tm';

export default class Tm extends Module {
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
}
