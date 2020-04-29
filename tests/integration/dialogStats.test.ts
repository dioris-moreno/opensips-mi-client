/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import Client, { Dialog } from '../../src';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { getRandomLogLevel } from '../utils';

const OK = 'OK';

describe('Dialog Module Stats', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('getStatistics(): should return all dialog statistics', async () => {
        const response = await client.dialog.getStatistics();
        expect(_.isEmpty(response)).toBeFalsy();
    });

    it('getStatistics(): should return one dialog statistic', async () => {
        const stat = 'update_recv';
        let response = await client.dialog.getStatistics(Dialog.Stats.UpdateRecv);
        expect(_.keys(response).includes(stat)).toBeTruthy();
        response = await client.dialog.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return one dialog statistic keeping the group name', async () => {
        const stat = 'update_recv';
        const options = { keepGroupName: true };
        const response = await client.dialog.getStatistics(stat, options);
        const valueName = `dialog:${stat}`;
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });
});
