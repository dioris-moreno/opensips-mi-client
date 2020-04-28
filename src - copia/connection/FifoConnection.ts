import ConnectionBase from './ConnectionBase';
import Configuration, { CommunicationTypeEnum, CommandParameters } from './ClientConfiguration';

export default class FifoConnection extends ConnectionBase {
    get communicationType() {
        return CommunicationTypeEnum.Fifo;
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

    isValid(): boolean {
        return true;
    }
}
