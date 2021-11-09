import { assert, expect, use } from 'chai';
import { createHash } from 'crypto';
import { readFileSync } from 'fs';

const HASH_ALGORITHM = 'sha256';

describe('Proto', function () {

    this.timeout(5000);

    describe('#cosmos', function () {

        const COSMOS_PROTO_PATH = 'proto/cosmos';

        const AUTH_PROTO_HASH = '9927e4264fbcd4dbb2aeb3febc8dcb272602aab798b726d83090a952ea70a781';
        const BANK_PROTO_HASH = 'cd7a0f483a69019d7d6cc5c4e27c553601e2ad1273d0e57923280651d3febd3e';
        const PAGINATION_PROTO_HASH = '0ff0bbea9686372ae3dcebbef463222ba87ea1d35d4f3b8c9b0d37bf549a7b79';
        const COIN_PROTO_HASH = 'e8b08c8614b050c29e460f8d8ea9b88cfec91f254104501042ce3e4d6089cda9';
        const MULTISIG_PROTO_HASH = '3fba497349c0e4f5eb80f8104087f364f6c55206403b604a711341845b9419b6';
        const KEYS_PROTO_HASH = 'aecb2e343da5effc6a7f1108587231e37d28203eee24a35c5ba8dd9604818c3e';
        const SIGNING_PROTO_HASH = '5de45048170ddf22effc4bf06f637ea131a1138af84882b6b5ded49e64cd7e20';

        it(`cosmos.auth.v1beta1/auth.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${COSMOS_PROTO_PATH}/auth/v1beta1/auth.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(AUTH_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

        it(`cosmos.bank.v1beta1/bank.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${COSMOS_PROTO_PATH}/bank/v1beta1/bank.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(BANK_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

        it(`cosmos.base.query.v1beta1/pagination.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${COSMOS_PROTO_PATH}/base/query/v1beta1/pagination.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(PAGINATION_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

        it(`cosmos.base.v1beta1/coin.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${COSMOS_PROTO_PATH}/base/v1beta1/coin.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(COIN_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

        it(`cosmos.crypto.multisig.v1beta1/multisig.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${COSMOS_PROTO_PATH}/crypto/multisig/v1beta1/multisig.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(MULTISIG_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

        it(`cosmos.crypto.secp256k1/keys.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${COSMOS_PROTO_PATH}/crypto/secp256k1/keys.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(KEYS_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

        it(`cosmos.tx.signing.v1beta1/signing.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${COSMOS_PROTO_PATH}/tx/signing/v1beta1/signing.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(SIGNING_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

    });

    describe('#cosmos_proto', function () {

        const COSMOS_PROTO_PROTO_PATH = 'proto/cosmos_proto';

        const COSMOS_PROTO_HASH = '810610c439b4675eaafcf7bd1040870ae4d92eb51d6d79019e851d86b28c34d1';

        it(`cosmos_proto/cosmos.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${COSMOS_PROTO_PROTO_PATH}/cosmos.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(COSMOS_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

    });

    describe('#gogoproto', function () {

        const GOGOPROTO_PROTO_PATH = 'proto/gogoproto';

        const GOGO_PROTO_HASH = '8165f47c0f0a27fda74848afaa09e339165e8f39cc6b015e1c02a4cff6c78feb';

        it(`gogoproto/gogo.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${GOGOPROTO_PROTO_PATH}/gogo.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(GOGO_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

    });

    describe('#google', function () {

        const GOOGLE_PROTO_PATH = 'proto/google';

        const ANNOTATIONS_PROTO_HASH = 'bff7c47b78bd25d34e70efc06f49764ec24f55e665067b9be49e53e825250ce8';
        const HTTP_PROTO_HASH = 'e2706b549f04b1814be792f74fe5eb4f8141f96c95c191f4f1697679d55eb259';
        const HTTPBODY_PROTO_HASH = '58565e321c04972ecf30d35e9a5ead5f18eaebb4040aa0bf3fa6903285bb2962';
        const ANY_PROTO_HASH = '78dffedb6acee01f459d3f3c80ee81c2d8c657a129cd44b0642af20b2aec793b';
        const DESCRIPTOR_PROTO_HASH = '39ee456754055d52a3c8789dfcea8b2e2ea52db6b5836971853002da5d3605cc';

        it(`google/api/annotations.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${GOOGLE_PROTO_PATH}/api/annotations.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(ANNOTATIONS_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

        it(`google/api/http.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${GOOGLE_PROTO_PATH}/api/http.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(HTTP_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

        it(`google/api/httpbody.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${GOOGLE_PROTO_PATH}/api/httpbody.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(HTTPBODY_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

        it(`google/protobuf/any.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${GOOGLE_PROTO_PATH}/protobuf/any.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(ANY_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

        it(`google/protobuf/descriptor.proto`, async () => {
            const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${GOOGLE_PROTO_PATH}/protobuf/descriptor.proto`)).digest('hex');
            expect(hash.toLowerCase()).to.equal(DESCRIPTOR_PROTO_HASH, 'Proto changed. Code update might be necessary.');
        });

    });

    describe('#provenance', function () {

        describe('/attribute', function () {

            const PROVENANCE_ATTRIBUTE_PROTO_PATH = 'proto/provenance/attribute';

            const ATTRIBUTE_PROTO_HASH = '2d1ef768a697d6bf5c7ab0093d49f2d35f31837e9d38e24e0ea502721b4ec12a';
            const GENESIS_PROTO_HASH = 'f90db33e98938c2619dfa53ef7441c3dbf18a9db094e1be2b8e6aa90476113cc';
            const QUERY_PROTO_HASH = 'd94c3b645665277f8f0edb7285d67ff029641d8e4cab66de066ec5835cd95965';
            const TX_PROTO_HASH = '9140777570d11340c59716f149ffd4fa4eb20eb471cd97700ca33cb4e86e99dd';
    
            it(`provenance/attribute/v1/attribute.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_ATTRIBUTE_PROTO_PATH}/v1/attribute.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(ATTRIBUTE_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/attribute/v1/genesis.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_ATTRIBUTE_PROTO_PATH}/v1/genesis.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(GENESIS_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/attribute/v1/query.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_ATTRIBUTE_PROTO_PATH}/v1/query.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(QUERY_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/attribute/v1/tx.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_ATTRIBUTE_PROTO_PATH}/v1/tx.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(TX_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });
    
        });

        describe('/marker', function () {

            const PROVENANCE_MARKER_PROTO_PATH = 'proto/provenance/marker';

            const ACCESSGRANT_PROTO_HASH = '79ef14991458dabc0644d26edaa1d01add5721883487e85113788d4d379afaef';
            const AUTHZ_PROTO_HASH = '9df7d24accc4618807b569ccaa4e8cf38790d24d357c2d0b36164571cbae0619';
            const GENESIS_PROTO_HASH = 'd16d4c10c7a20a005fe221367e22aaeaf19fceaab5ec415fac076fd6077d803b';
            const MARKER_PROTO_HASH = 'cb7adb197467cd009448911c8dda2eb569cdd9a67bd725bfbf57c1f91acf2edc';
            const PROPOSALS_PROTO_HASH = 'da7ba08b00711f2ca7a7b2d6ccded155a79fff9d64232626a96cad064811ded5';
            const QUERY_PROTO_HASH = 'dbba3e6afce3470040b63e70e0d0d294da882006703fb0d58050871677302fbf';
            const SI_PROTO_HASH = '03b2ffe4ff72b5add2dcc2a9c9ff2d6c54227af91e6bf73875012ab48e1b60c4';
            const TX_PROTO_HASH = '6850ea8d4386a87bf914968f8da1c8f22a1eac2f2b0d645fb0fc3a24fc3307f1';
    
            it(`provenance/marker/v1/accessgrant.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_MARKER_PROTO_PATH}/v1/accessgrant.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(ACCESSGRANT_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/marker/v1/authz.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_MARKER_PROTO_PATH}/v1/authz.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(AUTHZ_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/marker/v1/genesis.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_MARKER_PROTO_PATH}/v1/genesis.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(GENESIS_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/marker/v1/marker.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_MARKER_PROTO_PATH}/v1/marker.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(MARKER_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/marker/v1/proposals.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_MARKER_PROTO_PATH}/v1/proposals.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(PROPOSALS_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/marker/v1/query.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_MARKER_PROTO_PATH}/v1/query.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(QUERY_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/marker/v1/si.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_MARKER_PROTO_PATH}/v1/si.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(SI_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/marker/v1/tx.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_MARKER_PROTO_PATH}/v1/tx.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(TX_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });
    
        });

        describe('/metadata', function () {

            const PROVENANCE_METADATA_PROTO_PATH = 'proto/provenance/metadata';

            const P8E_PROTO_HASH = 'c4aaa521861ea4c76729283fe5fc4df725069e4dc6f892fafdd92d6588aa83b3';
            const EVENTS_PROTO_HASH = 'fedbb1810a492d8b8a801ae4236f29184293919f7e4606c9363390ca24e1795e';
            const GENESIS_PROTO_HASH = '98fa7460cf1905dd15e6aed92835c2757f3932fa92f8b331f48c898dbe52e2a1';
            const METADATA_PROTO_HASH = 'ecd51f0fb58d2f00fbd3c3faad84af5d8b2ab7a8eafaa7f15f40c7668a64fcfe';
            const OBJECTSTORE_PROTO_HASH = 'f3ef92f8ed45f0307c50a5550c858a0a8449c4ede72481e57f22aae0a6f554a0';
            const QUERY_PROTO_HASH = '7b883397a8046ac3157524ebdfe80f80ca3b281ca4e5cbaabb6048070d361970';
            const SCOPE_PROTO_HASH = '95a36f0a5e955536e40376f982b1bc29cf2ce1407fc817808431f78dfbf35db9';
            const SPECIFICATION_PROTO_HASH = 'dd3838f5b1868dca4eabfbdcf86003e70db4f274030e69951e7d0de0a03a4543';
            const TX_PROTO_HASH = 'c6bbf08f27f3a540aa676a710822054951e74e67cccb9f34afea582cda4cd81e';
    
            it(`provenance/metadata/v1/p8e/p8e.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_METADATA_PROTO_PATH}/v1/p8e/p8e.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(P8E_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/metadata/v1/events.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_METADATA_PROTO_PATH}/v1/events.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(EVENTS_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/metadata/v1/genesis.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_METADATA_PROTO_PATH}/v1/genesis.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(GENESIS_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/metadata/v1/metadata.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_METADATA_PROTO_PATH}/v1/metadata.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(METADATA_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/metadata/v1/objectstore.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_METADATA_PROTO_PATH}/v1/objectstore.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(OBJECTSTORE_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/metadata/v1/query.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_METADATA_PROTO_PATH}/v1/query.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(QUERY_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/metadata/v1/scope.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_METADATA_PROTO_PATH}/v1/scope.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(SCOPE_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/metadata/v1/specification.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_METADATA_PROTO_PATH}/v1/specification.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(SPECIFICATION_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/metadata/v1/tx.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_METADATA_PROTO_PATH}/v1/tx.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(TX_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });
    
        });

        describe('/name', function () {

            const PROVENANCE_NAME_PROTO_PATH = 'proto/provenance/name';

            const GENESIS_PROTO_HASH = '2b91e029d2f2dc9acbecab6096104777f3b58e31b8824ca2c045112f3f44e73e';
            const NAME_PROTO_HASH = 'b19770a75bc2305456c948a3e40cc3e717ba421405301b60570ff6055236c9ea';
            const QUERY_PROTO_HASH = '4473a358ea4463ecc771c11b8af54b8992e63faff76db079824cbccc293fdc86';
            const TX_PROTO_HASH = '5b2491f91dfa6d4875367efd703bfef06eed0f87e29b84020ba3eb060b69a93c';

            it(`provenance/name/v1/genesis.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_NAME_PROTO_PATH}/v1/genesis.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(GENESIS_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/name/v1/name.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_NAME_PROTO_PATH}/v1/name.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(NAME_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/name/v1/query.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_NAME_PROTO_PATH}/v1/query.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(QUERY_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });

            it(`provenance/name/v1/tx.proto`, async () => {
                const hash = createHash(HASH_ALGORITHM).update(readFileSync(`${PROVENANCE_NAME_PROTO_PATH}/v1/tx.proto`)).digest('hex');
                expect(hash.toLowerCase()).to.equal(TX_PROTO_HASH, 'Proto changed. Code update might be necessary.');
            });
    
        });

    });

});
