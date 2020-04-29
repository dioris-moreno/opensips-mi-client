import { CommunicationType, CommandParameters } from './ClientConfiguration';

export default interface Connection {
    readonly communicationType: CommunicationType;
    execute(command: string, params?: CommandParameters): any;
    validate(): void;
}
