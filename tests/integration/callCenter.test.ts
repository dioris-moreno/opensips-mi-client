/**
 * @jest-environment node
 */
// To avoid cross origin axios error: https://github.com/axios/axios/issues/1754
import dotenv from 'dotenv';
dotenv.config(); // SET UP ENVIROMENTAL VARIABLES BEFORE IMPORTING MODULES.

import Debug from 'debug';
const debug = Debug('opensips-mi-client');

import { Client, CallCenter } from '../../src/';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { getRandomLogLevel } from '../utils/';

const OK = 'OK';

describe('CallCenter Module', () => {
    let client: Client;

    beforeEach(async () => {
        jest.setTimeout(30000);
        client = new Client();
    });

    afterEach(async () => {});

    it('reload(): should reload flows and agents definition from database', async () => {
        const response = await client.callCenter.reload();
        expect(response).toBe(OK);
    });

    it('agentLogin(): should login an agent into the Call Center engine', async () => {
        const agent_id = 'AgentA';
        const state = 1;
        const response = await client.callCenter.agentLogin({ agent_id, state });
        expect(response).toBe(OK);
    });

    it('agentLogin(): should logout an agent into the Call Center engine', async () => {
        const agent_id = 'AgentA';
        const state = 0;
        const response = await client.callCenter.agentLogin({ agent_id, state });
        expect(response).toBe(OK);
    });

    it('listQueue(): should return a list of all the calls in queuing', async () => {
        const response = await client.callCenter.listQueue();
        expect(_.isArray(response['Calls'])).toBeTruthy();
    });

    it('listFlows(): should return a list of all the flows', async () => {
        const response = await client.callCenter.listFlows();
        expect(_.isArray(response['Flows'])).toBeTruthy();
    });

    it('listAgents(): should return a list of all the agents', async () => {
        const response = await client.callCenter.listAgents();
        // debug(response);
        expect(_.isArray(response['Agents'])).toBeTruthy();
    });

    it('listCalls(): should return a list of all the ongoing calls', async () => {
        const response = await client.callCenter.listCalls();
        expect(_.isArray(response['Calls'])).toBeTruthy();
    });

    it('resetStats(): should reset all counter-like statistics.', async () => {
        const response = await client.callCenter.resetStats();
        expect(response).toBe(OK);
    });

    it('getStatistics(): should return all statistics', async () => {
        // Without parameters
        let response = await client.callCenter.getStatistics();
        expect(_.isEmpty(response)).toBeFalsy();

        // Using Stats.All
        response = await client.callCenter.getStatistics(CallCenter.GlobalStats.All);
        expect(_.isEmpty(response)).toBeFalsy();

        // Using 'all' string
        response = await client.callCenter.getStatistics('all');
        expect(_.isEmpty(response)).toBeFalsy();
    });

    it('getStatistics(): should return ccg_incalls statistic', async () => {
        const stat = 'ccg_incalls';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.Incalls);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_incalls statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccg_incalls';
        const valueName = 'call_center:ccg_incalls';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.Incalls, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_awt statistic', async () => {
        const stat = 'ccg_awt';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.Awt);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_awt statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccg_awt';
        const valueName = 'call_center:ccg_awt';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.Awt, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_load statistic', async () => {
        const stat = 'ccg_load';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.Load);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_load statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccg_load';
        const valueName = 'call_center:ccg_load';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.Load, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_distributed_incalls statistic', async () => {
        const stat = 'ccg_distributed_incalls';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.DistributedIncalls);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_distributed_incalls statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccg_distributed_incalls';
        const valueName = 'call_center:ccg_distributed_incalls';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.DistributedIncalls, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_answered_incalls statistic', async () => {
        const stat = 'ccg_answered_incalls';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.AnsweredIncalls);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_answered_incalls statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccg_answered_incalls';
        const valueName = 'call_center:ccg_answered_incalls';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.AnsweredIncalls, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_abandonned_incalls statistic', async () => {
        const stat = 'ccg_abandonned_incalls';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.AbandonnedIncalls);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_abandonned_incalls statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccg_abandonned_incalls';
        const valueName = 'call_center:ccg_abandonned_incalls';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.AbandonnedIncalls, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_onhold_calls statistic', async () => {
        const stat = 'ccg_onhold_calls';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.OnholdCalls);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_onhold_calls statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccg_onhold_calls';
        const valueName = 'call_center:ccg_onhold_calls';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.OnholdCalls, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_free_agents statistic', async () => {
        const stat = 'ccg_free_agents';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.FreeAgents);
        expect(_.keys(response).includes(stat)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat);
        expect(_.keys(response).includes(stat)).toBeTruthy();
    });

    it('getStatistics(): should return ccg_free_agents statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccg_free_agents';
        const valueName = 'call_center:ccg_free_agents';

        // Using Stats enum member
        let response = await client.callCenter.getStatistics(CallCenter.GlobalStats.FreeAgents, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getStatistics(stat, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_incalls statistic', async () => {
        const stat = 'ccf_incalls';
        const flowId = 'default';
        const valueName = `${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.Incalls, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_incalls statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccf_incalls';
        const flowId = 'default';
        const valueName = `call_center:${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.Incalls, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_dist_incall statistic', async () => {
        const stat = 'ccf_dist_incall';
        const flowId = 'default';
        const valueName = `${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.DistributedIncalls, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_dist_incall statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccf_dist_incall';
        const flowId = 'default';
        const valueName = `call_center:${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(
            CallCenter.FlowStats.DistributedIncalls,
            flowId,
            options,
        );
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_answ_incall statistic', async () => {
        const stat = 'ccf_answ_incall';
        const flowId = 'default';
        const valueName = `${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.AnsweredIncalls, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_answ_incall statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccf_answ_incall';
        const flowId = 'default';
        const valueName = `call_center:${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.AnsweredIncalls, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_aban_incall statistic', async () => {
        const stat = 'ccf_aban_incall';
        const flowId = 'default';
        const valueName = `${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.AbandonnedIncalls, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_aban_incall statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccf_aban_incall';
        const flowId = 'default';
        const valueName = `call_center:${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(
            CallCenter.FlowStats.AbandonnedIncalls,
            flowId,
            options,
        );
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_onhold_call statistic', async () => {
        const stat = 'ccf_onhold_call';
        const flowId = 'default';
        const valueName = `${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.OnholdCalls, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_onhold_call statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccf_onhold_call';
        const flowId = 'default';
        const valueName = `call_center:${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.OnholdCalls, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_queued_calls statistic', async () => {
        const stat = 'ccf_queued_calls';
        const flowId = 'default';
        const valueName = `${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.QueuedCalls, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_queued_calls statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccf_queued_calls';
        const flowId = 'default';
        const valueName = `call_center:${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.QueuedCalls, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_free_agents statistic', async () => {
        const stat = 'ccf_free_agents';
        const flowId = 'default';
        const valueName = `${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.FreeAgents, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_free_agents statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccf_free_agents';
        const flowId = 'default';
        const valueName = `call_center:${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.FreeAgents, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_etw statistic', async () => {
        const stat = 'ccf_etw';
        const flowId = 'default';
        const valueName = `${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.Etw, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_etw statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccf_etw';
        const flowId = 'default';
        const valueName = `call_center:${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.Etw, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_awt statistic', async () => {
        const stat = 'ccf_awt';
        const flowId = 'default';
        const valueName = `${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.Awt, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_awt statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccf_awt';
        const flowId = 'default';
        const valueName = `call_center:${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.Awt, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_load statistic', async () => {
        const stat = 'ccf_load';
        const flowId = 'default';
        const valueName = `${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.Load, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getFlowStatistic(): should return ccf_load statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'ccf_load';
        const flowId = 'default';
        const valueName = `call_center:${stat}-${flowId}`;

        // Using Stats enum member
        let response = await client.callCenter.getFlowStatistic(CallCenter.FlowStats.Load, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getFlowStatistic(stat, flowId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getAgentStatistic(): should return cca_dist_incalls statistic', async () => {
        const stat = 'cca_dist_incalls';
        const agentId = 'AgentA';
        const valueName = `${stat}-${agentId}`;

        // Using Stats enum member
        let response = await client.callCenter.getAgentStatistic(CallCenter.AgentStats.DistributedIncalls, agentId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getAgentStatistic(stat, agentId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getAgentStatistic(): should return cca_dist_incalls statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'cca_dist_incalls';
        const agentId = 'AgentA';
        const valueName = `call_center:${stat}-${agentId}`;

        // Using Stats enum member
        let response = await client.callCenter.getAgentStatistic(
            CallCenter.AgentStats.DistributedIncalls,
            agentId,
            options,
        );
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getAgentStatistic(stat, agentId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getAgentStatistic(): should return cca_answ_incalls statistic', async () => {
        const stat = 'cca_answ_incalls';
        const agentId = 'AgentA';
        const valueName = `${stat}-${agentId}`;

        // Using Stats enum member
        let response = await client.callCenter.getAgentStatistic(CallCenter.AgentStats.AnsweredIncalls, agentId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getAgentStatistic(stat, agentId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getAgentStatistic(): should return cca_answ_incalls statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'cca_answ_incalls';
        const agentId = 'AgentA';
        const valueName = `call_center:${stat}-${agentId}`;

        // Using Stats enum member
        let response = await client.callCenter.getAgentStatistic(
            CallCenter.AgentStats.AnsweredIncalls,
            agentId,
            options,
        );
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getAgentStatistic(stat, agentId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getAgentStatistic(): should return cca_aban_incalls statistic', async () => {
        const stat = 'cca_aban_incalls';
        const agentId = 'AgentA';
        const valueName = `${stat}-${agentId}`;

        // Using Stats enum member
        let response = await client.callCenter.getAgentStatistic(CallCenter.AgentStats.AbandonnedIncalls, agentId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getAgentStatistic(stat, agentId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getAgentStatistic(): should return cca_aban_incalls statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'cca_aban_incalls';
        const agentId = 'AgentA';
        const valueName = `call_center:${stat}-${agentId}`;

        // Using Stats enum member
        let response = await client.callCenter.getAgentStatistic(
            CallCenter.AgentStats.AbandonnedIncalls,
            agentId,
            options,
        );
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getAgentStatistic(stat, agentId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getAgentStatistic(): should return cca_att statistic', async () => {
        const stat = 'cca_att';
        const agentId = 'AgentA';
        const valueName = `${stat}-${agentId}`;

        // Using Stats enum member
        let response = await client.callCenter.getAgentStatistic(CallCenter.AgentStats.Att, agentId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getAgentStatistic(stat, agentId);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });

    it('getAgentStatistic(): should return cca_att statistic keeping the group name', async () => {
        const options = { keepGroupName: true };
        const stat = 'cca_att';
        const agentId = 'AgentA';
        const valueName = `call_center:${stat}-${agentId}`;

        // Using Stats enum member
        let response = await client.callCenter.getAgentStatistic(CallCenter.AgentStats.Att, agentId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();

        // Using statistic name
        response = await client.callCenter.getAgentStatistic(stat, agentId, options);
        expect(_.keys(response).includes(valueName)).toBeTruthy();
    });
});
