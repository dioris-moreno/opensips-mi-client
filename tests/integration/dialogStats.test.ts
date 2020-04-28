/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import Client, { Dialog, Tm, config } from '../../src';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { getRandomLogLevel } from '../utils';
import { tmpdir } from 'os';

const OK = 'OK';

describe('Dialog Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client({ url: 'http://appa.lsvon.net:8000/mi' });
    });

    afterEach(async () => {});

    // it('version(): should return all dialog statistics', async () => {
    //     const version = await client.version();
    //     console.log(version);
    //     // console.log(config);
    // });

    it('getStatistics(): should return all dialog statistics', async () => {
        const response = await client.dialog.getStatistics();
        expect(_.isEmpty(response)).toBeFalsy();
    });

    it('getStatistics(): should return one dialog statistics', async () => {
        const stat = 'update_recv';
        let response = await client.dialog.getStatistics(Dialog.Stats.UpdateRecv);
        console.log(response);
        expect(_.keys(response).includes(stat)).toBeTruthy();
        response = await client.dialog.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
        const options = { keepGroupName: true };
        response = await client.dialog.getStatistics(Dialog.Stats.All, options);
        console.log(response);
    });
});
