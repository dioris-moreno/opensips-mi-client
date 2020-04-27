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

describe('Benchmark Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('enableGlobal(): should disable the module', async () => {
        const enable = 0;
        const response = await client.benchmark.enableGlobal({ enable });
        expect(response).toBe(OK);
    });

    it('enableGlobal(): should enable the module', async () => {
        const enable = 1;
        const response = await client.benchmark.enableGlobal({ enable });
        expect(response).toBe(OK);
    });

    it.skip('enableTimer(): should disable a single timer', async () => {
        // Triggers error: Failed to register timer.
        const timer = uuid();
        const enable = 0;
        const response = await client.benchmark.enableTimer({ timer, enable });
        debug(response);
    });

    it('granularity(): should modify the benchmarking granularity.', async () => {
        const granularity = getRandomInt(100, 500);
        const response = await client.benchmark.granularity({ granularity });
        expect(response).toBe(OK);
    });

    it('loglevel(): should Modifies the module log level.', async () => {
        const log_level = getRandomLogLevel();
        const response = await client.benchmark.loglevel({ log_level });
        expect(response).toBe(OK);
    });

    it('pollResults(): should Returns the current and global results for each timer', async () => {
        // This command is only available if the "granularity" variable is set to 0.
        const granularity = 0;
        let response = await client.benchmark.granularity({ granularity }); // Granularity MUST be "0".
        response = await client.benchmark.pollResults();
        expect(_.isArray(response['Timers'])).toBeTruthy();
    });
});
