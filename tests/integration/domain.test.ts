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

describe('Domain Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('reload(): should trigger a re-read of the contents of domain table into cache memory', async () => {
        const response = await client.domain.reload();
        expect(response).toBe(OK);
    });

    it('dump(): should return hash indexes and domain names in cache memory', async () => {
        const response = await client.domain.dump();
        expect(_.isArray(response['Domains'])).toBeTruthy();
    });
});
