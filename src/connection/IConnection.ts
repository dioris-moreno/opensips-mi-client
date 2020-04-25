import { CommunicationTypeEnum, CommandParameters } from './ClientConfiguration';

export default interface IConnection {
    readonly communicationType: CommunicationTypeEnum;
    execute(command: string, params?: CommandParameters): any;
    isValid(): boolean;
}
