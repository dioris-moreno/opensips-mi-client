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

describe('Httpd Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('listRootPath(): should list all the registered http root paths into the httpd module', async () => {
        const response = await client.httpd.listRootPath();
        // [ { http_root: 'mi', module: 'mi_http' } ]
        expect(_.isArray(response)).toBeTruthy();
        expect(response.find((item: any) => item.module === 'mi_http') !== undefined).toBeTruthy();
    });
});
