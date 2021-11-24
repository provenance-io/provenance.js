import * as provenance_metadata_v1_metadata_pb from '../proto/provenance/metadata/v1/metadata_pb';
import * as provenance_metadata_v1_objectstore_pb from '../proto/provenance/metadata/v1/objectstore_pb';
import * as provenance_metadata_v1_query_pb from '../proto/provenance/metadata/v1/query_pb';
import * as provenance_metadata_v1_scope_pb from '../proto/provenance/metadata/v1/scope_pb';
import * as provenance_metadata_v1_specification_pb from '../proto/provenance/metadata/v1/specification_pb';
import * as provenance_metadata_v1_tx_pb from '../proto/provenance/metadata/v1/tx_pb';
//import * as provenance_metadata_v1_p8e_p8e_pb from '../proto/provenance/metadata/v1/p8e/p8e_pb';

export type ContractSpecificationWrapper = provenance_metadata_v1_query_pb.ContractSpecificationWrapper.AsObject;
export type ScopeWrapper = provenance_metadata_v1_query_pb.ScopeWrapper.AsObject;
export type SessionWrapper = provenance_metadata_v1_query_pb.SessionWrapper.AsObject;
export type RecordWrapper = provenance_metadata_v1_query_pb.RecordWrapper.AsObject;
export type RecordSpecificationWrapper = provenance_metadata_v1_query_pb.RecordSpecificationWrapper.AsObject;
export type ScopeDataWrapper = {
    scope?: ScopeWrapper,
    sessionsList: Array<SessionWrapper>,
    recordsList: Array<RecordWrapper>
}
export type ContractSpecDataWrapper = {
    contractSpecification?: ContractSpecificationWrapper,
    recordSpecificationsList: Array<RecordSpecificationWrapper>
};
export type ContractRecordSpecDataWrapper = {
    recordSpecificationsList: Array<RecordSpecificationWrapper>,
    contractSpecificationUuid: string,
    contractSpecificationAddr: string
};
export type ScopeSpecificationWrapper = provenance_metadata_v1_query_pb.ScopeSpecificationWrapper.AsObject;
export type ScopeIdInfo = provenance_metadata_v1_metadata_pb.ScopeIdInfo.AsObject;
export type SessionIdInfo = provenance_metadata_v1_metadata_pb.SessionIdInfo.AsObject;
export type RecordIdInfo = provenance_metadata_v1_metadata_pb.RecordIdInfo.AsObject;
export type ScopeSpecIdInfo = provenance_metadata_v1_metadata_pb.ScopeSpecIdInfo.AsObject;
export type ContractSpecIdInfo = provenance_metadata_v1_metadata_pb.ContractSpecIdInfo.AsObject;
export type RecordSpecIdInfo = provenance_metadata_v1_metadata_pb.RecordSpecIdInfo.AsObject;
export type ObjectStoreLocator = provenance_metadata_v1_objectstore_pb.ObjectStoreLocator.AsObject;
export type OSLocatorParams = provenance_metadata_v1_objectstore_pb.OSLocatorParams.AsObject;
export type ScopeSpecification = provenance_metadata_v1_specification_pb.ScopeSpecification.AsObject;
export type ContractSpecification = provenance_metadata_v1_specification_pb.ContractSpecification.AsObject;
export type RecordSpecification = provenance_metadata_v1_specification_pb.RecordSpecification.AsObject;
export type InputSpecification = provenance_metadata_v1_specification_pb.InputSpecification.AsObject;
export type Description = provenance_metadata_v1_specification_pb.Description.AsObject;
export { DefinitionType, PartyType } from '../proto/provenance/metadata/v1/specification_pb';
export type Record = provenance_metadata_v1_scope_pb.Record.AsObject;
export type Scope = provenance_metadata_v1_scope_pb.Scope.AsObject;
export type Session = provenance_metadata_v1_scope_pb.Session.AsObject;
export type Party = provenance_metadata_v1_scope_pb.Party.AsObject;
export type SessionIdComponents = provenance_metadata_v1_tx_pb.SessionIdComponents.AsObject;
/*
export type Contract = provenance_metadata_v1_p8e_p8e_pb.Contract.AsObject;
export type ContractSpec = provenance_metadata_v1_p8e_p8e_pb.ContractSpec.AsObject;
export type ConsiderationSpec = provenance_metadata_v1_p8e_p8e_pb.ConsiderationSpec.AsObject;
export type DefinitionSpec = provenance_metadata_v1_p8e_p8e_pb.DefinitionSpec.AsObject;
export type OutputSpec = provenance_metadata_v1_p8e_p8e_pb.OutputSpec.AsObject;
export type Recitals = provenance_metadata_v1_p8e_p8e_pb.Recitals.AsObject;
export type Signature = provenance_metadata_v1_p8e_p8e_pb.Signature.AsObject;
*/
