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

describe('XcapClient Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('refreshXcapDoc(): MI command that should be sent by an xcap server when a stored document changes (test-error)', async () => {
        try {
            const doc_uri = 'http://127.0.0.1';
            const port = 80;
            const response = await client.xcapClient.refreshXcapDoc({ doc_uri, port });
            debug(response);
        } catch (err) {
            expect(err.message).toBe('Server error');
        }
    });
});
