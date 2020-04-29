import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'event_flatstore';

export class EventFlatstore extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * It makes the processes reopen the file specified as a parameter to the command in order to be compatible with a logrotate command. If the function is not called after the mv command is executed, the module will continue to write in the renamed file.
     * @param params.path_to_file - the file path
     */
    flatRotate = (params: { path_to_file: string }) => this.execute('evi_flat_rotate', params);
}

export default EventFlatstore;
