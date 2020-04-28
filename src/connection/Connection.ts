import { CommunicationTypeEnum, CommandParameters } from './ClientConfiguration';

export default interface Connection {
    readonly communicationType: CommunicationTypeEnum;
    execute(command: string, params?: CommandParameters): any;
    isValid(): boolean;
}
