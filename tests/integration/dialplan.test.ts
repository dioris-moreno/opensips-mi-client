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

describe('Dialplan Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('reload(): should It will update the translation rules, loading the database info.', async () => {
        const response = await client.dialplan.reload();
        expect(response).toBe(OK);
    });

    it('translate(): should It will apply a translation rule identified by a dialplan id on an input string.', async () => {
        const dpid = '10';
        const input = '5072023030';
        const response = await client.dialplan.translate({ dpid, input });
        debug(response);
    });

    it('showPartiton(): should Display partition(s) details.', async () => {
        const response = await client.dialplan.showPartiton();
        debug(response);
    });
});
