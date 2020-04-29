/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import { Client } from '../../src/';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { getRandomLogLevel } from '../utils/';

const OK = 'OK';

describe('TM Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('uacDlg(): should generate and send a local SIP request', async () => {
        // opensips-cli -x mi t_uac_dlg method=INVITE ruri="sip:alice@127.0.0.1:7050" headers="From: sip:bobster@127.0.0.1:1337\r\nTo: sip:alice@127.0.0.1:7050\r\nContact: sip:bobster@127.0.0.1:1337\r\n"
        const method = 'INVITE';
        const ruri = 'sip:alice@127.0.0.1:7050';
        const headers =
            'From: sip:bobster@127.0.0.1:1337\r\nTo: sip:alice@127.0.0.1:7050\r\nContact: sip:bobster@127.0.0.1:1337\r\n';
        const response = await client.tm.uacDlg({ method, ruri, headers });
        // { Status: '408 Request Timeout' }
        expect(response['Status'] !== undefined).toBeTruthy();
    });

    it('uacCancel(): should generate and send a CANCEL for an existing SIP request (error-test).', async () => {
        // t_uac_cancel "1-23454@127.0.0.1" "1 INVITE"
        try {
            const callid = '1-23454@127.0.0.1';
            const cseq = '1 INVITE';
            await client.tm.uacCancel({ callid, cseq });
        } catch (err) {
            expect(err.message).toBe('No such transaction');
        }
    });

    // it.skip('hash(): should get information about the load of TM internal hash table (error-test)', async () => {
    //     // Test hangs.
    //     const response = await client.tm.hash();
    //     debug(response);
    // });

    it('reply(): should generate and send a reply for an existing inbound SIP transaction (error-test).', async () => {
        // opensips-cli -x mi t_reply 403 Forbidden 46961:1279687637 abcde
        try {
            const code = 403;
            const reason = 'Forbidden';
            const trans_id = '46961:1279687637';
            const to_tag = 'abcde';
            const response = await client.tm.reply({ code, reason, trans_id, to_tag });
            debug(response);
        } catch (err) {
            expect(err.message).toBe('Transaction not found');
        }
    });
});
