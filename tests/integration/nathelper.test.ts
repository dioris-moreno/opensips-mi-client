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

describe('Nathelper Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('enablePing(): should enable and check the natpinging status', async () => {
        let status = 1;
        let response = await client.nathelper.enablePing({ status });
        expect(response).toBe(OK);
        response = await client.nathelper.enablePing();
        expect(response['Status']).toBe(status);
    });

    it('enablePing(): should disable and check the natpinging status', async () => {
        let status = 0;
        let response = await client.nathelper.enablePing({ status });
        expect(response).toBe(OK);
        response = await client.nathelper.enablePing();
        expect(response['Status']).toBe(status);
    });
});
