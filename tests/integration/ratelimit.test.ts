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
import { getRandomInt } from '../utils/';

const OK = 'OK';

describe('Ratelimit Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('list(): should list the parameters and variables in the ratelimit module.', async () => {
        const response = await client.ratelimit.list();
        expect(_.isArray(response['Pipes'])).toBeTruthy();
    });

    it.skip('resetPipe(): should reset the counter of a specified pipe.', async () => {
        // It triggers an Internal error.
        const pipe = 'gw_10.0.0.1';
        const response = await client.ratelimit.resetPipe({ pipe });
        debug(response);
    });

    it('setPid(), getPid(): should set and get the PID Controller parameters for the Feedback Algorithm', async () => {
        const ki = getRandomInt(1, 100);
        const kp = getRandomInt(1, 100);
        const kd = getRandomInt(1, 100);
        let response = await client.ratelimit.setPid({ ki, kp, kd });
        expect(response).toBe(OK);
        response = await client.ratelimit.getPid();
        expect(parseInt(response.PID.ki)).toBe(ki);
        expect(parseInt(response.PID.kp)).toBe(kp);
        expect(parseInt(response.PID.kd)).toBe(kd);
    });

    it.skip('binStatus(): should dump each destination used for replication, as well as the timestamp of the last message received from them.', async () => {
        const response = await client.ratelimit.binStatus();
        debug(response);
    });
});
