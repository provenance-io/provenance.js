<div align="center">
<img src="./docs/logo.svg" alt="Provenance" width="106px" height="150px"/>
</div>

# Provenance.js

The provenance.js library aims to be a complete and compact Javascript/TypeScript library for interacting with the Provenance Blockchain and its ecosystem.

**WARNING!**
***This library is under active development and has not been released. Use at your own discretion.***

## Features

* Import and export BIP 39 mnemonic phrases (12 word backup phrases).
* Connect to Provenance nodes over [gRPC](https://grpc.io/) provider.
* Support for core Cosmos modules:
  * Bank
  * WASM
* Support for Provenance modules:
  *  Attribute
  *  Marker
  *  Name
* Fully TypeScript ready, with definition files and full TypeScript source.
* Import contract ABI from [JSON Schema](http://json-schema.org) to query and transact with contracts.

### Coming Soon

* Connection provider abstraction.
* Support for core Cosmos modules:
   *  Account
   *  Mint
* Support for Provenance modules:
  *  Metadata
* Suite of tools for event stream monitoring and filtering.

## License

Apache License 2.0
