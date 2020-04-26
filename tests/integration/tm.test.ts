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

describe('Tm Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('uacDlg(): should Generates and sends a local SIP request (error-test).', async () => {
        try {
            const method = uuid();
            const ruri = uuid();
            const headers = uuid();
            const response = await client.tm.uacDlg({ method, ruri, headers });
            // debug(response);
        } catch (err) {
            expect(err.message).toContain('Invalid ruri');
        }
    });

    it('uacCancel(): should Generates and sends a CANCEL for an existing SIP request (error-test).', async () => {
        try {
            const callid = uuid();
            const cseq = uuid();
            const response = await client.tm.uacCancel({ callid, cseq });
            // debug(response);
        } catch (err) {
            expect(err.message).toContain('No such transaction');
        }
    });

    it.skip('hash(): should get information about the load of TM internal hash table (error-test)', async () => {
        // Test hangs.
        const response = await client.tm.hash();
        debug(response);
    });

    it('reply(): should generate and send a reply for an existing inbound SIP transaction (error-test).', async () => {
        try {
            const code = uuid();
            const reason = uuid();
            const trans_id = uuid();
            const to_tag = uuid();
            const response = await client.tm.reply({ code, reason, trans_id, to_tag });
            debug(response);
        } catch (err) {
            expect(err.message).toContain('Invalid params');
        }
    });
});
