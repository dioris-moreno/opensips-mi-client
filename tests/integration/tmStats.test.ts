/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import Client, { Tm } from '../../src';
import _ from 'lodash';

const OK = 'OK';

describe('TM Module Stats', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('getStatistics(): should return all tm statistics', async () => {
        const response = await client.tm.getStatistics();
        expect(_.isEmpty(response)).toBeFalsy();
    });

    it('getStatistics(): should return one tm statistic', async () => {
        const stat = 'inuse_transactions';
        let response = await client.tm.getStatistics(Tm.Stats.InuseTransactions);
        expect(_.keys(response).includes(stat)).toBeTruthy();
        response = await client.tm.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return one tm statistic keeping the group name', async () => {
        const stat = 'inuse_transactions';
        const options = { keepGroupName: true };
        const response = await client.tm.getStatistics(stat, options);
        const valueName = `tm:${stat}`;
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });
});
