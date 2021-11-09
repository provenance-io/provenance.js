import * as provenance_metadata_v1_metadata_pb from '../proto/provenance/metadata/v1/metadata_pb';
import * as provenance_metadata_v1_objectstore_pb from '../proto/provenance/metadata/v1/objectstore_pb';
import * as provenance_metadata_v1_specification_pb from '../proto/provenance/metadata/v1/specification_pb';

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
