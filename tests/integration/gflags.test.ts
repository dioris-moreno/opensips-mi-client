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

describe('Gflags Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('setGflag(): should set the value of the flags specified by bitmask to 1.', async () => {
        const bitmask = 0x3;
        const response = await client.gflags.setGflag({ bitmask });
        expect(response).toBe(OK);
    });

    it('resetGflag(): should reset the value of some flags to 0', async () => {
        const bitmask = 0x3;
        const response = await client.gflags.resetGflag({ bitmask });
        expect(response).toBe(OK);
    });

    it('isGflag(): should return true', async () => {
        const bitmask = 0x3;
        let response = await client.gflags.setGflag({ bitmask });
        response = await client.gflags.isGflag({ bitmask });
        expect(response).toBe(true);
    });

    it('isGflag(): should return false', async () => {
        const bitmask = 0x3;
        let response = await client.gflags.resetGflag({ bitmask });
        response = await client.gflags.isGflag({ bitmask });
        expect(response).toBe(false);
    });

    it('getGflags(): should return the bitmap with all flags', async () => {
        const response = await client.gflags.getGflags();
        // { hex: '0x0', dec: '0' }
        expect(response['hex'] !== undefined).toBeTruthy();
        expect(response['dec'] !== undefined).toBeTruthy();
    });
});
