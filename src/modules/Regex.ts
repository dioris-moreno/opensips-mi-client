import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'regex';

export class Regex extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Causes regex module to re-read the content of the text file and re-compile the regular expressions. The number of groups in the file can be modified safely.
     */
    reload = () => this.execute('regex_reload');
}

export default Regex;
