import { expect } from 'chai';
import { getMessageTypeUrl } from '../src';

import * as cosmos_auth_v1beta1_auth_pb from '../src/proto/cosmos/auth/v1beta1/auth_pb';

import * as cosmos_bank_v1beta1_bank_pb from '../src/proto/cosmos/bank/v1beta1/bank_pb';
import * as cosmos_bank_v1beta1_tx_pb from '../src/proto/cosmos/bank/v1beta1/tx_pb';

import * as cosmos_crypto_secp256k1_keys_pb from '../src/proto/cosmos/crypto/secp256k1/keys_pb';

import * as cosmwasm_wasm_v1_query_pb from "../src/proto/cosmwasm/wasm/v1/query_pb";
import * as cosmwasm_wasm_v1_tx_pb from "../src/proto/cosmwasm/wasm/v1/tx_pb";

import * as provenance_attribute_v1_attribute_pb from '../src/proto/provenance/attribute/v1/attribute_pb';
import * as provenance_attribute_v1_query_pb from '../src/proto/provenance/attribute/v1/query_pb';
import * as provenance_attribute_v1_tx_pb from '../src/proto/provenance/attribute/v1/tx_pb';

import * as provenance_marker_v1_accessgrant_pb from '../src/proto/provenance/marker/v1/accessgrant_pb';
import * as provenance_marker_v1_authz_pb from '../src/proto/provenance/marker/v1/authz_pb';
import * as provenance_marker_v1_marker_pb from '../src/proto/provenance/marker/v1/marker_pb';
import * as provenance_marker_v1_proposals_pb from '../src/proto/provenance/marker/v1/proposals_pb';
import * as provenance_marker_v1_query_pb from '../src/proto/provenance/marker/v1/query_pb';
import * as provenance_marker_v1_tx_pb from '../src/proto/provenance/marker/v1/tx_pb';

import * as provenance_metadata_v1_events_pb from '../src/proto/provenance/metadata/v1/events_pb';
import * as provenance_metadata_v1_metadata_pb from '../src/proto/provenance/metadata/v1/metadata_pb';
import * as provenance_metadata_v1_objectstore_pb from '../src/proto/provenance/metadata/v1/objectstore_pb';
import * as provenance_metadata_v1_p8e_p8e_pb from '../src/proto/provenance/metadata/v1/p8e/p8e_pb';
import * as provenance_metadata_v1_query_pb from '../src/proto/provenance/metadata/v1/query_pb';
import * as provenance_metadata_v1_scope_pb from '../src/proto/provenance/metadata/v1/scope_pb';
import * as provenance_metadata_v1_specification_pb from '../src/proto/provenance/metadata/v1/specification_pb';
import * as provenance_metadata_v1_tx_pb from '../src/proto/provenance/metadata/v1/tx_pb';

import * as provenance_name_v1_name_pb from '../src/proto/provenance/name/v1/name_pb';
import * as provenance_name_v1_query_pb from '../src/proto/provenance/name/v1/query_pb';
import * as provenance_name_v1_tx_pb from '../src/proto/provenance/name/v1/tx_pb';

