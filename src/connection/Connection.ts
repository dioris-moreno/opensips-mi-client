import ClientConfiguration, { CommandParameters } from './ClientConfiguration';

export default interface Connection {
    readonly communicationType: ClientConfiguration.CommunicationType;
    execute(command: string, params?: CommandParameters): any;
    validate(): void;
}
