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

describe('Imc Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('listRooms(): should return the list of the IM Conferencing rooms', async () => {
        // opensips-cli -x mi imc_list_rooms
        const response = await client.imc.listRooms();
        expect(_.isArray(response['ROOMS'])).toBeTruthy();
    });

    it('listMembers(): should return the list of the members in IM Conferencing rooms (test-error)', async () => {
        try {
            // opensips-cli -x mi imc_list_members sip:chat-000@opensips.org
            const room = 'sip:chat-000@opensips.org';
            const response = await client.imc.listMembers({ room });
            debug(response);
        } catch (err) {
            expect(err.message).toContain('no such room');
        }
    });
});
