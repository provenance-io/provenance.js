import * as cosmos_auth_v1beta1_auth_pb from '../proto/cosmos/auth/v1beta1/auth_pb';

import * as cosmos_bank_v1beta1_bank_pb from '../proto/cosmos/bank/v1beta1/bank_pb';
import * as cosmos_bank_v1beta1_tx_pb from '../proto/cosmos/bank/v1beta1/tx_pb';

import * as cosmos_crypto_secp256k1_keys_pb from '../proto/cosmos/crypto/secp256k1/keys_pb';

import * as cosmwasm_wasm_v1_query_pb from "../proto/cosmwasm/wasm/v1/query_pb";
import * as cosmwasm_wasm_v1_tx_pb from "../proto/cosmwasm/wasm/v1/tx_pb";

import * as provenance_attribute_v1_attribute_pb from '../proto/provenance/attribute/v1/attribute_pb';
import * as provenance_attribute_v1_query_pb from '../proto/provenance/attribute/v1/query_pb';
import * as provenance_attribute_v1_tx_pb from '../proto/provenance/attribute/v1/tx_pb';

import * as provenance_marker_v1_accessgrant_pb from '../proto/provenance/marker/v1/accessgrant_pb';
import * as provenance_marker_v1_authz_pb from '../proto/provenance/marker/v1/authz_pb';
import * as provenance_marker_v1_marker_pb from '../proto/provenance/marker/v1/marker_pb';
import * as provenance_marker_v1_proposals_pb from '../proto/provenance/marker/v1/proposals_pb';
import * as provenance_marker_v1_query_pb from '../proto/provenance/marker/v1/query_pb';
import * as provenance_marker_v1_tx_pb from '../proto/provenance/marker/v1/tx_pb';

import * as provenance_metadata_v1_events_pb from '../proto/provenance/metadata/v1/events_pb';
import * as provenance_metadata_v1_metadata_pb from '../proto/provenance/metadata/v1/metadata_pb';
import * as provenance_metadata_v1_objectstore_pb from '../proto/provenance/metadata/v1/objectstore_pb';
import * as provenance_metadata_v1_p8e_p8e_pb from '../proto/provenance/metadata/v1/p8e/p8e_pb';
import * as provenance_metadata_v1_query_pb from '../proto/provenance/metadata/v1/query_pb';
import * as provenance_metadata_v1_scope_pb from '../proto/provenance/metadata/v1/scope_pb';
import * as provenance_metadata_v1_specification_pb from '../proto/provenance/metadata/v1/specification_pb';
import * as provenance_metadata_v1_tx_pb from '../proto/provenance/metadata/v1/tx_pb';

import * as provenance_name_v1_name_pb from '../proto/provenance/name/v1/name_pb';
import * as provenance_name_v1_query_pb from '../proto/provenance/name/v1/query_pb';
import * as provenance_name_v1_tx_pb from '../proto/provenance/name/v1/tx_pb';

const COSMOS_AUTH_V1BETA1_TYPE_PACKAGE = 'cosmos.auth.v1beta1';
const COSMOS_BANK_V1BETA1_TYPE_PACKAGE = 'cosmos.bank.v1beta1';
const COSMOS_CRYPTO_SECP256K1_TYPE_PACKAGE = 'cosmos.crypto.secp256k1';

const COSMWASM_WASM_V1_TYPE_PACKAGE = 'cosmwasm.wasm.v1';

const PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE = 'provenance.attribute.v1';
const PROVENANCE_MARKER_V1_TYPE_PACKAGE = 'provenance.marker.v1';
const PROVENANCE_METADATA_V1_TYPE_PACKAGE = 'provenance.metadata.v1';
const PROVENANCE_NAME_V1_TYPE_PACKAGE = 'provenance.name.v1';

