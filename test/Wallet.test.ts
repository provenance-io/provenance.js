import { expect, use } from 'chai';

import { Wallet } from '../src/wallet/Wallet';

describe('Wallet', function () {

    this.timeout(5000);

    it(`Creates a testnet wallet with valid keys from bip39 mnemonic`, async () => {
        const wallet = Wallet.fromMnemonic(BIP39_MNEMONIC, false);
        for (var idx = 0; idx < TOTAL_KEYS; idx++) {
            const key = wallet.getKey(0, idx);
            expect(key.address).to.equal(EXPECTED_TESTNET_KEYS[idx].address);
            expect(key.publicKey).to.equal(EXPECTED_TESTNET_KEYS[idx].publicKey);
            // TODO: expect(key.privateKey).to.equal(EXPECTED_TESTNET_KEYS[idx].privateKey);
        }
    });

    it(`Creates a mainnet wallet with valid keys from bip39 mnemonic`, async () => {
        const wallet = Wallet.fromMnemonic(BIP39_MNEMONIC, true);
        for (var idx = 0; idx < TOTAL_KEYS; idx++) {
            const key = wallet.getKey(0, idx);
            expect(key.address).to.equal(EXPECTED_MAINNET_KEYS[idx].address);
            expect(key.publicKey).to.equal(EXPECTED_MAINNET_KEYS[idx].publicKey);
            // TODO: expect(key.privateKey).to.equal(EXPECTED_MAINNET_KEYS[idx].privateKey);
        }
    });

    const BIP39_MNEMONIC = 'name broom medal pen slogan blush version banana message grant all decline weekend rhythm near art imitate milk winter clap awesome green soccer beauty';
    const TOTAL_KEYS = 20;

    const EXPECTED_TESTNET_KEYS = [
        {
            address: 'tp1aat3l2m362vyj74rhajr8yng8r05rvl3c0uxzn',
            publicKey: '021c24421051d6a36db71b8ed4eca8e1c416df01eaefc47f3f4d3b859dd190e384',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCCDzIhYzkP5Fp1BZNTrT0OkLeO/RdyUgaKD/auh+xyutKAHBgUrgQQACg==',
        },
        {
            address: 'tp13n9htv3464hpe6sr9y8uhkgf2j3ystds8tzqhv',
            publicKey: '036601552ca3e1661dfb0cf6e96a412492443939693a12560496e0bcf16d5e0e31',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCDd1xPJkvRofXCVILDjDFbe/7NZnmGBwYU/I1FYZx+0zqAHBgUrgQQACg==',
        },
        {
            address: 'tp1sp4f0ymwc84j0f4d4cu72gvhjuw7wsszcutux7',
            publicKey: '02ad7dad9b9b1a36d9e01bde5c413e7b3e57803463302f334d801dd46a3206aeed',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCDIxY50KT6gRJI4qb45bXKmJdiAVcE8A/jeR5yKNRREs6AHBgUrgQQACg==',
        },
        {
            address: 'tp1szmgnu930sf5yjhwqs7uqqhrg5lgjn3nv4np4d',
            publicKey: '03d6c18bee94fd323309f518e22b283779e546907f7d8f03ef6a62f1ba86166f27',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCCu+7NXeaNELznsPpcROcOmpJ39oD8gKZNJWtIjTobYZ6AHBgUrgQQACg==',
        },
        {
            address: 'tp1ks4age4v6k2q0hqfaed9s8rtgu32d48s040qzn',
            publicKey: '038c3c4946d185e2784ba272dcd0d0fe27b79d3b4bd326aa49be4b8341e2db8223',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCBvuZeKetllMALN1f0U1HBqeiGhsv/LHp2+ZleTaa0qkKAHBgUrgQQACg==',
        },
        {
            address: 'tp1c0cwv0crh8j44250td4f4xu8gdmg89ecfuv0qj',
            publicKey: '03e64b6ad21e2d8da4048adb713c49a30001a937e90f54ff4d4b0f9964c5d2a9a0',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCChIF/YKsjGVcwhdqoVkz2715dyjodetOi2ShAPjZrhU6AHBgUrgQQACg==',
        },
        {
            address: 'tp1a6xak7grxhqzk2xdvmkydhdutkqwghmdy78y55',
            publicKey: '02c508f686b3d914d283f4c00592f5dcfef3c1c8a09ce998cb337c09b47775c517',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCB/g/xQMe9HpKoppd7nBByALWKl2i4rhNmGqfbZ4FCEQKAHBgUrgQQACg==',
        },
        {
            address: 'tp1l3d9a27jmnfwd75a7wp66wasucu2x28js6njyl',
            publicKey: '036edd6688ae0acfa1150da9e8158d00cfb3faf4fa46fd88b9c60f9b9b7ab878ae',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCCaiR08nU+ZzEkuuDVPykvmwjdEQK+Vqgp1p3jhOR5cfaAHBgUrgQQACg==',
        },
        {
            address: 'tp1sfgmdrh9w66vxympqvxnkcqjhf64fjprn0lwxv',
            publicKey: '02815d2b5c21d4aa59c9971ccce895444a01678318c4dd2fef9e54fea3b52a5546',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCB4kIbUDF6rCBEThkkHsCOSs+LZw/VuHfvt9fjGrzLNdKAHBgUrgQQACg==',
        },
        {
            address: 'tp1p589suu7c07adxuzl8hujw4a3u47pvfea7k8x4',
            publicKey: '03f35b059f0e9aa25ea00820f161305dc235d440f3e4cc689f0c56d759b787f8dd',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCDWUv0Y/xEuu7CaRzakHl2SL7PBN6sbN+0leSFI37b1RqAHBgUrgQQACg==',
        },
        {
            address: 'tp1cjg5ayugtxdqmnj2s65tg2znp9kewu29526ujr',
            publicKey: '021aa722bb0a6061096817474c66b30ff8884f7506d4f64828a140532246799e5f',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCC7KLHHinmJS9IV0ui+HHCpW3f/KNNlLXrprgz93l+V16AHBgUrgQQACg==',
        },
        {
            address: 'tp1fyh4mtsdrjwdu9tf5tm2n9rye8fmc262ldtd2q',
            publicKey: '03df2785b88365522beebce30002f413322897f6d1fca29f90109ebf13061ade4c',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCAOuqMGGmqZ9mADUwHyvMF+Lff12rkxpKGboOYmS4wHnKAHBgUrgQQACg==',
        },
        {
            address: 'tp1jsj653xrsmd0fzv5xc9j95qc9cdzffw75y0nc4',
            publicKey: '03a22cdb86d0020ebafeb23034eec5116686b27b054283c30e0ada2f9b8b1508fc',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCDpZNWS3a0J5j6wjKN9F4mIWv0smJS4NhKzbi+dkqU9DKAHBgUrgQQACg==',
        },
        {
            address: 'tp176egkgev4xh5gsltfzj4t374xvzp3pv0kpvhj8',
            publicKey: '0370d1d07d82375ea2f87962b176670a41694d2ddd70297b0f3168eb9b164708ba',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCAfV0yPnjaD0gg0QlmETG9D6JiJmcQEYfW6tlS5uHmA3qAHBgUrgQQACg==',
        },
        {
            address: 'tp15pdfyvm5zlk6ue223v5p6qg9j5awtnmqsjhe0c',
            publicKey: '0291e225db8b035aca097d9789cde5160474d433984643bb6a9f2ed4a9f316cf6a',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCB7qT9TcEcfMZp7msaQaGbgkAy4zzDxZxjZbmdZ0sqiOKAHBgUrgQQACg==',
        },
        {
            address: 'tp1vtc55l7w9zf6ffvm0hzmf0g3mgw8aj3vcd2lc3',
            publicKey: '024aa2ef3aaef6103a22bde843282ad5b218e29fb78a50d5d84b385fc1b7019d26',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCDs2jTLO8SWsCZQ54d61Vwz3AJuv3pRzAxhS0CVLVCLc6AHBgUrgQQACg==',
        },
        {
            address: 'tp1se8sqnc7cdukkx8g47pz73yyrzn005a3em0enl',
            publicKey: '0300c3ef3846f5ccb6b9bbcc8be954528016b7d0a702350a273ed0270a9fa7ff75',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCBOkHz7Kk1KdH49vsb5X/5LXVqlVKufVSyP30RYeZnNwKAHBgUrgQQACg==',
        },
        {
            address: 'tp1caswgqxfsp6taysyrmz7w86d7fqrw75lls6e3u',
            publicKey: '03da784ae524f3e5d6a8b5cc1c3fa9626a4e150510c2d21c71d1238d4807ac5b72',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCBXXeJHP/YE4cJGZHyhmz/VgmUl9JHUjhfVrs9c74tBO6AHBgUrgQQACg==',
        },
        {
            address: 'tp1v6c7x9u7eplnn2y85fnk9hv944dlc7h6p42fq3',
            publicKey: '03162cf0b9eca53d9335070c10b73925e9fea56a17ae343a6845acf97473074a09',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCCb9bw7EuSTOVqkS2vm7j9H27LMX88g9W6+2gePObkNp6AHBgUrgQQACg==',
        },
        {
            address: 'tp1xgek9950gdhgcdcmwulk57fywqgfwqde2gm7jc',
            publicKey: '03cc030a2eddf3d7238413bb7906c71fe6393db2103d41ad99895a40d864269110',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCDRhhonhCMBq/D4DVLap0Z+Ct2ATNSXCHon66tFJADHk6AHBgUrgQQACg==',
        },
    ];

    const EXPECTED_MAINNET_KEYS = [
        {
            address: 'pb1gcu35kealufyzk6ndyy5577d48utfl9nd5jdmq',
            publicKey: '027d475e15b01b03b4695a6a72751a2919c83e15a45647bb6dce7a81b71593034c',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCAmZVop/T2H6KfxH+IR3LNKaLuh0EKeJsCJtptevYlneKAHBgUrgQQACg==',
        },
        {
            address: 'pb15p9mqm6uvmau4eyc8sk4420akfl8r7zshn2ah0',
            publicKey: '03be05c922f48b5bf1aab0e5e476e1fb0f2aba062bc7781bf2a5856478b66d7f23',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCCXbyQwq0yngLp7UDXasxTc2q2DHvp/gWqicl7RXxLN8KAHBgUrgQQACg==',
        },
        {
            address: 'pb1syz7nm2epx832g4xr2halcum0uls5a67k5suux',
            publicKey: '030d3e9b0fbc9dbda5e453fa69486ae833c1f6dd5d35523642abf7641172909411',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCCeipUIIDDTkL+/97d6cGZT0WiOcCraYhNE7nHz8O97RKAHBgUrgQQACg==',
        },
        {
            address: 'pb1zcsvsg84lu6hprussha4rw975g6puzx6tx0upz',
            publicKey: '02594bc9e20075927c2bf234903d44c1401481f6780e93338655e78be598f9c548',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCCu7SQt0rYLW1pGjrLbn+4MqO3OMRiRg8628DjrGebSXKAHBgUrgQQACg==',
        },
        {
            address: 'pb1auvd24hp0v3rw6d2za3wrnt0l9gef7g25m8ssp',
            publicKey: '0299d464a09b666b2f5ed8295890fdd2016cac9ebc3921a65356a5ca98d803a789',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCAH1KNxufSW3GKwpTgAXBwS6HZxz0Em0tvpZMtm0UY5ZKAHBgUrgQQACg==',
        },
        {
            address: 'pb1p907rtzkzk7ajhhs7n7jxkrpe4mg2cgd026e8a',
            publicKey: '028dcffdf582c49c2eba8d0c2220d449f8bbfbf765e5adf63917300bccac210c4c',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCAu/5pNEK+FAEvTYQ9TFPjwwmDsrfV2P7Pcn/DJdtHlE6AHBgUrgQQACg==',
        },
        {
            address: 'pb1ky6f24qyqxqd2ltwnq8wlww2gfehe824fy3myw',
            publicKey: '0375f5783c958e2b98b15fa0a92932fbcfb4b32793529384db7c64d10b4a8197e8',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCChyYG1688kxv5CApdJS1SLr8zy4jn7ZcSR0kfk0hgXfqAHBgUrgQQACg==',
        },
        {
            address: 'pb1aanznergt2h7rnk0wa3srp2vwjyrs553eq9fcp',
            publicKey: '030abeac86a1bc525ba3bf1b70a4d3f85e6bf824ec1452c6328c3ca5c51d545eaa',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCC5g4w8gW36gXTQg6mPJFBh8/nSwzTQu1b4ZnX8/zbbhaAHBgUrgQQACg==',
        },
        {
            address: 'pb10qhtguj36m8u4k7t29eqjw8zknnslpu8cjhp6p',
            publicKey: '025e739ce2038198969e0c555201bd0a07c917e1eac983cf0f593d6dfe0d4e9309',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCB5JUVauTeExsZo79Uerl+IxuiNxBZrkRMNRuCV6Ep1KKAHBgUrgQQACg==',
        },
        {
            address: 'pb1d096jncjey5kcef4uk3agydqqqsfule3apj3sk',
            publicKey: '02a1d7321f5b9b4efd3779298ab3ce243105790319d0545378c12b49a816578437',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCBDMPtyE+nNjSReL5XVKTFUu4A26KkImJMcSNL8FxntsKAHBgUrgQQACg==',
        },
        {
            address: 'pb1svfucha7e5c0gxzrh32v806x88n5092a88l8u3',
            publicKey: '033f8d79c7efaee2e88edc3cb530e0b6ac94b0a85ff394466c2e6071ea540b890c',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCAiemoii8vz45mR+GpKR2N3qeYoClPB2zgeiUrM46FnSKAHBgUrgQQACg==',
        },
        {
            address: 'pb1ch3aku0gelmq40ydcat4yle0lwww6ea2uamjwx',
            publicKey: '02e94d92e1aca4e210df3614f696eab600c5096416301cd2060c9299bc24708637',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCAog9I+IW7PCpWFuUBbQuNdrCc6Q+tw3tfNSfgA0xFxn6AHBgUrgQQACg==',
        },
        {
            address: 'pb1s2ajnyk8xkaed23jte480mxacc28a27yhyrht2',
            publicKey: '03f2994d4fd755b3f02d63d4116c1162dfbefb875d7b0befc59f2b682751078a35',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCAykcFxB0R1AEXPBJ5py/vRKJ9O5l+JamsBLlgttUbRR6AHBgUrgQQACg==',
        },
        {
            address: 'pb1569a0g0xnzdz5ml9f9fzu9xuruujm2gqp7jmwp',
            publicKey: '0200f36b1737aadbb3ca1726ed0805534d3c89e5a2b8fe14b7696615798932ac9e',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCCQOZQEpCWDo+PVd3yRQ6F/fOIL93J4q1GFc9yZ22vN16AHBgUrgQQACg==',
        },
        {
            address: 'pb1s8cvx89uh2uaam0gxdus5xfhyttxsc5rjzvad0',
            publicKey: '034e6a688eec339920871cab69507148963563ee0d58b3438a3b23ff80241cf8f5',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCAD+E+GXZEnJxmOCpMqVrOfz/stN7qznHdL/emwPh1zFaAHBgUrgQQACg==',
        },
        {
            address: 'pb1j09s45ssj6ncg4579f3327x4mr0yr8shn864zq',
            publicKey: '022e9b2cdb1a41b2ae7b31dbf55ae61d24bed86b74882150013cf932738a5ee6e1',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCCKfNtjr4iyqH9urnR1ymwm8tqfP5VpeJyenjPK7PcY8qAHBgUrgQQACg==',
        },
        {
            address: 'pb1sn0ssclxrh9fl2w8w8276kmdc2n76mvpan3hgw',
            publicKey: '0357f36b2e3f31954aa38dc1512b2cc2b9f578756760859881c521920ef3e022d0',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCALWcrnSl6vjUx/ShqfS1USgpyS9qVtidqfKSQiqQZuQKAHBgUrgQQACg==',
        },
        {
            address: 'pb1gst07d830vtxzpy6qrjgxerl9wm6yrfsaedvc6',
            publicKey: '024bb8d050744c36c1074901874a6e4ab4a7ff36fd5168be9ae3be29e7655f5ac2',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCB4IkjiD5HUnIzjGX387lP4mbkOVjBpFiINCOsoyrvY1aAHBgUrgQQACg==',
        },
        {
            address: 'pb15rta8th3the8d9dpwr5vczmshu76j4m5cxm4rx',
            publicKey: '028a2f3805a0d4b4c74f9ba423c86a68547c1fd6826fea42b0c84e5fe71149986e',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCAQpkk8XZ98Cxt64Dw2jnBsxW34kVPMNjeboX5dtJ9dk6AHBgUrgQQACg==',
        },
        {
            address: 'pb1vk0ptdv7dztft38a7nev5360tk2werzcp8e7rs',
            publicKey: '035aef2e4da1691da41b41a3dc422e9034a020fecce38464444e8cbee45180b478',
            privateKey: 'MEcCAQAwEAYHKoZIzj0CAQYFK4EEAAoEMDAuAgEBBCBMPu1wSMgxjLz1bxM6T0hXl0ttfy39cR43Fy+ocfd6zaAHBgUrgQQACg==',
        },
    ];

});
