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

describe('Dialog Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('version(): should return all dialog statistics', async () => {
        const version = await client.version();
        console.log(version);
    });

    it('getStatistics(): should return all dialog statistics', async () => {
        const response = await client.dialog.getStatistics();
        debug(response);
    });

    it('getStatistics(): should return one dialog statistics', async () => {
        const name = 'update_recv';
        const response = await client.dialog.getStatistics(Dialog.Stats.ActiveDialogsStat);
        debug(response);
    });
});