export const MessageTypeMap = [

    // cosmos.auth.v1beta1/auth.proto
    {
        type: cosmos_auth_v1beta1_auth_pb.BaseAccount,
        typeUrl: `${COSMOS_AUTH_V1BETA1_TYPE_PACKAGE}.BaseAccount`
    },
    {
        type: cosmos_auth_v1beta1_auth_pb.ModuleAccount,
        typeUrl: `${COSMOS_AUTH_V1BETA1_TYPE_PACKAGE}.ModuleAccount`
    },
    {
        type: cosmos_auth_v1beta1_auth_pb.Params,
        typeUrl: `${COSMOS_AUTH_V1BETA1_TYPE_PACKAGE}.Params`
    },

    // cosmos.bank.v1beta1/bank.proto
    {
        type: cosmos_bank_v1beta1_bank_pb.DenomUnit,
        typeUrl: `${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.DenomUnit`
    },
    {
        type: cosmos_bank_v1beta1_bank_pb.Input,
        typeUrl: `${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.Input`
    },
    {
        type: cosmos_bank_v1beta1_bank_pb.Metadata,
        typeUrl: `${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.Metadata`
    },
    {
        type: cosmos_bank_v1beta1_bank_pb.Output,
        typeUrl: `${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.Output`
    },
    {
        type: cosmos_bank_v1beta1_bank_pb.Params,
        typeUrl: `${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.Params`
    },
    {
        type: cosmos_bank_v1beta1_bank_pb.SendEnabled,
        typeUrl: `${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.SendEnabled`
    },
    {
        type: cosmos_bank_v1beta1_bank_pb.Supply,
        typeUrl: `${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.Supply`
    },

    // cosmos.bank.v1beta1/tx.proto
    {
        type: cosmos_bank_v1beta1_tx_pb.MsgMultiSend,
        typeUrl: `${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.MsgMultiSend`
    },
    {
        type: cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse,
        typeUrl: `${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.MsgMultiSendResponse`
    },
    {
        type: cosmos_bank_v1beta1_tx_pb.MsgSend,
        typeUrl: `${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.MsgSend`
    },
    {
        type: cosmos_bank_v1beta1_tx_pb.MsgSendResponse,
        typeUrl: `${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.MsgSendResponse`
    },

    // cosmos.crypto.secp256k1/keys.proto
    {
        type: cosmos_crypto_secp256k1_keys_pb.PrivKey,
        typeUrl: `${COSMOS_CRYPTO_SECP256K1_TYPE_PACKAGE}.PrivKey`
    },
    {
        type: cosmos_crypto_secp256k1_keys_pb.PubKey,
        typeUrl: `${COSMOS_CRYPTO_SECP256K1_TYPE_PACKAGE}.PubKey`
    },

    // cosmwasm.wasm.v1/query.proto
    {
        type: cosmwasm_wasm_v1_query_pb.CodeInfoResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.CodeInfoResponse`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryAllContractStateRequest,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryAllContractStateRequest`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryAllContractStateResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryAllContractStateResponse`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryCodeRequest,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryCodeRequest`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryCodeResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryCodeResponse`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryCodesRequest,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryCodesRequest`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryCodesResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryCodesResponse`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryContractHistoryRequest,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryContractHistoryRequest`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryContractHistoryResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryContractHistoryResponse`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryContractInfoRequest,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryContractInfoRequest`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryContractInfoResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryContractInfoResponse`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryContractsByCodeRequest,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryContractsByCodeRequest`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryContractsByCodeResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryContractsByCodeResponse`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryRawContractStateRequest,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryRawContractStateRequest`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QueryRawContractStateResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryRawContractStateResponse`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QuerySmartContractStateRequest,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QuerySmartContractStateRequest`
    },
    {
        type: cosmwasm_wasm_v1_query_pb.QuerySmartContractStateResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.QuerySmartContractStateResponse`
    },

    // cosmwasm.wasm.v1/tx.proto
    {
        type: cosmwasm_wasm_v1_tx_pb.MsgClearAdmin,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgClearAdmin`
    },
    {
        type: cosmwasm_wasm_v1_tx_pb.MsgClearAdminResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgClearAdminResponse`
    },
    {
        type: cosmwasm_wasm_v1_tx_pb.MsgExecuteContract,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgExecuteContract`
    },
    {
        type: cosmwasm_wasm_v1_tx_pb.MsgExecuteContractResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgExecuteContractResponse`
    },
    {
        type: cosmwasm_wasm_v1_tx_pb.MsgInstantiateContract,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgInstantiateContract`
    },
    {
        type: cosmwasm_wasm_v1_tx_pb.MsgInstantiateContractResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgInstantiateContractResponse`
    },
    {
        type: cosmwasm_wasm_v1_tx_pb.MsgMigrateContract,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgMigrateContract`
    },
    {
        type: cosmwasm_wasm_v1_tx_pb.MsgMigrateContractResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgMigrateContractResponse`
    },
    {
        type: cosmwasm_wasm_v1_tx_pb.MsgStoreCode,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgStoreCode`
    },
    {
        type: cosmwasm_wasm_v1_tx_pb.MsgStoreCodeResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgStoreCodeResponse`
    },
    {
        type: cosmwasm_wasm_v1_tx_pb.MsgUpdateAdmin,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgUpdateAdmin`
    },
    {
        type: cosmwasm_wasm_v1_tx_pb.MsgUpdateAdminResponse,
        typeUrl: `${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgUpdateAdminResponse`
    },

    // provenance.attribute.v1/attribute.proto
    {
        type: provenance_attribute_v1_attribute_pb.Attribute,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.Attribute`
    },
    {
        type: provenance_attribute_v1_attribute_pb.EventAttributeAdd,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.EventAttributeAdd`
    },
    {
        type: provenance_attribute_v1_attribute_pb.EventAttributeDelete,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.EventAttributeDelete`
    },
    {
        type: provenance_attribute_v1_attribute_pb.EventAttributeDistinctDelete,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.EventAttributeDistinctDelete`
    },
    {
        type: provenance_attribute_v1_attribute_pb.EventAttributeUpdate,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.EventAttributeUpdate`
    },
    {
        type: provenance_attribute_v1_attribute_pb.Params,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.Params`
    },

    // provenance.attribute.v1/query.proto
    {
        type: provenance_attribute_v1_query_pb.QueryAttributeRequest,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryAttributeRequest`
    },
    {
        type: provenance_attribute_v1_query_pb.QueryAttributeResponse,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryAttributeResponse`
    },
    {
        type: provenance_attribute_v1_query_pb.QueryAttributesRequest,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryAttributesRequest`
    },
    {
        type: provenance_attribute_v1_query_pb.QueryAttributesResponse,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryAttributesResponse`
    },
    {
        type: provenance_attribute_v1_query_pb.QueryParamsRequest,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryParamsRequest`
    },
    {
        type: provenance_attribute_v1_query_pb.QueryParamsResponse,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryParamsResponse`
    },
    {
        type: provenance_attribute_v1_query_pb.QueryScanRequest,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryScanRequest`
    },
    {
        type: provenance_attribute_v1_query_pb.QueryScanResponse,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryScanResponse`
    },

    // provenance.attribute.v1/tx.proto
    {
        type: provenance_attribute_v1_tx_pb.MsgAddAttributeRequest,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgAddAttributeRequest`
    },
    {
        type: provenance_attribute_v1_tx_pb.MsgAddAttributeResponse,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgAddAttributeResponse`
    },
    {
        type: provenance_attribute_v1_tx_pb.MsgDeleteAttributeRequest,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgDeleteAttributeRequest`
    },
    {
        type: provenance_attribute_v1_tx_pb.MsgDeleteAttributeResponse,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgDeleteAttributeResponse`
    },
    {
        type: provenance_attribute_v1_tx_pb.MsgDeleteDistinctAttributeRequest,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgDeleteDistinctAttributeRequest`
    },
    {
        type: provenance_attribute_v1_tx_pb.MsgDeleteDistinctAttributeResponse,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgDeleteDistinctAttributeResponse`
    },
    {
        type: provenance_attribute_v1_tx_pb.MsgUpdateAttributeRequest,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgUpdateAttributeRequest`
    },
    {
        type: provenance_attribute_v1_tx_pb.MsgUpdateAttributeResponse,
        typeUrl: `${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgUpdateAttributeResponse`
    },

    // provenance.marker.v1/accessgrant.proto
    {
        type: provenance_marker_v1_accessgrant_pb.AccessGrant,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.AccessGrant`
    },

    // provenance.marker.v1/authz.proto
    {
        type: provenance_marker_v1_authz_pb.MarkerTransferAuthorization,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MarkerTransferAuthorization`
    },

    // provenance.marker.v1/marker.proto
    {
        type: provenance_marker_v1_marker_pb.EventDenomUnit,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventDenomUnit`
    },
    {
        type: provenance_marker_v1_marker_pb.EventMarkerAccess,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerAccess`
    },
    {
        type: provenance_marker_v1_marker_pb.EventMarkerActivate,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerActivate`
    },
    {
        type: provenance_marker_v1_marker_pb.EventMarkerAdd,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerAdd`
    },
    {
        type: provenance_marker_v1_marker_pb.EventMarkerAddAccess,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerAddAccess`
    },
    {
        type: provenance_marker_v1_marker_pb.EventMarkerBurn,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerBurn`
    },
    {
        type: provenance_marker_v1_marker_pb.EventMarkerCancel,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerCancel`
    },
    {
        type: provenance_marker_v1_marker_pb.EventMarkerDelete,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerDelete`
    },
    {
        type: provenance_marker_v1_marker_pb.EventMarkerDeleteAccess,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerDeleteAccess`
    },
    {
        type: provenance_marker_v1_marker_pb.EventMarkerFinalize,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerFinalize`
    },
    {
        type: provenance_marker_v1_marker_pb.EventMarkerMint,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerMint`
    },
    {
        type: provenance_marker_v1_marker_pb.EventMarkerSetDenomMetadata,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerSetDenomMetadata`
    },
    {
        type: provenance_marker_v1_marker_pb.EventMarkerTransfer,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerTransfer`
    },
    {
        type: provenance_marker_v1_marker_pb.EventMarkerWithdraw,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerWithdraw`
    },
    {
        type: provenance_marker_v1_marker_pb.MarkerAccount,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MarkerAccount`
    },
    {
        type: provenance_marker_v1_marker_pb.Params,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.Params`
    },

    // provenance.marker.v1/proposals.proto
    {
        type: provenance_marker_v1_proposals_pb.AddMarkerProposal,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.AddMarkerProposal`
    },
    {
        type: provenance_marker_v1_proposals_pb.ChangeStatusProposal,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.ChangeStatusProposal`
    },
    {
        type: provenance_marker_v1_proposals_pb.RemoveAdministratorProposal,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.RemoveAdministratorProposal`
    },
    {
        type: provenance_marker_v1_proposals_pb.SetAdministratorProposal,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.SetAdministratorProposal`
    },
    {
        type: provenance_marker_v1_proposals_pb.SetDenomMetadataProposal,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.SetDenomMetadataProposal`
    },
    {
        type: provenance_marker_v1_proposals_pb.SupplyDecreaseProposal,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.SupplyDecreaseProposal`
    },
    {
        type: provenance_marker_v1_proposals_pb.SupplyIncreaseProposal,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.SupplyIncreaseProposal`
    },
    {
        type: provenance_marker_v1_proposals_pb.WithdrawEscrowProposal,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.WithdrawEscrowProposal`
    },

    // provenance.marker.v1/query.proto
    {
        type: provenance_marker_v1_query_pb.Balance,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.Balance`
    },
    {
        type: provenance_marker_v1_query_pb.QueryAccessRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryAccessRequest`
    },
    {
        type: provenance_marker_v1_query_pb.QueryAccessResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryAccessResponse`
    },
    {
        type: provenance_marker_v1_query_pb.QueryAllMarkersRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryAllMarkersRequest`
    },
    {
        type: provenance_marker_v1_query_pb.QueryAllMarkersResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryAllMarkersResponse`
    },
    {
        type: provenance_marker_v1_query_pb.QueryDenomMetadataRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryDenomMetadataRequest`
    },
    {
        type: provenance_marker_v1_query_pb.QueryDenomMetadataResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryDenomMetadataResponse`
    },
    {
        type: provenance_marker_v1_query_pb.QueryEscrowRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryEscrowRequest`
    },
    {
        type: provenance_marker_v1_query_pb.QueryEscrowResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryEscrowResponse`
    },
    {
        type: provenance_marker_v1_query_pb.QueryHoldingRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryHoldingRequest`
    },
    {
        type: provenance_marker_v1_query_pb.QueryHoldingResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryHoldingResponse`
    },
    {
        type: provenance_marker_v1_query_pb.QueryMarkerRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryMarkerRequest`
    },
    {
        type: provenance_marker_v1_query_pb.QueryMarkerResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryMarkerResponse`
    },
    {
        type: provenance_marker_v1_query_pb.QueryParamsRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryParamsRequest`
    },
    {
        type: provenance_marker_v1_query_pb.QueryParamsResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryParamsResponse`
    },
    {
        type: provenance_marker_v1_query_pb.QuerySupplyRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QuerySupplyRequest`
    },
    {
        type: provenance_marker_v1_query_pb.QuerySupplyResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QuerySupplyResponse`
    },

    // provenance.marker.v1/tx.proto
    {
        type: provenance_marker_v1_tx_pb.MsgActivateRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgActivateRequest`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgActivateResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgActivateResponse`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgAddAccessRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgAddAccessRequest`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgAddAccessResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgAddAccessResponse`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgAddMarkerRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgAddMarkerRequest`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgAddMarkerResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgAddMarkerResponse`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgBurnRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgBurnRequest`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgBurnResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgBurnResponse`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgCancelRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgCancelRequest`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgCancelResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgCancelResponse`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgDeleteAccessRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgDeleteAccessRequest`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgDeleteAccessResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgDeleteAccessResponse`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgDeleteRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgDeleteRequest`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgDeleteResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgDeleteResponse`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgFinalizeRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgFinalizeRequest`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgFinalizeResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgFinalizeResponse`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgMintRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgMintRequest`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgMintResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgMintResponse`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgSetDenomMetadataRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgSetDenomMetadataRequest`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgSetDenomMetadataResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgSetDenomMetadataResponse`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgTransferRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgTransferRequest`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgTransferResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgTransferResponse`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgWithdrawRequest,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgWithdrawRequest`
    },
    {
        type: provenance_marker_v1_tx_pb.MsgWithdrawResponse,
        typeUrl: `${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgWithdrawResponse`
    },

    // provenance.metadata.v1/events.proto
    {
        type: provenance_metadata_v1_events_pb.EventContractSpecificationCreated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventContractSpecificationCreated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventContractSpecificationDeleted,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventContractSpecificationDeleted`
    },
    {
        type: provenance_metadata_v1_events_pb.EventContractSpecificationUpdated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventContractSpecificationUpdated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventOSLocatorCreated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventOSLocatorCreated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventOSLocatorDeleted,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventOSLocatorDeleted`
    },
    {
        type: provenance_metadata_v1_events_pb.EventOSLocatorUpdated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventOSLocatorUpdated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventRecordCreated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventRecordCreated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventRecordDeleted,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventRecordDeleted`
    },
    {
        type: provenance_metadata_v1_events_pb.EventRecordSpecificationCreated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventRecordSpecificationCreated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventRecordSpecificationDeleted,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventRecordSpecificationDeleted`
    },
    {
        type: provenance_metadata_v1_events_pb.EventRecordSpecificationUpdated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventRecordSpecificationUpdated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventRecordUpdated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventRecordUpdated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventScopeCreated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventScopeCreated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventScopeDeleted,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventScopeDeleted`
    },
    {
        type: provenance_metadata_v1_events_pb.EventScopeSpecificationCreated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventScopeSpecificationCreated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventScopeSpecificationDeleted,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventScopeSpecificationDeleted`
    },
    {
        type: provenance_metadata_v1_events_pb.EventScopeSpecificationUpdated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventScopeSpecificationUpdated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventScopeUpdated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventScopeUpdated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventSessionCreated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventSessionCreated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventSessionDeleted,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventSessionDeleted`
    },
    {
        type: provenance_metadata_v1_events_pb.EventSessionUpdated,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventSessionUpdated`
    },
    {
        type: provenance_metadata_v1_events_pb.EventTxCompleted,
        typeUrl: `${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventTxCompleted`
    },

    // provenance.metadata.v1/metadata.proto

    // provenance.metadata.v1/objectstore.proto

    // provenance.metadata.v1.p8e/p8e.proto

    // provenance.metadata.v1/query.proto

    // provenance.name.v1/scope.proto

    // provenance.name.v1/specification.proto

    // provenance.name.v1/tx.proto

    {
        type: provenance_name_v1_name_pb.CreateRootNameProposal,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.CreateRootNameProposal`
    },
    {
        type: provenance_name_v1_name_pb.EventNameBound,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.EventNameBound`
    },
    {
        type: provenance_name_v1_name_pb.EventNameUnbound,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.EventNameUnbound`
    },
    {
        type: provenance_name_v1_name_pb.NameRecord,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.NameRecord`
    },
    {
        type: provenance_name_v1_name_pb.Params,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.Params`
    },

    // provenance.name.v1/query.proto
    {
        type: provenance_name_v1_query_pb.QueryParamsRequest,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.QueryParamsRequest`
    },
    {
        type: provenance_name_v1_query_pb.QueryParamsResponse,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.QueryParamsResponse`
    },
    {
        type: provenance_name_v1_query_pb.QueryResolveRequest,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.QueryResolveRequest`
    },
    {
        type: provenance_name_v1_query_pb.QueryResolveResponse,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.QueryResolveResponse`
    },
    {
        type: provenance_name_v1_query_pb.QueryReverseLookupRequest,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.QueryReverseLookupRequest`
    },
    {
        type: provenance_name_v1_query_pb.QueryReverseLookupResponse,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.QueryReverseLookupResponse`
    },

    // provenance.name.v1/tx.proto
    {
        type: provenance_name_v1_tx_pb.MsgBindNameRequest,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.MsgBindNameRequest`
    },
    {
        type: provenance_name_v1_tx_pb.MsgBindNameResponse,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.MsgBindNameResponse`
    },
    {
        type: provenance_name_v1_tx_pb.MsgDeleteNameRequest,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.MsgDeleteNameRequest`
    },
    {
        type: provenance_name_v1_tx_pb.MsgDeleteNameResponse,
        typeUrl: `${PROVENANCE_NAME_V1_TYPE_PACKAGE}.MsgDeleteNameResponse`
    },

];
