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

describe('DbVirtual Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('get(): should return information about global state of the real dbs', async () => {
        const response = await client.dbVirtual.get();
        // { SETS: ... }
        expect(response['SETS'] !== undefined).toBeTruthy();
    });

    it('set(): should set the permissions for real dbs access per set per db.', async () => {
        const set_index = 0; // set_index 0 corresponds to set number 1
        const db_url_index = 0; // the first URL
        const may_use_db_flag = 0;
        const db_max_consec_retrys = 1;
        const response = await client.dbVirtual.set({ set_index, db_url_index, may_use_db_flag, db_max_consec_retrys });
        expect(response).toBe(OK);
    });
});
