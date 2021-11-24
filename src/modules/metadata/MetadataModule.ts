import * as grpc from 'grpc';

import { 
    Message, 
    ITxClient, 
} from '../../client';
import { IProvider } from '../../providers/IProvider';
import { 
    ContractSpecDataWrapper,
    ContractSpecification,
    ContractRecordSpecDataWrapper,
    ContractSpecificationWrapper,
    ObjectStoreLocator,
    Party,
    Record,
    RecordSpecification,
    RecordSpecificationWrapper,
    RecordWrapper,
    Scope,
    ScopeDataWrapper,
    ScopeWrapper,
    ScopeSpecification,
    ScopeSpecificationWrapper,
    Session,
    SessionWrapper,
} from '../../types';
import { MetadataAddress } from '../../utils';
import { MetadataConversionUtils } from './MetadataConversionUtils';

import { IQueryClient, QueryClient } from '../../proto/provenance/metadata/v1/query_grpc_pb';
import * as provenance_metadata_v1_query_pb from '../../proto/provenance/metadata/v1/query_pb';
import * as provenance_metadata_v1_scope_pb from '../../proto/provenance/metadata/v1/scope_pb';
import * as provenance_metadata_v1_specification_pb from '../../proto/provenance/metadata/v1/specification_pb';
import * as provenance_metadata_v1_tx_pb from '../../proto/provenance/metadata/v1/tx_pb';
import * as provenance_metadata_v1_p8e_p8e_pb from '../../proto/provenance/metadata/v1/p8e/p8e_pb';

export class MetadataModule {

