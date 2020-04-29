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

describe('UacRegistrant Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('list(): should return the list of registrant records and their status', async () => {
        const response = await client.uacRegistrant.list();
        expect(_.isArray(response['Records'])).toBeTruthy();
    });

    it('reload(): should reload the registrant records from the database.', async () => {
        const response = await client.uacRegistrant.reload();
        expect(response).toBe(OK);
    });
});
