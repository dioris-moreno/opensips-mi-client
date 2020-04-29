import ConnectionBase from './ConnectionBase';
import ClientConfiguration, { CommandParameters } from './ClientConfiguration';

export default class FifoConnection extends ConnectionBase {
    get communicationType() {
        return ClientConfiguration.CommunicationType.Fifo;
    }

    get replyDirectory() {
        return this.configuration.fifo_reply_dir;
    }

    get file() {
        return this.configuration.fifo_file;
    }

    execute(command: string, params?: CommandParameters) {
        return null;
    }

    validate(): void {
        // return true;
    }
}
