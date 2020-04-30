/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import { Client, Sst } from '../../src/';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { getRandomLogLevel } from '../utils/';

const OK = 'OK';

describe('Sst Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('getStatistics(): should return all statistics', async () => {
        // Without parameters
        let response = await client.sst.getStatistics();
        expect(_.isEmpty(response)).toBeFalsy();

        // Using Stats.All
        response = await client.sst.getStatistics(Sst.Stats.All);
        expect(_.isEmpty(response)).toBeFalsy();

        // Using 'all' string
        response = await client.sst.getStatistics('all');
        expect(_.isEmpty(response)).toBeFalsy();
    });

    it('getStatistics(): should return expired_sst statistic', async () => {
        const stat = 'expired_sst';

        // Using Stats enum member
        let response = await client.sst.getStatistics(Sst.Stats.ExpiredSst);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.sst.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return expired_sst statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'expired_sst';
        const valueName = 'sst:expired_sst';

        // Using Stats enum member
        let response = await client.sst.getStatistics(Sst.Stats.ExpiredSst, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.sst.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });
});
