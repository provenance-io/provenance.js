import { expect, use } from 'chai';
import chaiBytes from 'chai-bytes';

import { MetadataAddress } from '../src';

const MetadataAddressTestConfig = {
    SCOPE: {
        UUID: '8aed2b24-e6a4-4664-9479-34f0f4b02c5d',
        BECH32: 'scope1qz9w62eyu6jyvey50y60pa9s93wsyyrmvs',
    },
    SESSION: {
        SCOPE_UUID: '089b0488-42d0-4064-af6a-2becb43762c6',
        SESSION_UUID: '5ce4c6be-5fdc-4988-863f-7c7e5cd2c661',
        BECH32: 'session1qyyfkpyggtgyqe90dg47edphvtr9eexxhe0acjvgsclhclju6trxz96jly2',
    },
    RECORD: {
        SCOPE_UUID: 'ab32c286-2cf4-4f30-83b0-7d65f6baa551',
        RECORD_NAME: 'TestRecordName',
        BECH32: 'record1q24n9s5x9n6y7vyrkp7kta4654gedl6jlsvuseqr2lxusdwfutjggm56avf',
    },
    CONTRACT_SPEC: {
        UUID: '9b559d9d-de95-4585-8f44-9b6227509f7e',
        BECH32: 'contractspec1qwd4t8vam625tpv0gjdkyf6snalqwaglra',
    },
    SCOPE_SPEC: {
        UUID: 'f66b5c14-eefa-4cf6-80d3-1ab7ed407144',
        BECH32: 'scopespec1qnmxkhq5amayea5q6vdt0m2qw9zq8kzupt',
    },
    RECORD_SPEC: {
        CONTRACT_SPEC_UUID: 'b28da17f-22dc-4db6-a881-54d34e594db2',
        RECORD_SPEC_NAME: 'TestRecordSpecName',
        BECH32: 'recspec1qkegmgtlytwymd4gs92dxnjefkeq3at0tsx4rey0vds0663kl72uwvf62tl',
    },
};

use(chaiBytes);

describe('MetadataAddress', function () {

    this.timeout(5000);

    it(`Creates a metadata address from a scope UUID`, async () => {
        const addr = MetadataAddress.forScope(MetadataAddressTestConfig.SCOPE.UUID);

        expect(addr.toString()).to.equal(MetadataAddressTestConfig.SCOPE.BECH32);
        expect(addr.getPrimaryUuid()).to.equal(MetadataAddressTestConfig.SCOPE.UUID);
    });

    it(`Creates a metadata address from a scope bech32 address`, async () => {
        const addrFromUuid = MetadataAddress.forScope(MetadataAddressTestConfig.SCOPE.UUID);

        const addr = MetadataAddress.fromBech32(MetadataAddressTestConfig.SCOPE.BECH32);
        expect(addr.bytes).to.equalBytes(addrFromUuid.bytes);
    });

    it(`Creates a metadata address from a scope and session UUID`, async () => {
        const addr = MetadataAddress.forSession(MetadataAddressTestConfig.SESSION.SCOPE_UUID, MetadataAddressTestConfig.SESSION.SESSION_UUID);

        expect(addr.toString()).to.equal(MetadataAddressTestConfig.SESSION.BECH32);
        expect(addr.getPrimaryUuid()).to.equal(MetadataAddressTestConfig.SESSION.SCOPE_UUID);
    });

    it(`Creates a metadata address from a session bech32 address`, async () => {
        const addrFromUuid = MetadataAddress.forSession(MetadataAddressTestConfig.SESSION.SCOPE_UUID, MetadataAddressTestConfig.SESSION.SESSION_UUID);

        const addr = MetadataAddress.fromBech32(MetadataAddressTestConfig.SESSION.BECH32);
        expect(addr.bytes).to.equalBytes(addrFromUuid.bytes);
    });

    it(`Creates a metadata address from a scope UUID and record name`, async () => {
        const addr = MetadataAddress.forRecord(MetadataAddressTestConfig.RECORD.SCOPE_UUID, MetadataAddressTestConfig.RECORD.RECORD_NAME);

        expect(addr.toString()).to.equal(MetadataAddressTestConfig.RECORD.BECH32);
        expect(addr.getPrimaryUuid()).to.equal(MetadataAddressTestConfig.RECORD.SCOPE_UUID);
    });

    it(`Creates a metadata address from a record bech32 address`, async () => {
        const addrFromUuid = MetadataAddress.forRecord(MetadataAddressTestConfig.RECORD.SCOPE_UUID, MetadataAddressTestConfig.RECORD.RECORD_NAME);

        const addr = MetadataAddress.fromBech32(MetadataAddressTestConfig.RECORD.BECH32);
        expect(addr.bytes).to.equalBytes(addrFromUuid.bytes);
    });

    it(`Creates a metadata address from a scope specification UUID`, async () => {
        const addr = MetadataAddress.forScopeSpecification(MetadataAddressTestConfig.SCOPE_SPEC.UUID);

        expect(addr.toString()).to.equal(MetadataAddressTestConfig.SCOPE_SPEC.BECH32);
        expect(addr.getPrimaryUuid()).to.equal(MetadataAddressTestConfig.SCOPE_SPEC.UUID);
    });

    it(`Creates a metadata address from a scope specification bech32 address`, async () => {
        const addrFromUuid = MetadataAddress.forScopeSpecification(MetadataAddressTestConfig.SCOPE_SPEC.UUID);

        const addr = MetadataAddress.fromBech32(MetadataAddressTestConfig.SCOPE_SPEC.BECH32);
        expect(addr.bytes).to.equalBytes(addrFromUuid.bytes);
    });

    it(`Creates a metadata address from a contract specification UUID`, async () => {
        const addr = MetadataAddress.forContractSpecification(MetadataAddressTestConfig.CONTRACT_SPEC.UUID);

        expect(addr.toString()).to.equal(MetadataAddressTestConfig.CONTRACT_SPEC.BECH32);
        expect(addr.getPrimaryUuid()).to.equal(MetadataAddressTestConfig.CONTRACT_SPEC.UUID);
    });

    it(`Creates a metadata address from a contract specification bech32 address`, async () => {
        const addrFromUuid = MetadataAddress.forContractSpecification(MetadataAddressTestConfig.CONTRACT_SPEC.UUID);

        const addr = MetadataAddress.fromBech32(MetadataAddressTestConfig.CONTRACT_SPEC.BECH32);
        expect(addr.bytes).to.equalBytes(addrFromUuid.bytes);
    });

    it(`Creates a metadata address from a record contract specification UUID and name`, async () => {
        const addr = MetadataAddress.forRecordSpecification(MetadataAddressTestConfig.RECORD_SPEC.CONTRACT_SPEC_UUID, MetadataAddressTestConfig.RECORD_SPEC.RECORD_SPEC_NAME);

        expect(addr.toString()).to.equal(MetadataAddressTestConfig.RECORD_SPEC.BECH32);
        expect(addr.getPrimaryUuid()).to.equal(MetadataAddressTestConfig.RECORD_SPEC.CONTRACT_SPEC_UUID);
    });

    it(`Creates a metadata address from a record specification address`, async () => {
        const addrFromUuid = MetadataAddress.forRecordSpecification(MetadataAddressTestConfig.RECORD_SPEC.CONTRACT_SPEC_UUID, MetadataAddressTestConfig.RECORD_SPEC.RECORD_SPEC_NAME);

        const addr = MetadataAddress.fromBech32(MetadataAddressTestConfig.RECORD_SPEC.BECH32);
        expect(addr.bytes).to.equalBytes(addrFromUuid.bytes);
    });

});
