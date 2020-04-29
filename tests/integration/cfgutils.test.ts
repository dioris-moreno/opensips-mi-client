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
import { getRandomLogLevel, getRandomInt } from '../utils/';

const OK = 'OK';

describe('Cfgutils Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('setProbability(): should set the probability value to the given parameter', async () => {
        const prob_proc = 50;
        const response = await client.cfgutils.setProbability({ prob_proc });
        expect(response).toBe(OK);
    });

    it('resetProbability(): should reset the probability value to the inital start value', async () => {
        const response = await client.cfgutils.resetProbability();
        expect(response).toBe(OK);
    });

    it('getProbability(): should teturn the actual probability setting', async () => {
        const response = await client.cfgutils.getProbability();
        // { 'actual probability percent': 15 }
        expect(response['actual probability percent'] !== undefined).toBeTruthy();
    });

    it('checkConfigHash(): should check if the actual config file hash is identical to the stored one', async () => {
        const response = await client.cfgutils.checkConfigHash();
        // The actual config file hash is identical to the stored one
        expect(response).toContain('The actual config file hash is identical to the stored one');
    });

    it('getConfigHash(): should return the stored config file hash', async () => {
        const response = await client.cfgutils.getConfigHash();
        // 543498db943d3af4c1b1c5962556c5ce
        expect(response !== undefined).toBeTruthy();
    });

    it('setSharedVariable(), get(): should set and get the value of a shared variable ($shv(name)).', async () => {
        // Set in opensips.cfg: modparam("cfgutils", "shvset", "debug=i:1")
        // opensips-cli -x mi shv_set debug int 0
        const name = 'debug';
        const type = 'int';
        const value = `${getRandomLogLevel()}`;
        let response = await client.cfgutils.setSharedVariable({ name, type, value });
        expect(response).toBe(OK);
        response = await client.cfgutils.get({ name });
        //  { VAR: { type: 'integer', value: -1 } }
        expect(response['VAR']['value']).toBe(parseInt(value));
    });
});
