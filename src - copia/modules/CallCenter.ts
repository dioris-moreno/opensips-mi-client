import Module from './Module';
import { Client } from '../';
const MODULE_NAME = 'call_center';

export default class CallCenter extends Module {
    constructor(client: Client) {
        super(client, MODULE_NAME);
    }

    /**
     * Command to reload flows and agents definition from database.
     */
    reload = () => this.execute('cc_reload');

    /**
     * Command to login an agent into the Call Center engine.
     * @param params.agent_id - ID of the agent
     * @param params.state - the new login state (0 - log off, 1 - log in)
     */
    agentLogin = (params: { agent_id: string; state: number }) => this.execute('cc_agent_login', params);

    /**
     * Command to list all the calls in queuing - for each call, the following attributes will be printed: the flow of the call, for how long the call is in the queue, the ETW for the call, call priority and the call skill (inherited from the flow).
     */
    listQueue = () => this.execute('cc_list_queue');

    /**
     * Command to list all the flows - for each flow, the following attributes will be printed: the flow ID, the avg. call duration, how many calls were processed, how many agents are logged, and how many onging calls are.
     */
    listFlows = () => this.execute('cc_list_flows');

    /**
     * Command to list all the agents - for each agent, the following attributes will be printed: agent ID, agent login state and agent state (free, wrapup, incall).
     */
    listAgents = () => this.execute('cc_list_agents');

    /**
     * Command to list all the ongoing calls - for each call, the following attributes will be printed: call ID, call state (welcome, queued, toagent, ended), call duration, flow it belongs to, agent serving the call (if any).
     */
    listCalls = () => this.execute('cc_list_calls');

    /**
     * Command to reset all counter-like statistics.
     */
    resetStats = () => this.execute('cc_reset_stats');
}
