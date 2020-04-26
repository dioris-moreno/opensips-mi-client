/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import { Client } from '../../src/index';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { getRandomInt } from '../utils/utils';

describe('Dialog Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('list(): should list the description of the dialogs', async () => {
        const index = '1';
        const counter = '0';
        const response = await client.dialog.list({ index, counter });
        expect(_.isArray(response['Dialogs'])).toBeTruthy();
    });

    it('listCtx(): should list the description of the dialogs including associated context', async () => {
        const index = '1';
        const counter = '0';
        const response = await client.dialog.listCtx({ index, counter });
        expect(_.isArray(response['Dialogs'])).toBeTruthy();
    });

    it.skip('endDlg(): should terminate an ongoing dialog', async () => {
        const dialog_id = '1';
        const response = await client.dialog.endDlg({ dialog_id });
        debug(response);
        // expect(_.isArray(response['Dialogs'])).toBeTruthy();
    });

    it.skip('getSize(): should return the number of dialogs belonging to a profile', async () => {
        const profile = '1';
        const res1 = await client.connection.execute('profile_get_sizex');
        debug(res1);
        const response = await client.dialog.getSize({ profile });
        debug(response);
        // expect(_.isArray(response['Dialogs'])).toBeTruthy();
    });

    it.skip('pushVar(): should push or update a dialog value for the given list of dialog IDs / Call-IDs', async () => {
        const dlg_val_name = '';
        const dlg_val_value = '';
        const DID = '';
        const response = await client.dialog.pushVar({ DID, dlg_val_name, dlg_val_value });
        debug(response);
        // expect(_.isArray(response['Dialogs'])).toBeTruthy();
    });
});
