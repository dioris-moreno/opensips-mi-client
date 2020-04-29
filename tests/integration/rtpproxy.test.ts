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
const testURL = 'udp:localhost:12221';

describe('Rtpproxy Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('enable(): should disable an RTP proxy.', async () => {
        const url = testURL;
        const setid = 1;
        const enable = 0;
        const response = await client.rtpproxy.enable({ url, enable, setid });
        expect(response).toBe(OK);
    });

    it('enable(): should enable an RTP proxy.', async () => {
        const url = testURL;
        const setid = 1;
        const enable = 0;
        const response = await client.rtpproxy.enable({ url, enable, setid });
        expect(response).toBe(OK);
    });

    it('show(): should return all the RTP proxies and their information', async () => {
        const response = await client.rtpproxy.show();
        expect(_.isArray(response)).toBeTruthy();
    });

    it('reload(): should reload RTP proxies sets from database', async () => {
        const response = await client.rtpproxy.reload();
        expect(response).toBe(OK);
    });
});
