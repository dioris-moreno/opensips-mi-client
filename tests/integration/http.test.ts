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

describe(`MI Client`, () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
        await client.connect();
    });

    afterEach(async () => {});

    describe('Core Functions', () => {
        it('arg(): should return the full list of arguments used when OpenSIPS was started', async () => {
            const result = await client.arg();
            expect(_.isArray(result)).toBeTruthy();
            expect(result.length > 0).toBeTruthy();
        });

        it('listBlacklists(): should return a list of all the defined (static or learned) blacklists from OpenSIPS', async () => {
            const result = await client.listBlacklists();
            expect(_.isArray(result['Lists'])).toBeTruthy();
        });

        it('listTcpConnections(): should return a list all ongoing TCP/TLS connections from OpenSIPS', async () => {
            const result = await client.listTcpConnections();
            expect(_.isArray(result['Connections'])).toBeTruthy();
        });

        it('logLevel(): should return a table with the current logging levels', async () => {
            const result = await client.logLevel();
            expect(_.isArray(result['Processes'])).toBeTruthy();
            expect(result['Processes'].length > 0).toBeTruthy();
        });

        it('logLevel(): should change the logging level for each process', async () => {
            const newLogLevel = 2;
            const returnName = 'New global log level';
            const result = await client.logLevel({ level: newLogLevel });
            // response = { 'New global log level': 1 }
            expect(result[returnName]).toBe(newLogLevel);
        });

        it('version(): should return the OpenSIPS version', async () => {
            const result = await client.version();
            expect(result['Server'] !== undefined).toBeTruthy();
        });

        it('ps(): should return all OpenSIPS processes', async () => {
            const result = await client.ps();
            expect(_.isArray(result['Processes'])).toBeTruthy();
        });

        it('which(): should return all available MI commands from the queried OpenSIPS instance', async () => {
            const result = await client.which();
            expect(_.isArray(result)).toBeTruthy();
        });
    });

    describe('Dialog Module', () => {
        it('list(): should list dialogs', async () => {
            const index = '1';
            const counter = '0';
            const result = await client.dialog.list({ index, counter });
            expect(_.isArray(result['Dialogs'])).toBeTruthy();
        });

        it('list(): should list dialogs', async () => {
            const index = '1';
            const counter = '0';
            const result = await client.dialog.list({ index, counter });
            expect(_.isArray(result['Dialogs'])).toBeTruthy();
        });
    });

    describe('Drouting Module', () => {
        it('list(): should list dialogs', async () => {
            const index = '1';
            const counter = '0';
            // const result = await client.drouting.
            // expect(_.isArray(result['Dialogs'])).toBeTruthy();
        });

        it('listCtx(): should list dialogs', async () => {
            const result = await client.dialog.listCtx();
            debug(result);
            expect(_.isArray(result['Dialogs'])).toBeTruthy();
        });
    });
});
