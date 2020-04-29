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
const testURL = 'udp:10.132.104.184:60000';

describe('RTPEngine Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('enable(): should disable an RTP proxy.', async () => {
        const url = testURL;
        const enable = 0;
        const response = await client.rtpengine.enable({ url, enable });
        expect(response).toBe(OK);
    });

    it('enable(): should enable an RTP proxy.', async () => {
        const url = testURL;
        const enable = 1;
        const response = await client.rtpengine.enable({ url, enable });
        expect(response).toBe(OK);
    });

    it('show(): should return all the RTP proxies and their information: set and status (disabled or not, weight and recheck_ticks).', async () => {
        const response = await client.rtpengine.show();
        // debug(JSON.stringify(response));
        expect(_.isArray(response)).toBeTruthy();
    });

    it('reload(): should Reloads all rtpengine sets from the database. Used only when the parameter is set.', async () => {
        const response = await client.rtpengine.reload();
        expect(response).toBe(OK);
    });

    it('teardown(): should Terminates the SIP dialog by the SIP Call-ID given as parameter.', async () => {
        const callid = uuid();
        const response = await client.rtpengine.teardown({ callid });
        expect(response).toBe(OK);
    });
});