describe('MessageUtils', function () {

    this.timeout(5000);

    describe('#getMessageTypeUrl', function () {

        const COSMOS_AUTH_V1BETA1_TYPE_PACKAGE = 'cosmos.auth.v1beta1';
        describe(COSMOS_AUTH_V1BETA1_TYPE_PACKAGE, function () {

            it(`Identifies BaseAccount`, async () => {
                expect(getMessageTypeUrl(new cosmos_auth_v1beta1_auth_pb.BaseAccount())).to.equal(`/${COSMOS_AUTH_V1BETA1_TYPE_PACKAGE}.BaseAccount`);
            });

            it(`Identifies ModuleAccount`, async () => {
                expect(getMessageTypeUrl(new cosmos_auth_v1beta1_auth_pb.ModuleAccount())).to.equal(`/${COSMOS_AUTH_V1BETA1_TYPE_PACKAGE}.ModuleAccount`);
            });

            it(`Identifies Params`, async () => {
                expect(getMessageTypeUrl(new cosmos_auth_v1beta1_auth_pb.Params())).to.equal(`/${COSMOS_AUTH_V1BETA1_TYPE_PACKAGE}.Params`);
            });

        });

        const COSMOS_BANK_V1BETA1_TYPE_PACKAGE = 'cosmos.bank.v1beta1';
        describe(COSMOS_BANK_V1BETA1_TYPE_PACKAGE, function () {

            it(`Identifies DenomUnit`, async () => {
                expect(getMessageTypeUrl(new cosmos_bank_v1beta1_bank_pb.DenomUnit())).to.equal(`/${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.DenomUnit`);
            });

            it(`Identifies Input`, async () => {
                expect(getMessageTypeUrl(new cosmos_bank_v1beta1_bank_pb.Input())).to.equal(`/${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.Input`);
            });

            it(`Identifies Metadata`, async () => {
                expect(getMessageTypeUrl(new cosmos_bank_v1beta1_bank_pb.Metadata())).to.equal(`/${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.Metadata`);
            });

            it(`Identifies Output`, async () => {
                expect(getMessageTypeUrl(new cosmos_bank_v1beta1_bank_pb.Output())).to.equal(`/${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.Output`);
            });

            it(`Identifies Params`, async () => {
                expect(getMessageTypeUrl(new cosmos_bank_v1beta1_bank_pb.Params())).to.equal(`/${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.Params`);
            });

            it(`Identifies SendEnabled`, async () => {
                expect(getMessageTypeUrl(new cosmos_bank_v1beta1_bank_pb.SendEnabled())).to.equal(`/${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.SendEnabled`);
            });

            it(`Identifies Supply`, async () => {
                expect(getMessageTypeUrl(new cosmos_bank_v1beta1_bank_pb.Supply())).to.equal(`/${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.Supply`);
            });

            it(`Identifies MsgMultiSend`, async () => {
                expect(getMessageTypeUrl(new cosmos_bank_v1beta1_tx_pb.MsgMultiSend())).to.equal(`/${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.MsgMultiSend`);
            });

            it(`Identifies MsgMultiSendResponse`, async () => {
                expect(getMessageTypeUrl(new cosmos_bank_v1beta1_tx_pb.MsgMultiSendResponse())).to.equal(`/${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.MsgMultiSendResponse`);
            });

            it(`Identifies MsgSend`, async () => {
                expect(getMessageTypeUrl(new cosmos_bank_v1beta1_tx_pb.MsgSend())).to.equal(`/${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.MsgSend`);
            });

            it(`Identifies MsgSendResponse`, async () => {
                expect(getMessageTypeUrl(new cosmos_bank_v1beta1_tx_pb.MsgSendResponse())).to.equal(`/${COSMOS_BANK_V1BETA1_TYPE_PACKAGE}.MsgSendResponse`);
            });

        });

        const COSMOS_CRYPTO_SECP256K1_TYPE_PACKAGE = 'cosmos.crypto.secp256k1';
        describe(COSMOS_CRYPTO_SECP256K1_TYPE_PACKAGE, function () {

            it(`Identifies PrivKey`, async () => {
                expect(getMessageTypeUrl(new cosmos_crypto_secp256k1_keys_pb.PrivKey())).to.equal(`/${COSMOS_CRYPTO_SECP256K1_TYPE_PACKAGE}.PrivKey`);
            });

            it(`Identifies PubKey`, async () => {
                expect(getMessageTypeUrl(new cosmos_crypto_secp256k1_keys_pb.PubKey())).to.equal(`/${COSMOS_CRYPTO_SECP256K1_TYPE_PACKAGE}.PubKey`);
            });

        });

        const COSMWASM_WASM_V1_TYPE_PACKAGE = 'cosmwasm.wasm.v1';
        describe(COSMWASM_WASM_V1_TYPE_PACKAGE, function () {

            it(`Identifies CodeInfoResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.CodeInfoResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.CodeInfoResponse`);
            });

            it(`Identifies QueryAllContractStateRequest`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryAllContractStateRequest())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryAllContractStateRequest`);
            });

            it(`Identifies QueryAllContractStateResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryAllContractStateResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryAllContractStateResponse`);
            });

            it(`Identifies QueryCodeRequest`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryCodeRequest())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryCodeRequest`);
            });

            it(`Identifies QueryCodeResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryCodeResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryCodeResponse`);
            });

            it(`Identifies QueryCodesRequest`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryCodesRequest())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryCodesRequest`);
            });

            it(`Identifies QueryCodesResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryCodesResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryCodesResponse`);
            });

            it(`Identifies QueryContractHistoryRequest`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryContractHistoryRequest())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryContractHistoryRequest`);
            });

            it(`Identifies QueryContractHistoryResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryContractHistoryResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryContractHistoryResponse`);
            });

            it(`Identifies QueryContractInfoRequest`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryContractInfoRequest())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryContractInfoRequest`);
            });

            it(`Identifies QueryContractInfoResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryContractInfoResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryContractInfoResponse`);
            });

            it(`Identifies QueryContractsByCodeRequest`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryContractsByCodeRequest())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryContractsByCodeRequest`);
            });

            it(`Identifies QueryContractsByCodeResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryContractsByCodeResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryContractsByCodeResponse`);
            });

            it(`Identifies QueryRawContractStateRequest`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryRawContractStateRequest())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryRawContractStateRequest`);
            });

            it(`Identifies QueryRawContractStateResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QueryRawContractStateResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QueryRawContractStateResponse`);
            });

            it(`Identifies QuerySmartContractStateRequest`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QuerySmartContractStateRequest())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QuerySmartContractStateRequest`);
            });

            it(`Identifies QuerySmartContractStateResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_query_pb.QuerySmartContractStateResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.QuerySmartContractStateResponse`);
            });

            it(`Identifies MsgClearAdmin`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_tx_pb.MsgClearAdmin())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgClearAdmin`);
            });

            it(`Identifies MsgClearAdminResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_tx_pb.MsgClearAdminResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgClearAdminResponse`);
            });

            it(`Identifies MsgExecuteContract`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_tx_pb.MsgExecuteContract())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgExecuteContract`);
            });

            it(`Identifies MsgExecuteContractResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_tx_pb.MsgExecuteContractResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgExecuteContractResponse`);
            });

            it(`Identifies MsgInstantiateContract`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_tx_pb.MsgInstantiateContract())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgInstantiateContract`);
            });

            it(`Identifies MsgInstantiateContractResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_tx_pb.MsgInstantiateContractResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgInstantiateContractResponse`);
            });

            it(`Identifies MsgMigrateContract`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_tx_pb.MsgMigrateContract())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgMigrateContract`);
            });

            it(`Identifies MsgMigrateContractResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_tx_pb.MsgMigrateContractResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgMigrateContractResponse`);
            });

            it(`Identifies MsgStoreCode`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_tx_pb.MsgStoreCode())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgStoreCode`);
            });

            it(`Identifies MsgStoreCodeResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_tx_pb.MsgStoreCodeResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgStoreCodeResponse`);
            });

            it(`Identifies MsgUpdateAdmin`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_tx_pb.MsgUpdateAdmin())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgUpdateAdmin`);
            });

            it(`Identifies MsgUpdateAdminResponse`, async () => {
                expect(getMessageTypeUrl(new cosmwasm_wasm_v1_tx_pb.MsgUpdateAdminResponse())).to.equal(`/${COSMWASM_WASM_V1_TYPE_PACKAGE}.MsgUpdateAdminResponse`);
            });

        });


        const PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE = 'provenance.attribute.v1';
        describe(PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE, function () {

            it(`Identifies Attribute`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_attribute_pb.Attribute())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.Attribute`);
            });

            it(`Identifies EventAttributeAdd`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_attribute_pb.EventAttributeAdd())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.EventAttributeAdd`);
            });

            it(`Identifies EventAttributeDelete`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_attribute_pb.EventAttributeDelete())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.EventAttributeDelete`);
            });

            it(`Identifies EventAttributeDistinctDelete`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_attribute_pb.EventAttributeDistinctDelete())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.EventAttributeDistinctDelete`);
            });

            it(`Identifies EventAttributeUpdate`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_attribute_pb.EventAttributeUpdate())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.EventAttributeUpdate`);
            });

            it(`Identifies Params`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_attribute_pb.Params())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.Params`);
            });

            it(`Identifies QueryAttributeRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_query_pb.QueryAttributeRequest())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryAttributeRequest`);
            });

            it(`Identifies QueryAttributeResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_query_pb.QueryAttributeResponse())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryAttributeResponse`);
            });

            it(`Identifies QueryAttributesRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_query_pb.QueryAttributesRequest())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryAttributesRequest`);
            });

            it(`Identifies QueryAttributesResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_query_pb.QueryAttributesResponse())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryAttributesResponse`);
            });

            it(`Identifies QueryParamsRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_query_pb.QueryParamsRequest())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryParamsRequest`);
            });

            it(`Identifies QueryParamsResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_query_pb.QueryParamsResponse())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryParamsResponse`);
            });

            it(`Identifies QueryScanRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_query_pb.QueryScanRequest())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryScanRequest`);
            });

            it(`Identifies QueryScanResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_query_pb.QueryScanResponse())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.QueryScanResponse`);
            });
    
            it(`Identifies MsgAddAttributeRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_tx_pb.MsgAddAttributeRequest())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgAddAttributeRequest`);
            });
    
            it(`Identifies MsgAddAttributeResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_tx_pb.MsgAddAttributeResponse())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgAddAttributeResponse`);
            });
    
            it(`Identifies MsgDeleteAttributeRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_tx_pb.MsgDeleteAttributeRequest())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgDeleteAttributeRequest`);
            });
    
            it(`Identifies MsgDeleteAttributeResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_tx_pb.MsgDeleteAttributeResponse())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgDeleteAttributeResponse`);
            });
    
            it(`Identifies MsgDeleteDistinctAttributeRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_tx_pb.MsgDeleteDistinctAttributeRequest())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgDeleteDistinctAttributeRequest`);
            });
    
            it(`Identifies MsgDeleteDistinctAttributeResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_tx_pb.MsgDeleteDistinctAttributeResponse())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgDeleteDistinctAttributeResponse`);
            });
    
            it(`Identifies MsgUpdateAttributeRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_tx_pb.MsgUpdateAttributeRequest())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgUpdateAttributeRequest`);
            });
    
            it(`Identifies MsgUpdateAttributeResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_attribute_v1_tx_pb.MsgUpdateAttributeResponse())).to.equal(`/${PROVENANCE_ATTRIBUTE_V1_TYPE_PACKAGE}.MsgUpdateAttributeResponse`);
            });
            
        });

        const PROVENANCE_MARKER_V1_TYPE_PACKAGE = 'provenance.marker.v1';
        describe(PROVENANCE_MARKER_V1_TYPE_PACKAGE, function () {

            it(`Identifies AccessGrant`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_accessgrant_pb.AccessGrant())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.AccessGrant`);
            });

            it(`Identifies MarkerTransferAuthorization`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_authz_pb.MarkerTransferAuthorization())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MarkerTransferAuthorization`);
            });

            it(`Identifies EventDenomUnit`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventDenomUnit())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventDenomUnit`);
            });

            it(`Identifies EventMarkerAccess`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventMarkerAccess())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerAccess`);
            });

            it(`Identifies EventMarkerActivate`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventMarkerActivate())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerActivate`);
            });

            it(`Identifies EventMarkerAdd`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventMarkerAdd())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerAdd`);
            });

            it(`Identifies EventMarkerAddAccess`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventMarkerAddAccess())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerAddAccess`);
            });

            it(`Identifies EventMarkerBurn`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventMarkerBurn())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerBurn`);
            });

            it(`Identifies EventMarkerCancel`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventMarkerCancel())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerCancel`);
            });

            it(`Identifies EventMarkerDelete`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventMarkerDelete())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerDelete`);
            });

            it(`Identifies EventMarkerDeleteAccess`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventMarkerDeleteAccess())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerDeleteAccess`);
            });

            it(`Identifies EventMarkerFinalize`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventMarkerFinalize())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerFinalize`);
            });

            it(`Identifies EventMarkerMint`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventMarkerMint())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerMint`);
            });

            it(`Identifies EventMarkerSetDenomMetadata`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventMarkerSetDenomMetadata())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerSetDenomMetadata`);
            });

            it(`Identifies EventMarkerTransfer`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventMarkerTransfer())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerTransfer`);
            });

            it(`Identifies EventMarkerWithdraw`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.EventMarkerWithdraw())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.EventMarkerWithdraw`);
            });

            it(`Identifies MarkerAccount`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.MarkerAccount())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MarkerAccount`);
            });

            it(`Identifies Params`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_marker_pb.Params())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.Params`);
            });

            it(`Identifies AddMarkerProposal`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_proposals_pb.AddMarkerProposal())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.AddMarkerProposal`);
            });

            it(`Identifies ChangeStatusProposal`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_proposals_pb.ChangeStatusProposal())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.ChangeStatusProposal`);
            });

            it(`Identifies RemoveAdministratorProposal`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_proposals_pb.RemoveAdministratorProposal())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.RemoveAdministratorProposal`);
            });

            it(`Identifies SetAdministratorProposal`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_proposals_pb.SetAdministratorProposal())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.SetAdministratorProposal`);
            });

            it(`Identifies SetDenomMetadataProposal`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_proposals_pb.SetDenomMetadataProposal())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.SetDenomMetadataProposal`);
            });

            it(`Identifies SupplyDecreaseProposal`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_proposals_pb.SupplyDecreaseProposal())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.SupplyDecreaseProposal`);
            });

            it(`Identifies SupplyIncreaseProposal`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_proposals_pb.SupplyIncreaseProposal())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.SupplyIncreaseProposal`);
            });

            it(`Identifies WithdrawEscrowProposal`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_proposals_pb.WithdrawEscrowProposal())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.WithdrawEscrowProposal`);
            });

            it(`Identifies Balance`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.Balance())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.Balance`);
            });

            it(`Identifies QueryAccessRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryAccessRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryAccessRequest`);
            });

            it(`Identifies QueryAccessResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryAccessResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryAccessResponse`);
            });

            it(`Identifies QueryAllMarkersRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryAllMarkersRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryAllMarkersRequest`);
            });

            it(`Identifies QueryAllMarkersResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryAllMarkersResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryAllMarkersResponse`);
            });

            it(`Identifies QueryDenomMetadataRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryDenomMetadataRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryDenomMetadataRequest`);
            });

            it(`Identifies QueryDenomMetadataResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryDenomMetadataResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryDenomMetadataResponse`);
            });

            it(`Identifies QueryEscrowRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryEscrowRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryEscrowRequest`);
            });

            it(`Identifies QueryEscrowResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryEscrowResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryEscrowResponse`);
            });

            it(`Identifies QueryHoldingRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryHoldingRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryHoldingRequest`);
            });

            it(`Identifies QueryHoldingResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryHoldingResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryHoldingResponse`);
            });

            it(`Identifies QueryMarkerRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryMarkerRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryMarkerRequest`);
            });

            it(`Identifies QueryMarkerResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryMarkerResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryMarkerResponse`);
            });

            it(`Identifies QueryParamsRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryParamsRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryParamsRequest`);
            });

            it(`Identifies QueryParamsResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QueryParamsResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QueryParamsResponse`);
            });

            it(`Identifies QuerySupplyRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QuerySupplyRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QuerySupplyRequest`);
            });

            it(`Identifies QuerySupplyResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_query_pb.QuerySupplyResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.QuerySupplyResponse`);
            });

            it(`Identifies MsgActivateRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgActivateRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgActivateRequest`);
            });

            it(`Identifies MsgActivateResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgActivateResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgActivateResponse`);
            });

            it(`Identifies MsgAddAccessRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgAddAccessRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgAddAccessRequest`);
            });

            it(`Identifies MsgAddAccessResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgAddAccessResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgAddAccessResponse`);
            });

            it(`Identifies MsgAddMarkerRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgAddMarkerRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgAddMarkerRequest`);
            });

            it(`Identifies MsgAddMarkerResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgAddMarkerResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgAddMarkerResponse`);
            });

            it(`Identifies MsgBurnRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgBurnRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgBurnRequest`);
            });

            it(`Identifies MsgBurnResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgBurnResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgBurnResponse`);
            });

            it(`Identifies MsgCancelRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgCancelRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgCancelRequest`);
            });

            it(`Identifies MsgCancelResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgCancelResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgCancelResponse`);
            });

            it(`Identifies MsgDeleteAccessRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgDeleteAccessRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgDeleteAccessRequest`);
            });

            it(`Identifies MsgDeleteAccessResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgDeleteAccessResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgDeleteAccessResponse`);
            });

            it(`Identifies MsgDeleteRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgDeleteRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgDeleteRequest`);
            });

            it(`Identifies MsgDeleteResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgDeleteResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgDeleteResponse`);
            });

            it(`Identifies MsgFinalizeRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgFinalizeRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgFinalizeRequest`);
            });

            it(`Identifies MsgFinalizeResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgFinalizeResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgFinalizeResponse`);
            });

            it(`Identifies MsgMintRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgMintRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgMintRequest`);
            });

            it(`Identifies MsgMintResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgMintResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgMintResponse`);
            });

            it(`Identifies MsgSetDenomMetadataRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgSetDenomMetadataRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgSetDenomMetadataRequest`);
            });

            it(`Identifies MsgSetDenomMetadataResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgSetDenomMetadataResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgSetDenomMetadataResponse`);
            });

            it(`Identifies MsgTransferRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgTransferRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgTransferRequest`);
            });

            it(`Identifies MsgTransferResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgTransferResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgTransferResponse`);
            });

            it(`Identifies MsgWithdrawRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgWithdrawRequest())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgWithdrawRequest`);
            });

            it(`Identifies MsgWithdrawResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_marker_v1_tx_pb.MsgWithdrawResponse())).to.equal(`/${PROVENANCE_MARKER_V1_TYPE_PACKAGE}.MsgWithdrawResponse`);
            });

        });

        const PROVENANCE_METADATA_V1_TYPE_PACKAGE = 'provenance.metadata.v1';
        describe(PROVENANCE_METADATA_V1_TYPE_PACKAGE, function () {

            it(`Identifies EventContractSpecificationCreated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventContractSpecificationCreated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventContractSpecificationCreated`);
            });

            it(`Identifies EventContractSpecificationDeleted`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventContractSpecificationDeleted())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventContractSpecificationDeleted`);
            });

            it(`Identifies EventContractSpecificationUpdated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventContractSpecificationUpdated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventContractSpecificationUpdated`);
            });

            it(`Identifies EventOSLocatorCreated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventOSLocatorCreated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventOSLocatorCreated`);
            });

            it(`Identifies EventOSLocatorDeleted`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventOSLocatorDeleted())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventOSLocatorDeleted`);
            });

            it(`Identifies EventOSLocatorUpdated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventOSLocatorUpdated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventOSLocatorUpdated`);
            });

            it(`Identifies EventRecordCreated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventRecordCreated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventRecordCreated`);
            });

            it(`Identifies EventRecordDeleted`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventRecordDeleted())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventRecordDeleted`);
            });

            it(`Identifies EventRecordSpecificationCreated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventRecordSpecificationCreated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventRecordSpecificationCreated`);
            });

            it(`Identifies EventRecordSpecificationDeleted`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventRecordSpecificationDeleted())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventRecordSpecificationDeleted`);
            });

            it(`Identifies EventRecordSpecificationUpdated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventRecordSpecificationUpdated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventRecordSpecificationUpdated`);
            });

            it(`Identifies EventRecordUpdated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventRecordUpdated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventRecordUpdated`);
            });

            it(`Identifies EventScopeCreated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventScopeCreated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventScopeCreated`);
            });

            it(`Identifies EventScopeDeleted`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventScopeDeleted())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventScopeDeleted`);
            });

            it(`Identifies EventScopeSpecificationCreated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventScopeSpecificationCreated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventScopeSpecificationCreated`);
            });

            it(`Identifies EventScopeSpecificationDeleted`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventScopeSpecificationDeleted())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventScopeSpecificationDeleted`);
            });

            it(`Identifies EventScopeSpecificationUpdated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventScopeSpecificationUpdated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventScopeSpecificationUpdated`);
            });

            it(`Identifies EventScopeUpdated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventScopeUpdated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventScopeUpdated`);
            });

            it(`Identifies EventSessionCreated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventSessionCreated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventSessionCreated`);
            });

            it(`Identifies EventSessionDeleted`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventSessionDeleted())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventSessionDeleted`);
            });

            it(`Identifies EventSessionUpdated`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventSessionUpdated())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventSessionUpdated`);
            });

            it(`Identifies EventTxCompleted`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_events_pb.EventTxCompleted())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.EventTxCompleted`);
            });

            it(`Identifies ContractSpecificationRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ContractSpecificationRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ContractSpecificationRequest`);
            });

            it(`Identifies ContractSpecificationResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ContractSpecificationResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ContractSpecificationResponse`);
            });

            it(`Identifies ContractSpecificationsAllRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ContractSpecificationsAllRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ContractSpecificationsAllRequest`);
            });

            it(`Identifies ContractSpecificationsAllResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ContractSpecificationsAllResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ContractSpecificationsAllResponse`);
            });

            it(`Identifies OSAllLocatorsRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.OSAllLocatorsRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.OSAllLocatorsRequest`);
            });

            it(`Identifies OSAllLocatorsResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.OSAllLocatorsResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.OSAllLocatorsResponse`);
            });

            it(`Identifies OSLocatorParamsRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.OSLocatorParamsRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.OSLocatorParamsRequest`);
            });

            it(`Identifies OSLocatorParamsResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.OSLocatorParamsResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.OSLocatorParamsResponse`);
            });

            it(`Identifies OSLocatorRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.OSLocatorRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.OSLocatorRequest`);
            });

            it(`Identifies OSLocatorResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.OSLocatorResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.OSLocatorResponse`);
            });

            it(`Identifies OSLocatorsByScopeRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.OSLocatorsByScopeRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.OSLocatorsByScopeRequest`);
            });

            it(`Identifies OSLocatorsByScopeResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.OSLocatorsByScopeResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.OSLocatorsByScopeResponse`);
            });

            it(`Identifies OSLocatorsByURIRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.OSLocatorsByURIRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.OSLocatorsByURIRequest`);
            });

            it(`Identifies OSLocatorsByURIResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.OSLocatorsByURIResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.OSLocatorsByURIResponse`);
            });

            it(`Identifies OwnershipRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.OwnershipRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.OwnershipRequest`);
            });

            it(`Identifies OwnershipResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.OwnershipResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.OwnershipResponse`);
            });

            it(`Identifies QueryParamsRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.QueryParamsRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.QueryParamsRequest`);
            });

            it(`Identifies QueryParamsResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.QueryParamsResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.QueryParamsResponse`);
            });

            it(`Identifies RecordSpecificationRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.RecordSpecificationRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.RecordSpecificationRequest`);
            });

            it(`Identifies RecordSpecificationResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.RecordSpecificationResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.RecordSpecificationResponse`);
            });

            it(`Identifies RecordSpecificationsAllRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.RecordSpecificationsAllRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.RecordSpecificationsAllRequest`);
            });

            it(`Identifies RecordSpecificationsAllResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.RecordSpecificationsAllResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.RecordSpecificationsAllResponse`);
            });

            it(`Identifies RecordSpecificationsForContractSpecificationRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.RecordSpecificationsForContractSpecificationRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.RecordSpecificationsForContractSpecificationRequest`);
            });

            it(`Identifies RecordSpecificationsForContractSpecificationResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.RecordSpecificationsForContractSpecificationResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.RecordSpecificationsForContractSpecificationResponse`);
            });

            it(`Identifies RecordsAllRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.RecordsAllRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.RecordsAllRequest`);
            });

            it(`Identifies RecordsAllResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.RecordsAllResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.RecordsAllResponse`);
            });

            it(`Identifies RecordsRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.RecordsRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.RecordsRequest`);
            });

            it(`Identifies RecordsResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.RecordsResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.RecordsResponse`);
            });

            it(`Identifies ScopeRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ScopeRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ScopeRequest`);
            });

            it(`Identifies ScopeResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ScopeResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ScopeResponse`);
            });

            it(`Identifies ScopeSpecificationRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ScopeSpecificationRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ScopeSpecificationRequest`);
            });

            it(`Identifies ScopeSpecificationResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ScopeSpecificationResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ScopeSpecificationResponse`);
            });

            it(`Identifies ScopeSpecificationsAllRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ScopeSpecificationsAllRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ScopeSpecificationsAllRequest`);
            });

            it(`Identifies ScopeSpecificationsAllResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ScopeSpecificationsAllResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ScopeSpecificationsAllResponse`);
            });

            it(`Identifies ScopesAllRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ScopesAllRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ScopesAllRequest`);
            });

            it(`Identifies ScopesAllResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ScopesAllResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ScopesAllResponse`);
            });

            it(`Identifies SessionsAllRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.SessionsAllRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.SessionsAllRequest`);
            });

            it(`Identifies SessionsAllResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.SessionsAllResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.SessionsAllResponse`);
            });

            it(`Identifies SessionsRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.SessionsRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.SessionsRequest`);
            });

            it(`Identifies SessionsResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.SessionsResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.SessionsResponse`);
            });

            it(`Identifies ValueOwnershipRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ValueOwnershipRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ValueOwnershipRequest`);
            });

            it(`Identifies ValueOwnershipResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_query_pb.ValueOwnershipResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.ValueOwnershipResponse`);
            });

            it(`Identifies MsgAddContractSpecToScopeSpecRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgAddContractSpecToScopeSpecRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgAddContractSpecToScopeSpecRequest`);
            });

            it(`Identifies MsgAddContractSpecToScopeSpecResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgAddContractSpecToScopeSpecResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgAddContractSpecToScopeSpecResponse`);
            });

            it(`Identifies MsgAddScopeDataAccessRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgAddScopeDataAccessRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgAddScopeDataAccessRequest`);
            });

            it(`Identifies MsgAddScopeDataAccessResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgAddScopeDataAccessResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgAddScopeDataAccessResponse`);
            });

            it(`Identifies MsgAddScopeOwnerRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgAddScopeOwnerRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgAddScopeOwnerRequest`);
            });

            it(`Identifies MsgAddScopeOwnerResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgAddScopeOwnerResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgAddScopeOwnerResponse`);
            });

            it(`Identifies MsgBindOSLocatorRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgBindOSLocatorRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgBindOSLocatorRequest`);
            });

            it(`Identifies MsgBindOSLocatorResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgBindOSLocatorResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgBindOSLocatorResponse`);
            });

            it(`Identifies MsgDeleteContractSpecFromScopeSpecRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteContractSpecFromScopeSpecRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteContractSpecFromScopeSpecRequest`);
            });

            it(`Identifies MsgDeleteContractSpecFromScopeSpecResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteContractSpecFromScopeSpecResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteContractSpecFromScopeSpecResponse`);
            });

            it(`Identifies MsgDeleteContractSpecificationRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteContractSpecificationRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteContractSpecificationRequest`);
            });

            it(`Identifies MsgDeleteContractSpecificationResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteContractSpecificationResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteContractSpecificationResponse`);
            });

            it(`Identifies MsgDeleteOSLocatorRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteOSLocatorRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteOSLocatorRequest`);
            });

            it(`Identifies MsgDeleteOSLocatorResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteOSLocatorResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteOSLocatorResponse`);
            });

            it(`Identifies MsgDeleteRecordRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteRecordRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteRecordRequest`);
            });

            it(`Identifies MsgDeleteRecordResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteRecordResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteRecordResponse`);
            });

            it(`Identifies MsgDeleteRecordSpecificationRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteRecordSpecificationRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteRecordSpecificationRequest`);
            });

            it(`Identifies MsgDeleteRecordSpecificationResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteRecordSpecificationResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteRecordSpecificationResponse`);
            });

            it(`Identifies MsgDeleteScopeDataAccessRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteScopeDataAccessRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteScopeDataAccessRequest`);
            });

            it(`Identifies MsgDeleteScopeDataAccessResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteScopeDataAccessResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteScopeDataAccessResponse`);
            });

            it(`Identifies MsgDeleteScopeOwnerRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteScopeOwnerRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteScopeOwnerRequest`);
            });

            it(`Identifies MsgDeleteScopeOwnerResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteScopeOwnerResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteScopeOwnerResponse`);
            });

            it(`Identifies MsgDeleteScopeRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteScopeRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteScopeRequest`);
            });

            it(`Identifies MsgDeleteScopeResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteScopeResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteScopeResponse`);
            });

            it(`Identifies MsgDeleteScopeSpecificationRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteScopeSpecificationRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteScopeSpecificationRequest`);
            });

            it(`Identifies MsgDeleteScopeSpecificationResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgDeleteScopeSpecificationResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgDeleteScopeSpecificationResponse`);
            });

            it(`Identifies MsgModifyOSLocatorRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgModifyOSLocatorRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgModifyOSLocatorRequest`);
            });

            it(`Identifies MsgModifyOSLocatorResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgModifyOSLocatorResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgModifyOSLocatorResponse`);
            });

            it(`Identifies MsgP8eMemorializeContractRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgP8eMemorializeContractRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgP8eMemorializeContractRequest`);
            });

            it(`Identifies MsgP8eMemorializeContractResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgP8eMemorializeContractResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgP8eMemorializeContractResponse`);
            });

            it(`Identifies MsgWriteContractSpecificationRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteContractSpecificationRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteContractSpecificationRequest`);
            });

            it(`Identifies MsgWriteContractSpecificationResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteContractSpecificationResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteContractSpecificationResponse`);
            });

            it(`Identifies MsgWriteP8eContractSpecRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteP8eContractSpecRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteP8eContractSpecRequest`);
            });

            it(`Identifies MsgWriteP8eContractSpecResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteP8eContractSpecResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteP8eContractSpecResponse`);
            });

            it(`Identifies MsgWriteRecordRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteRecordRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteRecordRequest`);
            });

            it(`Identifies MsgWriteRecordResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteRecordResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteRecordResponse`);
            });

            it(`Identifies MsgWriteRecordSpecificationRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteRecordSpecificationRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteRecordSpecificationRequest`);
            });

            it(`Identifies MsgWriteRecordSpecificationResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteRecordSpecificationResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteRecordSpecificationResponse`);
            });

            it(`Identifies MsgWriteScopeRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteScopeRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteScopeRequest`);
            });

            it(`Identifies MsgWriteScopeResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteScopeResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteScopeResponse`);
            });

            it(`Identifies MsgWriteScopeSpecificationRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteScopeSpecificationRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteScopeSpecificationRequest`);
            });

            it(`Identifies MsgWriteScopeSpecificationResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteScopeSpecificationResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteScopeSpecificationResponse`);
            });

            it(`Identifies MsgWriteSessionRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteSessionRequest())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteSessionRequest`);
            });

            it(`Identifies MsgWriteSessionResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_metadata_v1_tx_pb.MsgWriteSessionResponse())).to.equal(`/${PROVENANCE_METADATA_V1_TYPE_PACKAGE}.MsgWriteSessionResponse`);
            });

        });

        const PROVENANCE_NAME_V1_TYPE_PACKAGE = 'provenance.name.v1';
        describe(PROVENANCE_NAME_V1_TYPE_PACKAGE, function () {

            it(`Identifies CreateRootNameProposal`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_name_pb.CreateRootNameProposal())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.CreateRootNameProposal`);
            });

            it(`Identifies EventNameBound`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_name_pb.EventNameBound())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.EventNameBound`);
            });

            it(`Identifies EventNameUnbound`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_name_pb.EventNameUnbound())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.EventNameUnbound`);
            });

            it(`Identifies NameRecord`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_name_pb.NameRecord())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.NameRecord`);
            });

            it(`Identifies Params`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_name_pb.Params())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.Params`);
            });

            it(`Identifies QueryParamsRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_query_pb.QueryParamsRequest())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.QueryParamsRequest`);
            });

            it(`Identifies QueryParamsResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_query_pb.QueryParamsResponse())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.QueryParamsResponse`);
            });

            it(`Identifies QueryResolveRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_query_pb.QueryResolveRequest())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.QueryResolveRequest`);
            });

            it(`Identifies QueryResolveResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_query_pb.QueryResolveResponse())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.QueryResolveResponse`);
            });

            it(`Identifies QueryReverseLookupRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_query_pb.QueryReverseLookupRequest())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.QueryReverseLookupRequest`);
            });

            it(`Identifies QueryReverseLookupResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_query_pb.QueryReverseLookupResponse())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.QueryReverseLookupResponse`);
            });

            it(`Identifies MsgBindNameRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_tx_pb.MsgBindNameRequest())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.MsgBindNameRequest`);
            });

            it(`Identifies MsgBindNameResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_tx_pb.MsgBindNameResponse())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.MsgBindNameResponse`);
            });

            it(`Identifies MsgDeleteNameRequest`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_tx_pb.MsgDeleteNameRequest())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.MsgDeleteNameRequest`);
            });

            it(`Identifies MsgDeleteNameResponse`, async () => {
                expect(getMessageTypeUrl(new provenance_name_v1_tx_pb.MsgDeleteNameResponse())).to.equal(`/${PROVENANCE_NAME_V1_TYPE_PACKAGE}.MsgDeleteNameResponse`);
            });

        });

    });

});