    constructor(provider: IProvider, txClient: ITxClient) {
        this.provider = provider;
        this.txClient = txClient;
        this.queryClient = new QueryClient(this.provider.network.uri.toString(), grpc.credentials.createInsecure());
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // Query
    //----------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * 
     * @param scopeId 
     * @param sessionAddr 
     * @param recordAddr 
     * @param includeSessions 
     * @param includeRecords 
     * @returns 
     */
    getScope(
        scopeId: string, 
        sessionAddr: string, 
        recordAddr: string, 
        includeSessions: boolean = false, 
        includeRecords: boolean = false
    ): Promise<ScopeDataWrapper> {
        return new Promise<ScopeDataWrapper> ((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.ScopeRequest())
                .setScopeId(scopeId)
                .setSessionAddr(sessionAddr)
                .setRecordAddr(recordAddr)
                .setIncludeSessions(includeSessions)
                .setIncludeRecords(includeRecords);

            this.queryClient.scope(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.toObject());
                }
            });
        });
    }

    /**
     * 
     * @returns 
     */
    getAllScopes(): Promise<ScopeWrapper[]> {
        return new Promise<ScopeWrapper[]>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.ScopesAllRequest());

            this.queryClient.scopesAll(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var scopes: ScopeWrapper[] = [];
                    res.getScopesList().forEach((scope) => {
                        scopes.push(scope.toObject());
                    });
                    resolve(scopes);
                }
            });
        });
    }

    /**
     * 
     * @param scopeId 
     * @param sessionId 
     * @param recordAddr 
     * @param recordName 
     * @param includeScope 
     * @param includeRecords 
     * @returns 
     */
    getSessions(
        scopeId: string,
        sessionId: string,
        recordAddr: string,
        recordName: string,
        includeScope: boolean = false,
        includeRecords: boolean = false
    ): Promise<ScopeDataWrapper> {
        return new Promise<ScopeDataWrapper>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.SessionsRequest())
                .setScopeId(scopeId)
                .setSessionId(sessionId)
                .setRecordAddr(recordAddr)
                .setRecordName(recordName)
                .setIncludeScope(includeScope)
                .setIncludeRecords(includeRecords);

            this.queryClient.sessions(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.toObject());
                }
            });
        });
    }

    /**
     * 
     * @returns 
     */
    getAllSessions(): Promise<SessionWrapper[]> {
        return new Promise<SessionWrapper[]>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.SessionsAllRequest());

            this.queryClient.sessionsAll(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var sessions: SessionWrapper[] = [];
                    res.getSessionsList().forEach((session) => {
                        sessions.push(session.toObject());
                    });
                    resolve(sessions);
                }
            });
        });
    }

    /**
     * 
     * @param scopeId 
     * @param sessionId 
     * @param recordAddr 
     * @param name 
     * @param includeScope 
     * @param includeSessions 
     * @returns 
     */
    getRecord(
        scopeId: string,
        sessionId: string,
        recordAddr: string,
        name: string,
        includeScope: boolean = false,
        includeSessions: boolean = false
    ): Promise<ScopeDataWrapper> {
        return new Promise<ScopeDataWrapper>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.RecordsRequest())
                .setScopeId(scopeId)
                .setSessionId(sessionId)
                .setRecordAddr(recordAddr)
                .setName(name)
                .setIncludeScope(includeScope)
                .setIncludeSessions(includeSessions);

            this.queryClient.records(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.toObject());
                }
            });
        });
    }

    /**
     * 
     * @returns 
     */
    getAllRecords(): Promise<RecordWrapper[]> {
        return new Promise<RecordWrapper[]>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.RecordsAllRequest());

            this.queryClient.recordsAll(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var records: RecordWrapper[] = [];
                    res.getRecordsList().forEach((record) => {
                        records.push(record.toObject());
                    });
                    resolve(records);
                }
            });
        });
    }

    /**
     * 
     * @param addr 
     * @returns 
     */
    getValueOwnership(addr: string): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.ValueOwnershipRequest())
                .setAddress(addr);

            this.queryClient.valueOwnership(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getScopeUuidsList());
                }
            });
        });
    }

    /**
     * 
     * @param specId 
     * @returns 
     */
    getScopeSpec(specId: string): Promise<ScopeSpecificationWrapper> {
        return new Promise<ScopeSpecificationWrapper>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.ScopeSpecificationRequest())
                .setSpecificationId(specId);

            this.queryClient.scopeSpecification(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getScopeSpecification().toObject());
                }
            });
        });
    }

    /**
     * 
     * @returns 
     */
    getAllScopeSpecs(): Promise<ScopeSpecificationWrapper[]> {
        return new Promise<ScopeSpecificationWrapper[]>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.ScopeSpecificationsAllRequest());

            this.queryClient.scopeSpecificationsAll(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var scopeSpecs: ScopeSpecificationWrapper[] = [];
                    res.getScopeSpecificationsList().forEach((scopeSpec) => {
                        scopeSpecs.push(scopeSpec.toObject());
                    });
                    resolve(scopeSpecs);
                }
            });
        });
    }

    /**
     * 
     * @param specId 
     * @param includeRecordSpecs 
     * @returns 
     */
    getContractSpec(specId: string, includeRecordSpecs: boolean = false): Promise<ContractSpecDataWrapper> {
        return new Promise<ContractSpecDataWrapper>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.ContractSpecificationRequest())
                .setSpecificationId(specId)
                .setIncludeRecordSpecs(includeRecordSpecs);

            this.queryClient.contractSpecification(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.toObject());
                }
            });
        });
    }

    /**
     * 
     * @returns 
     */
    getAllContractSpecs(): Promise<ContractSpecificationWrapper[]> {
        return new Promise<ContractSpecificationWrapper[]>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.ContractSpecificationsAllRequest());

            this.queryClient.contractSpecificationsAll(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var contractSpecs: ContractSpecificationWrapper[] = [];
                    res.getContractSpecificationsList().forEach((contractSpec) => {
                        contractSpecs.push(contractSpec.toObject());
                    });
                    resolve(contractSpecs);
                }
            });
        });
    }

    /**
     * 
     * @param specId 
     * @returns 
     */
    getRecordSpecsForContractSpec(specId: string): Promise<ContractRecordSpecDataWrapper> {
        return new Promise<ContractRecordSpecDataWrapper>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.RecordSpecificationsForContractSpecificationRequest());

            this.queryClient.recordSpecificationsForContractSpecification(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.toObject());
                }
            });
        });
    }

    /**
     * 
     * @param specId 
     * @returns 
     */
    getRecordSpec(specId: string): Promise<RecordSpecificationWrapper> {
        return new Promise<RecordSpecificationWrapper>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.RecordSpecificationRequest())
                .setSpecificationId(specId);

            this.queryClient.recordSpecification(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getRecordSpecification().toObject());
                }
            });
        });
    }

    /**
     * 
     * @returns 
     */
     getAllRecordSpecs(): Promise<RecordSpecificationWrapper[]> {
        return new Promise<RecordSpecificationWrapper[]>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.RecordSpecificationsAllRequest());

            this.queryClient.recordSpecificationsAll(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var recordSpecs: RecordSpecificationWrapper[] = [];
                    res.getRecordSpecificationsList().forEach((recordSpec) => {
                        recordSpecs.push(recordSpec.toObject());
                    });
                    resolve(recordSpecs);
                }
            });
        });
    }

    /**
     * 
     * @param owner 
     * @returns 
     */
    getOSLocator(owner: string): Promise<ObjectStoreLocator> {
        return new Promise<ObjectStoreLocator>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.OSLocatorRequest())
                .setOwner(owner);

            this.queryClient.oSLocator(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    resolve(res.getLocator().toObject());
                }
            });
        });
    }

    /**
     * 
     * @param uri 
     * @returns 
     */
    getOSLocatorsByURI(uri: string): Promise<ObjectStoreLocator[]> {
        return new Promise<ObjectStoreLocator[]>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.OSLocatorsByURIRequest())
                .setUri(uri);

            this.queryClient.oSLocatorsByURI(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var osLocators: ObjectStoreLocator[] = [];
                    res.getLocatorsList().forEach((osLocator) => {
                        osLocators.push(osLocator.toObject());
                    });
                    resolve(osLocators);
                }
            });
        });
    }

    /**
     * 
     * @param scopeId 
     * @returns 
     */
    getOSLocatorsByScope(scopeId: string): Promise<ObjectStoreLocator[]> {
        return new Promise<ObjectStoreLocator[]>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.OSLocatorsByScopeRequest())
                .setScopeId(scopeId);

            this.queryClient.oSLocatorsByScope(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var osLocators: ObjectStoreLocator[] = [];
                    res.getLocatorsList().forEach((osLocator) => {
                        osLocators.push(osLocator.toObject());
                    });
                    resolve(osLocators);
                }
            });
        });
    }

    /**
     * 
     * @returns 
     */
    getAllOSLocators(): Promise<ObjectStoreLocator[]> {
        return new Promise<ObjectStoreLocator[]>((resolve, reject) => {
            const req = (new provenance_metadata_v1_query_pb.OSAllLocatorsRequest());

            this.queryClient.oSAllLocators(req, (err, res) => {
                if (err != null) {
                    reject(err);
                } else {
                    var osLocators: ObjectStoreLocator[] = [];
                    res.getLocatorsList().forEach((osLocator) => {
                        osLocators.push(osLocator.toObject());
                    });
                    resolve(osLocators);
                }
            });
        });
    }

    //----------------------------------------------------------------------------------------------------------------------------------------------
    // TX
    //----------------------------------------------------------------------------------------------------------------------------------------------

    /**
     * 
     * @param scopeId 
     * @param specId 
     * @param scope 
     * @param signers 
     * @returns 
     */
    writeScope(
        scopeId: string | MetadataAddress, 
        specId: string | MetadataAddress, 
        scope: Scope, 
        signers: string | string[]
    ): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        var scopeAddr = MetadataConversionUtils.scopeIdToMetadataAddress(scopeId);
        if (!scopeAddr.isScope()) {
            throw new Error(`Invalid argument scopeId: Must be a valid UUID, scope address or scope MetadataAddress`);
        }

        var scopeSpecAddr = MetadataConversionUtils.scopeSpecIdToMetadataAddress(specId);
        if (!scopeSpecAddr.isScopeSpec()) {
            throw new Error(`Invalid argument specId: Must be a valid UUID, scope spec address or scope spec MetadataAddress`);
        }

        var scopeOwners: provenance_metadata_v1_scope_pb.Party[] = [];
        scope.ownersList.forEach((owner) => {
            scopeOwners.push((new provenance_metadata_v1_scope_pb.Party())
                .setAddress(owner.address)
                .setRole(owner.role)
            );
        });

        const req = (new provenance_metadata_v1_tx_pb.MsgWriteScopeRequest())
            .setScopeUuid(scopeAddr.getPrimaryUuid())
            .setSpecUuid(scopeSpecAddr.getPrimaryUuid())
            .setScope((new provenance_metadata_v1_scope_pb.Scope())
                .setScopeId(scopeAddr.bytes)
                .setSpecificationId(scopeSpecAddr.bytes)
                .setValueOwnerAddress(scope.valueOwnerAddress)
                .setOwnersList(scopeOwners)
                .setDataAccessList(scope.dataAccessList)
            )
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param scopeId 
     * @param signers 
     * @returns 
     */
    deleteScope(scopeId: string | MetadataAddress, signers: string | string[]): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        var scopeAddress = MetadataConversionUtils.scopeIdToMetadataAddress(scopeId);
        if (!scopeAddress.isScope()) {
            throw new Error(`Invalid argument scopeId: Must be a valid UUID, scope address or scope MetadataAddress`);
        }

        const req = (new provenance_metadata_v1_tx_pb.MsgDeleteScopeRequest())
            .setScopeId(scopeAddress.bytes)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param scopeId 
     * @param accessors 
     * @param signers 
     * @returns 
     */
    addScopeDataAccess(
        scopeId: string, 
        accessors: string | string[], 
        signers: string | string[]
    ): Message {
        if (typeof accessors === 'string') {
            accessors = [(accessors as string)];
        }

        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        const req = (new provenance_metadata_v1_tx_pb.MsgAddScopeDataAccessRequest())
            .setScopeId(scopeId)
            .setDataAccessList(accessors)
            .setSignersList(signers);
        
        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param scopeId 
     * @param accessors 
     * @param signers 
     * @returns 
     */
    deleteScopeDataAccess(
        scopeId: string, 
        accessors: string | string[], 
        signers: string | string[]
    ): Message {
        if (typeof accessors === 'string') {
            accessors = [(accessors as string)];
        }

        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        const req = (new provenance_metadata_v1_tx_pb.MsgDeleteScopeDataAccessRequest())
            .setScopeId(scopeId)
            .setDataAccessList(accessors)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param scopeId 
     * @param owners 
     * @param signers 
     * @returns 
     */
    addScopeOwner(
        scopeId: string, 
        owners: Party | Party[], 
        signers: string | string[]
    ): Message {
        var scopeOwners: provenance_metadata_v1_scope_pb.Party[] = [];
        if (owners.constructor.name !== 'Array') {
            owners = [(owners as Party)];
        }
        (owners as Party[]).forEach((owner) => {
            scopeOwners.push((new provenance_metadata_v1_scope_pb.Party())
                .setAddress(owner.address)
                .setRole(owner.role)
            );
        });

        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        const req = (new provenance_metadata_v1_tx_pb.MsgAddScopeOwnerRequest())
            .setScopeId(scopeId)
            .setOwnersList(scopeOwners)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param scopeId 
     * @param owners 
     * @param signers 
     * @returns 
     */
    deleteScopeOwner(
        scopeId: string, 
        owners: string | string[], 
        signers: string | string[]
    ): Message {
        if (typeof owners === 'string') {
            owners = [(owners as string)];
        }

        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        const req = (new provenance_metadata_v1_tx_pb.MsgDeleteScopeOwnerRequest())
            .setScopeId(scopeId)
            .setOwnersList(owners)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param scopeId 
     * @param sessionId 
     * @param specId 
     * @param session 
     * @param signers 
     * @returns 
     */
    writeSession(
        scopeId: string, 
        sessionId: string, 
        specId: string, 
        session: Session, 
        signers: string | string[]
    ): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        var audit = undefined;
        if (session.audit !== undefined) {
            audit = (new provenance_metadata_v1_scope_pb.AuditFields())
                .setVersion(session.audit.version)
                .setMessage(session.audit.message)
                .setCreatedBy(session.audit.createdBy)
                .setCreatedDate(session.audit.createdDate)
                .setUpdatedBy(session.audit.updatedBy)
                .setUpdatedDate(session.audit.updatedDate);
        }

        var parties: provenance_metadata_v1_scope_pb.Party[] = [];
        session.partiesList.forEach((party) => {
            parties.push((new provenance_metadata_v1_scope_pb.Party())
                .setAddress(party.address)
                .setRole(party.role)
            );
        });

        const req = (new provenance_metadata_v1_tx_pb.MsgWriteSessionRequest())
            .setSpecUuid(specId)
            .setSessionIdComponents((new provenance_metadata_v1_tx_pb.SessionIdComponents())
                .setSessionUuid(sessionId)
                .setScopeUuid(scopeId)
            )
            .setSession((new provenance_metadata_v1_scope_pb.Session())
                .setSessionId(session.sessionId)
                .setName(session.name)
                .setContext(session.context)
                .setSpecificationId(session.specificationId)
                .setPartiesList(parties)
                .setAudit(audit)
            )
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param scopeId 
     * @param sessionId 
     * @param contractSpecId 
     * @param parties 
     * @param record 
     * @param signers 
     * @returns 
     */
    writeRecord(
        scopeId: string, 
        sessionId: string, 
        contractSpecId: string,
        parties: Party | Party[],
        record: Record, 
        signers: string | string[]
    ): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        var partiesList: provenance_metadata_v1_scope_pb.Party[] = [];
        if (parties.constructor.name !== 'Array') {
            parties = [(parties as Party)];
        }
        (parties as Party[]).forEach((party) => {
            partiesList.push((new provenance_metadata_v1_scope_pb.Party())
                .setAddress(party.address)
                .setRole(party.role)
            );
        });

        var process = undefined;
        if (record.process !== undefined) {
            process = (new provenance_metadata_v1_scope_pb.Process())
                .setAddress(record.process.address)
                .setHash(record.process.hash)
                .setMethod(record.process.method)
                .setName(record.process.name);
        }

        var inputs: provenance_metadata_v1_scope_pb.RecordInput[] = []
        record.inputsList.forEach((input) => {
            inputs.push((new provenance_metadata_v1_scope_pb.RecordInput())
                .setRecordId(input.recordId)
                .setName(input.name)
                .setHash(input.hash)
                .setStatus(input.status)
                .setTypeName(input.typeName)
            );
        });

        var outputs: provenance_metadata_v1_scope_pb.RecordOutput[] = []
        record.outputsList.forEach((output) => {
            outputs.push((new provenance_metadata_v1_scope_pb.RecordOutput())
                .setHash(output.hash)
                .setStatus(output.status)
            );
        });

        const req = (new provenance_metadata_v1_tx_pb.MsgWriteRecordRequest())
            .setContractSpecUuid(contractSpecId)
            .setSessionIdComponents((new provenance_metadata_v1_tx_pb.SessionIdComponents())
                .setSessionUuid(sessionId)
                .setScopeUuid(scopeId)
            )
            .setPartiesList(partiesList)
            .setRecord((new provenance_metadata_v1_scope_pb.Record())
                .setName(record.name)
                .setSessionId(record.sessionId)
                .setSpecificationId(record.specificationId)
                .setProcess(process)
                .setInputsList(inputs)
                .setOutputsList(outputs)
            )
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param recordId 
     * @param signers 
     * @returns 
     */
    deleteRecord(recordId: string, signers: string | string[]): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        const req = (new provenance_metadata_v1_tx_pb.MsgDeleteRecordRequest())
            .setRecordId(recordId)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param specId 
     * @param spec 
     * @param signers 
     * @returns 
     */
     writeScopeSpec(
        specId: string | MetadataAddress, 
        spec: ScopeSpecification, 
        signers: string | string[]
    ): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        var specAddr = MetadataConversionUtils.scopeSpecIdToMetadataAddress(specId);
        if (!specAddr.isScopeSpec()) {
            throw new Error(`Invalid argument specId: Must be a valid UUID, scope spec address or scope spec MetadataAddress`);
        }

        var description = undefined;
        if (spec.description !== undefined) {
            description = (new provenance_metadata_v1_specification_pb.Description())
                .setDescription(spec.description.description)
                .setIconUrl(spec.description.iconUrl)
                .setName(spec.description.name)
                .setWebsiteUrl(spec.description.websiteUrl);
        }

        var scopeSpec = (new provenance_metadata_v1_specification_pb.ScopeSpecification())
            .setSpecificationId(specAddr.bytes)
            .setDescription(description)
            .setContractSpecIdsList(spec.contractSpecIdsList)
            .setOwnerAddressesList(spec.ownerAddressesList)
            .setPartiesInvolvedList(spec.partiesInvolvedList);

        const req = (new provenance_metadata_v1_tx_pb.MsgWriteScopeSpecificationRequest())
            .setSpecUuid(specAddr.getPrimaryUuid())
            .setSpecification(scopeSpec)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param specId 
     * @param signers 
     * @returns 
     */
    deleteScopeSpec(specId: string, signers: string | string[]): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        const req = (new provenance_metadata_v1_tx_pb.MsgDeleteScopeSpecificationRequest())
            .setSpecificationId(specId)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param specId 
     * @param spec 
     * @param signers 
     * @returns 
     */
     writeContractSpec(
        specId: string | MetadataAddress, 
        spec: ContractSpecification, 
        signers: string | string[]
    ): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        var specAddr = MetadataConversionUtils.contractSpecIdToMetadataAddress(specId);
        if (!specAddr.isContractSpec()) {
            throw new Error(`Invalid argument specId: Must be a valid UUID, contract spec address or contract spec MetadataAddress`);
        }

        var description = undefined;
        if (spec.description !== undefined) {
            description = (new provenance_metadata_v1_specification_pb.Description())
                .setDescription(spec.description.description)
                .setIconUrl(spec.description.iconUrl)
                .setName(spec.description.name)
                .setWebsiteUrl(spec.description.websiteUrl);
        }

        var contractSpec = (new provenance_metadata_v1_specification_pb.ContractSpecification())
            .setSpecificationId(specAddr.bytes)
            .setClassName(spec.className)
            .setDescription(description)
            .setHash(spec.hash)
            .setResourceId(spec.resourceId)
            .setOwnerAddressesList(spec.ownerAddressesList)
            .setPartiesInvolvedList(spec.partiesInvolvedList);

        const req = (new provenance_metadata_v1_tx_pb.MsgWriteContractSpecificationRequest())
            .setSpecUuid(specAddr.getPrimaryUuid())
            .setSpecification(contractSpec)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param specId 
     * @param signers 
     * @returns 
     */
    deleteContractSpec(specId: string, signers: string | string[]): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        const req = (new provenance_metadata_v1_tx_pb.MsgDeleteContractSpecificationRequest())
            .setSpecificationId(specId)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param scopeId 
     * @param contractSpecId 
     * @param signers 
     * @returns 
     */
    addContractSpecToScopeSpec(
        scopeSpecId: string, 
        contractSpecId: string, 
        signers: string | string[]
    ): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        const req = (new provenance_metadata_v1_tx_pb.MsgAddContractSpecToScopeSpecRequest())
            .setScopeSpecificationId(scopeSpecId)
            .setContractSpecificationId(contractSpecId)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param scopeSpecId 
     * @param contractSpecId 
     * @param signers 
     * @returns 
     */
    deleteContractSpecFromScopeSpec(
        scopeSpecId: string, 
        contractSpecId: string, 
        signers: string | string[]
    ): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        const req = (new provenance_metadata_v1_tx_pb.MsgDeleteContractSpecFromScopeSpecRequest())
            .setScopeSpecificationId(scopeSpecId)
            .setContractSpecificationId(contractSpecId)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param contractSpecId 
     * @param spec 
     * @param signers 
     * @returns 
     */
    writeRecordSpec(
        contractSpecId: string | MetadataAddress, 
        spec: RecordSpecification,
        signers: string | string[]
    ): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        var contractSpecAddr = MetadataConversionUtils.contractSpecIdToMetadataAddress(contractSpecId);
        if (!contractSpecAddr.isContractSpec()) {
            throw new Error(`Invalid argument contractSpecId: Must be a valid UUID, contract spec address or contract spec MetadataAddress`);
        }

        var inputs: provenance_metadata_v1_specification_pb.InputSpecification[] = [];
        spec.inputsList.forEach((input) => {
            inputs.push((new provenance_metadata_v1_specification_pb.InputSpecification())
                .setRecordId(input.recordId)
                .setName(input.name)
                .setTypeName(input.typeName)
                .setHash(input.hash)
            );
        });

        var recordSpec = (new provenance_metadata_v1_specification_pb.RecordSpecification())
            .setSpecificationId(spec.specificationId)
            .setName(spec.name)
            .setTypeName(spec.typeName)
            .setResultType(spec.resultType)
            .setInputsList(inputs)
            .setResponsiblePartiesList(spec.responsiblePartiesList);

        const req = (new provenance_metadata_v1_tx_pb.MsgWriteRecordSpecificationRequest())
            .setContractSpecUuid(contractSpecAddr.getPrimaryUuid())
            .setSpecification(recordSpec)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param specId 
     * @param signers 
     * @returns 
     */
    deleteRecordSpec(specId: string, signers: string | string[]): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        const req = (new provenance_metadata_v1_tx_pb.MsgDeleteRecordSpecificationRequest())
            .setSpecificationId(specId)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param spec 
     * @param signers 
     * @returns 
     */
    /*
    writeP8eContractSpec(spec: ContractSpec, signers: string | string[]): Message {
        if (typeof signers === 'string') {
            signers = [(signers as string)];
        }

        var conditionSpecs: provenance_metadata_v1_p8e_p8e_pb.ConditionSpec[] = [];
        spec.conditionSpecsList.forEach((spec) => {
            var inputSpecs: provenance_metadata_v1_p8e_p8e_pb.DefinitionSpec[] = [];
            spec.inputSpecsList.forEach((inputSpec) => {
                inputSpecs.push(MetadataConversionUtils.definitionSpecFromObject(inputSpec));
            });

            conditionSpecs.push((new provenance_metadata_v1_p8e_p8e_pb.ConditionSpec())
                .setFuncName(spec.funcName)
                .setInputSpecsList(inputSpecs)
                .setOutputSpec(MetadataConversionUtils.outputSpecFromObject(spec.outputSpec))
            );
        });

        var considerationSpecs: provenance_metadata_v1_p8e_p8e_pb.ConsiderationSpec[] = [];
        spec.considerationSpecsList.forEach((spec) => {
            considerationSpecs.push(MetadataConversionUtils.considerationSpecFromObject(spec));
        });

        var inputSpecs: provenance_metadata_v1_p8e_p8e_pb.DefinitionSpec[] = [];
        spec.inputSpecsList.forEach((spec) => {
            inputSpecs.push(MetadataConversionUtils.definitionSpecFromObject(spec));
        });

        var contractSpec = (new provenance_metadata_v1_p8e_p8e_pb.ContractSpec())
            .setDefinition(MetadataConversionUtils.definitionSpecFromObject(spec.definition))
            .setConditionSpecsList(conditionSpecs)
            .setConsiderationSpecsList(considerationSpecs)
            .setInputSpecsList(inputSpecs)
            .setPartiesInvolvedList(spec.partiesInvolvedList);

        const req = (new provenance_metadata_v1_tx_pb.MsgWriteP8eContractSpecRequest())
            .setContractspec(contractSpec)
            .setSignersList(signers);

        return new Message([req], this.txClient);
    }
    */

    /**
     * 
     * @param scopeId 
     * @param scopeSpecId 
     * @param groupId 
     * @param contract 
     * @param invoker 
     * @param recitals 
     * @param signatures 
     * @returns 
     */
    /*
    p8eMemorializeContract(
        scopeId: string, 
        scopeSpecId: string, 
        groupId: string, 
        contract: Contract,
        invoker: string,
        recitals: Recitals,
        signatures: Signature[]
    ): Message {
        const signatureSet = (new provenance_metadata_v1_p8e_p8e_pb.SignatureSet());
        signatures.forEach((signature, idx) => {
            signatureSet.addSignatures(MetadataConversionUtils.signatureFromObject(signature), idx);
        });

        const req = (new provenance_metadata_v1_tx_pb.MsgP8eMemorializeContractRequest())
            .setContract(MetadataConversionUtils.contractFromObject(contract))
            .setGroupId(groupId)
            .setScopeId(scopeId)
            .setScopeSpecificationId(scopeSpecId)
            .setInvoker(invoker)
            .setRecitals(recitals)
            .setSignatures(signatureSet);

        return new Message([req], this.txClient);
    }
    */

    /**
     * 
     * @param locator 
     * @returns 
     */
    bindOSLocator(locator: ObjectStoreLocator): Message {
        const req = (new provenance_metadata_v1_tx_pb.MsgBindOSLocatorRequest())
            .setLocator(MetadataConversionUtils.objectStoreLocatorFromObject(locator));

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param locator 
     * @returns 
     */
    deleteOSLocator(locator: ObjectStoreLocator): Message {
        const req = (new provenance_metadata_v1_tx_pb.MsgDeleteOSLocatorRequest())
            .setLocator(MetadataConversionUtils.objectStoreLocatorFromObject(locator));

        return new Message([req], this.txClient);
    }

    /**
     * 
     * @param locator 
     * @returns 
     */
    modifyOSLocator(locator: ObjectStoreLocator): Message {
        const req = (new provenance_metadata_v1_tx_pb.MsgModifyOSLocatorRequest())
            .setLocator(MetadataConversionUtils.objectStoreLocatorFromObject(locator));

        return new Message([req], this.txClient);
    }

    protected readonly provider: IProvider;
    protected readonly txClient: ITxClient;
    protected readonly queryClient: IQueryClient;

};
