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

describe('Cplc Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('load(): should loads the XML CPL file for the given user', async () => {
        const username = 'sip:bob@domain.com';
        const cpl_filename = '/etc/opensips/cpl_ignore.xml';
        const response = await client.cplc.load({ username, cpl_filename });
        expect(response).toBe(OK);
    });

    it('remove(): should remove the entire database record for the given user', async () => {
        const username = 'sip:bob@domain.com';
        const response = await client.cplc.remove({ username });
        expect(response).toBe(OK);
    });

    it('get(): should return the CPL script in XML format.', async () => {
        const username = 'sip:bob@domain.com';
        const response = await client.cplc.get({ username });
        expect(response['script'] !== undefined).toBeTruthy();
    });
});
