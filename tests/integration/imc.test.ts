/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import { Client, Imc } from '../../src/';
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

    it('getStatistics(): should return all statistics', async () => {
        // Without parameters
        let response = await client.imc.getStatistics();
        expect(_.isEmpty(response)).toBeFalsy();

        // Using Stats.All
        response = await client.imc.getStatistics(Imc.Stats.All);
        expect(_.isEmpty(response)).toBeFalsy();

        // Using 'all' string
        response = await client.imc.getStatistics('all');
        expect(_.isEmpty(response)).toBeFalsy();
    });

    it('getStatistics(): should return active_rooms statistic', async () => {
        const stat = 'active_rooms';

        // Using Stats enum member
        let response = await client.imc.getStatistics(Imc.Stats.ActiveRooms);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.imc.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return active_rooms statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'active_rooms';
        const valueName = 'imc:active_rooms';

        // Using Stats enum member
        let response = await client.imc.getStatistics(Imc.Stats.ActiveRooms, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.imc.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });
});
