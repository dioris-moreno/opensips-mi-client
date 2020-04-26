import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'media_exchange';

export default class MediaExchange extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * MI command that has the same behavior as , only that the triggering is not script driven, but exterior driven. Useful for starting listening a call.
     * @param params.callid - the callid of the dialog that will have its RTP streamed to the new call towards the Media Server
     * @param params.uri - the destination URI of the new call
     * @param params.leg - (optional) indicates the participant leg that will have its RTP streamed in the new call. Possible values are , or . If missing, both media streams are forked
     * @param params.headers - (optional) extra headers to add to the outgoing request
     * @param params.medianum - the media stream that will be forked within the call. First index is 0. If missing, all media streams of that leg(s) are streamed.
     */
    forkFromCallToUri = (params: { callid: string; uri: string; leg?: string; headers?: string; medianum: string }) =>
        this.execute('media_fork_from_call_to_uri', params);

    /**
     * MI command that has the same behavior as , only that the triggering is not script driven, but exterior driven. Useful for injecting media announcements during a call.
     * @param params.callid - the callid of the dialog that will have its leg mixed with the new call to the Media Server
     * @param params.uri - the destination URI of the new call
     * @param params.leg - indicates the participant that will have its media pined into the new call. Possible values are and .
     * @param params.headers - (optional) extra headers to add to the outgoing request
     * @param params.nohold - (optional) if set to a non-zero value, the module avoids putting the other participant on hold when the media exchanging starts
     */
    exchangeFromCallToUri = (params: { callid: string; uri: string; leg: string; headers?: string; nohold?: string }) =>
        this.execute('media_exchange_from_call_to_uri', params);

    /**
     * MI command that does the same thing as the MI function, but also allows you to specify a custom body in the outgoing request. The body has to be specified in the mandatory parameter, all the other parameters being the same as the ones of .
     */
    exchangeFromCallToUriBody = () => this.execute('media_exchange_from_call_to_uri_body');

    /**
     * MI command to terminate an ongoing media exchange.
     * @param params.callid - the callid of the dialog that will have the media exchange terminated.
     * @param params.leg - the leg for whom to terminate the media exchange. Accepted values are , and . If missing, all media sessions are terminated.
     * @param params.nohold - if specified and has a non-zero value, the leg that is being terminated is not put on hold if the other participant still has an ongoing media session.
     */
    terminate = (params: { callid: string; leg: string; nohold: string }) => this.execute('media_terminate', params);
}
