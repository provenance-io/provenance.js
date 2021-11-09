import * as provenance_marker_v1_marker_pb from '../proto/provenance/marker/v1/marker_pb';
import * as provenance_marker_v1_query_pb from '../proto/provenance/marker/v1/query_pb';
import * as provenance_marker_v1_accessgrant_pb from '../proto/provenance/marker/v1/accessgrant_pb';
import * as provenance_marker_v1_authz_pb from '../proto/provenance/marker/v1/authz_pb';

export { Access } from '../proto/provenance/marker/v1/accessgrant_pb';
export type AccessGrant = provenance_marker_v1_accessgrant_pb.AccessGrant.AsObject;
export type Balance = provenance_marker_v1_query_pb.Balance.AsObject;
export type EventDenomUnit = provenance_marker_v1_marker_pb.EventDenomUnit.AsObject;
export type MarkerAccount = provenance_marker_v1_marker_pb.MarkerAccount.AsObject;
export { MarkerStatus, MarkerType } from '../proto/provenance/marker/v1/marker_pb';
export type MarkerTransferAuthorization = provenance_marker_v1_authz_pb.MarkerTransferAuthorization.AsObject;
export { SIPrefix } from '../proto/provenance/marker/v1/si_pb';
