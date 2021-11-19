import { expect } from 'chai';
import { getMessageTypeUrl } from '../src';

import * as cosmos_auth_v1beta1_auth_pb from '../src/proto/cosmos/auth/v1beta1/auth_pb';

import * as cosmos_bank_v1beta1_bank_pb from '../src/proto/cosmos/bank/v1beta1/bank_pb';
import * as cosmos_bank_v1beta1_tx_pb from '../src/proto/cosmos/bank/v1beta1/tx_pb';

import * as cosmos_crypto_secp256k1_keys_pb from '../src/proto/cosmos/crypto/secp256k1/keys_pb';

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

            // TODO

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
