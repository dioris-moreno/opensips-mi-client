import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'db_flatstore';

export default class DbFlatstore extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * It changes the name of the files where it is written.
     */
    rotate = () => this.execute('flat_rotate');
}
