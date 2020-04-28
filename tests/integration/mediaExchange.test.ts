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

describe('MediaExchange Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('forkFromCallToUri(): should MI command that has the same behavior as , only that the triggering is not script driven, but exterior driven. Useful for starting listening a call.', async () => {
        const callid = uuid();
        const uri = uuid();
        const medianum = uuid();
        const response = await client.mediaExchange.forkFromCallToUri({ callid, uri, medianum });
        debug(response);
    });

    it('exchangeFromCallToUri(): should MI command that has the same behavior as , only that the triggering is not script driven, but exterior driven. Useful for injecting media announcements during a call.', async () => {
        const callid = uuid();
        const uri = uuid();
        const leg = uuid();
        const response = await client.mediaExchange.exchangeFromCallToUri({ callid, uri, leg });
        debug(response);
    });

    it('exchangeFromCallToUriBody(): should MI command that does the same thing as the MI function, but also allows you to specify a custom body in the outgoing request. The body has to be specified in the mandatory parameter, all the other parameters being the same as the ones of .', async () => {
        const response = await client.mediaExchange.exchangeFromCallToUriBody();
        debug(response);
    });

    it('terminate(): should MI command to terminate an ongoing media exchange.', async () => {
        const callid = uuid();
        const leg = uuid();
        const nohold = uuid();
        const response = await client.mediaExchange.terminate({ callid, leg, nohold });
        debug(response);
    });
});
