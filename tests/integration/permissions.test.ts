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

describe('Permissions Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('addressReload(): should re-read the contents of the address database table into cache memory', async () => {
        const partition = uuid();
        const response = await client.permissions.addressReload({ partition });
        debug(response);
    });

    // it('addressDump(): should Causes permissions module to dump contents of the address table from cache memory.', async () => {
    //     const partition = uuid();
    //     const response = await client.permissions.addressDump({ partition });
    //     debug(response);
    // });

    // it('subnetDump(): should Causes permissions module to dump contents of cache memory subnet table.', async () => {
    //     const partition = uuid();
    //     const response = await client.permissions.subnetDump({ partition });
    //     debug(response);
    // });

    // it('allowUri(): should Tests if (URI, Contact) pair is allowed according to allow/deny files. The files must already have been loaded by OpenSIPS.', async () => {
    //     const basename = uuid();
    //     const URI = uuid();
    //     const contact = uuid();
    //     const response = await client.permissions.allowUri({ basename, URI, contact });
    //     debug(response);
    // });
});
