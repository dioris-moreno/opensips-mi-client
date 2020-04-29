import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'b2b_entities';

export class B2bEntities extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * This command can be used to list the internals of the b2b entities.
     */
    list = () => this.execute('b2be_list');
}

export default B2bEntities;
