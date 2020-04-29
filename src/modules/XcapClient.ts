import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'xcap_client';

export class XcapClient extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * MI command that should be sent by an xcap server when a stored document changes.
     * @param params.doc_uri - the uri of the document
     * @param params.port - the port of the xcap server
     */
    refreshXcapDoc = (params: { doc_uri: string; port: number }) => this.execute('refreshXcapDoc', params);
}

export default XcapClient;
