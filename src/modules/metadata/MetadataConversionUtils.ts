import { ObjectStoreLocator } from '../../types';

import * as provenance_metadata_v1_objectstore_pb from '../../proto/provenance/metadata/v1/objectstore_pb';
import * as provenance_metadata_v1_p8e_p8e_pb from '../../proto/provenance/metadata/v1/p8e/p8e_pb';
import { MetadataAddress } from '../../utils/MetadataAddress';

export class MetadataConversionUtils {

    public static contractSpecIdToMetadataAddress(contractSpecId: string | MetadataAddress): MetadataAddress {
        if (contractSpecId.constructor.name === 'MetadataAddress') {
            return (contractSpecId as MetadataAddress);
        } else {
            try {
                return (MetadataAddress.forContractSpecification(contractSpecId as string));
            } catch (ex) {
                return (MetadataAddress.fromBech32(contractSpecId as string));
            }
        }
    }

    public static scopeIdToMetadataAddress(scopeId: string | MetadataAddress): MetadataAddress {
        if (scopeId.constructor.name === 'MetadataAddress') {
            return (scopeId as MetadataAddress);
        } else {
            try {
                return (MetadataAddress.forScope(scopeId as string));
            } catch (ex) {
                return (MetadataAddress.fromBech32(scopeId as string));
            }
        }
    }

    public static scopeSpecIdToMetadataAddress(scopeSpecId: string | MetadataAddress): MetadataAddress {
        if (scopeSpecId.constructor.name === 'MetadataAddress') {
            return (scopeSpecId as MetadataAddress);
        } else {
            try {
                return (MetadataAddress.forScopeSpecification(scopeSpecId as string));
            } catch (ex) {
                return (MetadataAddress.fromBech32(scopeSpecId as string));
            }
        }
    }

    public static considerationSpecFromObject(spec: provenance_metadata_v1_p8e_p8e_pb.ConsiderationSpec.AsObject): provenance_metadata_v1_p8e_p8e_pb.ConsiderationSpec {
        var inputSpecs: provenance_metadata_v1_p8e_p8e_pb.DefinitionSpec[] = [];
        spec.inputSpecsList.forEach((inputSpec) => {
            inputSpecs.push(MetadataConversionUtils.definitionSpecFromObject(inputSpec));
        });

        return (new provenance_metadata_v1_p8e_p8e_pb.ConsiderationSpec())
            .setFuncName(spec.funcName)
            .setInputSpecsList(inputSpecs)
            .setOutputSpec(MetadataConversionUtils.outputSpecFromObject(spec.outputSpec))
            .setResponsibleParty(spec.responsibleParty);
    }

    /*
    public static contractFromObject(contract: Contract): provenance_metadata_v1_p8e_p8e_pb.Contract {
        return (new provenance_metadata_v1_p8e_p8e_pb.Contract())
            .setConditionsList(contract.conditionsList)
            .setConsiderationsList(contract.considerationsList)
            .setContext(contract.context)
            .setDefinition(MetadataConversionUtils.definitionSpecFromObject(contract.definition))
            .setInputsList(contract.inputsList)
            .setInvoker(contract.invoker)
            .setRecitalsList(contract.recitalsList)
            .setSpec(contract.spec)
            .setStartTime(contract.startTime)
            .setTimesExecuted(contract.timesExecuted);
    }
    */

    public static definitionSpecFromObject(spec?: provenance_metadata_v1_p8e_p8e_pb.DefinitionSpec.AsObject): provenance_metadata_v1_p8e_p8e_pb.DefinitionSpec | undefined {
        if (spec !== undefined) {
            var resourceLocation = undefined;
            if (spec.resourceLocation !== undefined) {
                var ref = undefined;
                if (spec.resourceLocation.ref !== undefined) {
                    var groupUuid = undefined;
                    if (spec.resourceLocation.ref.groupUuid !== undefined) {
                        groupUuid = (new provenance_metadata_v1_p8e_p8e_pb.UUID())
                            .setValue(spec.resourceLocation.ref.groupUuid.value);
                    }

                    var scopeUuid = undefined;
                    if (spec.resourceLocation.ref.scopeUuid !== undefined) {
                        scopeUuid = (new provenance_metadata_v1_p8e_p8e_pb.UUID())
                            .setValue(spec.resourceLocation.ref.scopeUuid.value);
                    }

                    ref = (new provenance_metadata_v1_p8e_p8e_pb.ProvenanceReference())
                        .setGroupUuid(groupUuid)
                        .setHash(spec.resourceLocation.ref.hash)
                        .setName(spec.resourceLocation.ref.name)
                        .setScopeUuid(scopeUuid);
                }

                resourceLocation = (new provenance_metadata_v1_p8e_p8e_pb.Location())
                    .setClassname(spec.resourceLocation.classname)
                    .setRef(ref)
            }

            return (new provenance_metadata_v1_p8e_p8e_pb.DefinitionSpec())
                .setName(spec.name)
                .setType(spec.type)
                .setResourceLocation(resourceLocation)
                .setSignature(MetadataConversionUtils.signatureFromObject(spec.signature));
        } else {
            return undefined;
        }
    }

    public static objectStoreLocatorFromObject(locator: ObjectStoreLocator): provenance_metadata_v1_objectstore_pb.ObjectStoreLocator {
        return (new provenance_metadata_v1_objectstore_pb.ObjectStoreLocator())
            .setEncryptionKey(locator.encryptionKey)
            .setLocatorUri(locator.locatorUri)
            .setOwner(locator.owner);
    }

    public static outputSpecFromObject(spec?: provenance_metadata_v1_p8e_p8e_pb.OutputSpec.AsObject): provenance_metadata_v1_p8e_p8e_pb.OutputSpec | undefined {
        if (spec !== undefined) {
            return (new provenance_metadata_v1_p8e_p8e_pb.OutputSpec())
                .setSpec(MetadataConversionUtils.definitionSpecFromObject(spec.spec));
        } else {
            return undefined;
        }
    }

    public static signatureFromObject(signature?: provenance_metadata_v1_p8e_p8e_pb.Signature.AsObject): provenance_metadata_v1_p8e_p8e_pb.Signature | undefined {
        if (signature !== undefined) {
            var signer = undefined;
            if (signature.signer !== undefined) {
                var encryptionPublicKey = undefined;
                if (signature.signer.encryptionPublicKey !== undefined) {
                    encryptionPublicKey = (new provenance_metadata_v1_p8e_p8e_pb.PublicKey())
                        .setCurve(signature.signer.encryptionPublicKey.curve)
                        .setPublicKeyBytes(signature.signer.encryptionPublicKey.publicKeyBytes)
                        .setType(signature.signer.encryptionPublicKey.type);
                }

                var signingPublicKey = undefined;
                if (signature.signer.signingPublicKey !== undefined) {
                    signingPublicKey = (new provenance_metadata_v1_p8e_p8e_pb.PublicKey())
                        .setCurve(signature.signer.signingPublicKey.curve)
                        .setPublicKeyBytes(signature.signer.signingPublicKey.publicKeyBytes)
                        .setType(signature.signer.signingPublicKey.type);
                }

                signer = (new provenance_metadata_v1_p8e_p8e_pb.SigningAndEncryptionPublicKeys())
                    .setEncryptionPublicKey(encryptionPublicKey)
                    .setSigningPublicKey(signingPublicKey);
            }

            return (new provenance_metadata_v1_p8e_p8e_pb.Signature())
                .setAlgo(signature.algo)
                .setProvider(signature.provider)
                .setSignature(signature.signature)
                .setSigner(signer);
        } else {
            return undefined;
        }
    }

}
