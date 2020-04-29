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

    it('endDlg(): should terminate an ongoing dialog (test-error)', async () => {
        try {
            const dialog_id = uuid();
            await client.dialog.endDlg({ dialog_id });
        } catch (err) {
            expect(err.message).toBe('Requested Dialog not found');
        }
    });

    it('getSize(): should return the number of dialogs belonging to a profile (test-error)', async () => {
        try {
            const profile = uuid();
            await client.dialog.getSize({ profile });
        } catch (err) {
            expect(err.message).toBe('Profile not found');
        }
    });

    it('listDlgs(): should list all the dialogs belonging to a profile (test-error)', async () => {
        try {
            const profile = uuid();
            await client.dialog.listDlgs({ profile });
        } catch (err) {
            expect(err.message).toBe('Profile not found');
        }
    });

    it('getValues(): should list all the values belonging to a profile along with their count (test-error)', async () => {
        try {
            const profile = uuid();
            await client.dialog.getValues({ profile });
        } catch (err) {
            expect(err.message).toBe('Profile not found');
        }
    });

    it('endDlgs(): should terminate all ongoing dialogs from a specified profile (test-error)', async () => {
        try {
            const profile = uuid();
            await client.dialog.endDlgs({ profile });
        } catch (err) {
            expect(err.message).toBe('Profile not found');
        }
    });

    it('dbSync(): should load all the information about the dialogs from the database', async () => {
        const response = await client.dialog.dbSync();
        expect(response).toBe(OK);
    });

    it('clusterSync(): should synchronize if dialog replication is enabled (test-error)', async () => {
        try {
            await client.dialog.clusterSync();
        } catch (err) {
            expect(err.message).toBe('Dialog replication disabled');
        }
    });

    it('restoreDb(): should restore the dialog table after a potential desynchronization event', async () => {
        const response = await client.dialog.restoreDb();
        expect(response).toBe(OK);
    });

    it('allProfiles(): should list all the dialog profiles', async () => {
        const response = await client.dialog.allProfiles();
        expect(_.isArray(response['Profiles'])).toBeTruthy();
    });

    it('pushVar(): should push or update a dialog value for the given list of dialog IDs / Call-IDs (test-error)', async () => {
        const dlg_val_name = 'var_name';
        const dlg_val_value = 'var_value';
        const DID = ['DID1'];
        const response = await client.dialog.pushVar({ dlg_val_name, dlg_val_value, DID });
        expect(response).toBe(OK);
    });

    it('sendSequential(): should send a sequential request within an ongoing dialog (test-error)', async () => {
        try {
            const callid = uuid();
            await client.dialog.sendSequential({ callid });
        } catch (err) {
            expect(err.message).toBe('Dialog Not Found');
        }
    });
});
