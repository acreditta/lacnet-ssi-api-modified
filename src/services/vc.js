import moment from "moment";
import ethers from "ethers";
import { getCredentialHash, signCredential } from "@lacchain/vc-contracts-utils";
import config from "../config.js";
import { CLAIMS_VERIFIER, CREDENTIAL_REGISTRY, signer, getCustomSigner } from "../util/contracts.js";
import { getIssuerName, getRootOfTrust, verifyCredential, verifyRootOfTrust } from "../util/vc_contracts.js";

export default class VCService {

  async issue( credential, verifier, issuer = null, privateKey = null, distribute = true ) {
    console.log("Issue");
    const issuerAddress = issuer || config.account.address;
    const issuerPrivateKey = privateKey || config.account.privateKey;
    console.log("Private Key: "+issuerPrivateKey);
    
    const customSigner = getCustomSigner( issuerPrivateKey );
    console.log("custom signer: "+customSigner);
    
    const claimsVerifier = new ethers.Contract( verifier, CLAIMS_VERIFIER.abi, customSigner );
    console.log("Verifier: ");
    
    const subject = credential.credentialSubject.id.split( ':' ).slice( -1 )[0];
    if (!credential.expirationDate) {
      const issuanceTimestamp = Math.round(moment(credential.issuanceDate).valueOf() / 1000);
      const defaultValidTo = 3155760000; // 100 years in milliseconds
      credential.expirationDate = moment(issuanceTimestamp + defaultValidTo).toISOString();
    }
    
    const credentialHash = getCredentialHash( credential, issuerAddress, verifier );
    console.log("Hash: "+credentialHash);
    
    const signature = await signCredential( credentialHash, issuerPrivateKey );
    console.log("Signature: "+signature);
    const validFrom = Math.round( moment( credential.issuanceDate ).valueOf() / 1000 );
    const defaultValidTo = 3155760000;
    const validTo = credential.expirationDate ? Math.round(moment(credential.expirationDate).valueOf() / 1000) : defaultValidTo + validFrom;

    if (validTo) {
      console.log("Expiration: " + validTo);
    } else {
      console.log("Credential does not have an expiration date.");
    }

    let tx = {hash: "not distributed"}
    if ( distribute ) {
      tx = await claimsVerifier.registerCredential( subject, credentialHash,
          validFrom,
          validTo,
          signature, { from: issuerAddress } );
          console.log("Tx: "+tx);
    
    }

    credential.proof = [{
      type: "EcdsaSecp256k1Signature2019",
      created: moment().toISOString(),
      proofPurpose: "assertionMethod",
      verificationMethod: `did:lac:main:${issuerAddress}#vm-0`,
      domain: verifier,
      proofValue: signature
    }];

    credential.credentialStatus = {
      id: await claimsVerifier.registry(),
      type: 'SmartContract'
    };

    const vc = {
      verifier,
      registry: credential.credentialStatus.id,
      data: credential
    }
    return { credentialHash, vc, tx: tx.hash };
  }

  async revoke( registry, vc, issuer = null ) {
    const issuerAddress = issuer || config.account.address;
    const credentialRegistry = new ethers.Contract( registry, CREDENTIAL_REGISTRY.abi, signer );

    const credentialHash = getCredentialHash( vc.data, issuerAddress, vc.verifier );
    const tx = await credentialRegistry.revokeCredential( credentialHash );

    vc.status = 'revoked';
    vc.revokedAt = moment();
    return { hash: tx.hash };
  }
  async revokeHash( registry, hash, issuer = null, privateKey = null ) {
    const issuerAddress = issuer || config.account.address;
    const issuerPrivateKey = privateKey || config.account.privateKey;
    const customSigner = getCustomSigner( issuerPrivateKey );
    const credentialRegistry = new ethers.Contract( registry, CREDENTIAL_REGISTRY.abi, customSigner );
    const tx = await credentialRegistry.revokeCredential( hash );
    
    return { hash: tx.hash, revokedAt: moment() };
  }

  async verify( vc ) {
    const result = await verifyCredential( vc );

    const issuersChain = await getRootOfTrust( vc );
    const verification = await verifyRootOfTrust( issuersChain, vc.issuer );
    const issuerName = await getIssuerName( vc );
    const rootOfTrust = issuersChain.map( ( rot, i ) => ( {
          type: i === 0 ? 'Root PKD' : 'Trusted List',
          name: rot.name,
          detail: rot.address,
          valid: verification[i]
        } )
    );
    rootOfTrust.push( {
      type: 'Issuer',
      name: issuerName,
      detail: vc.issuer.replace( 'did:lac:main:', '' ),
      valid: result.issuerSignatureValid
    } );
    result.rootOfTrust = rootOfTrust;

    return result;
  }
}