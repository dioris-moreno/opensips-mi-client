import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'httpd';

export default class Httpd extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Lists all the registered http root paths into the httpd module. When a request comes in, if the root parth is in the list, the request will be sent to the module that register it.
     */
    listRootPath = () => this.execute('httpd_list_root_path');
}
