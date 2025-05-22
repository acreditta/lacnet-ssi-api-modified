## SSI API Modified to be used for Acreditta

This is the source code of lacnet ssi-api (see README ORIG.md, and take into account that this API uses the port 8080) with the following modifications to be used for Acreditta:

<ul>
<li>Modify config to include the network name (testnet or mainnet)</li>
<li>Modify the vc router (swagger and service) to include "issue" route that receives the following params:
    <ul>
        <li>claimsVerifier: The address of the claims verifier contract</li>
        <li>credential: The credential object (Open Badge 3.0)</li>
        <li>issuer: The issuer addres (without the did:... prefix, only the public key 0x...)</li>
        <li>privateKey: The issuer private key</li>
        <li>distribute: Boolean parameter to choose if register credential on blockchain or not</li>
    </ul>
</li>
<li>Modify the vc router (swagger and service) to include "revokeHash" route that allows to revoke a credential only by its hash. It is important to know that only distributed credentials (credentials that where distributed on blockchain) can be revoked. The route url schema is /revoke/:registry/:hash, where:
    <ul>
        <li>registry: The address of the registry contract</li>
        <li>hash: The credential hash to revoke</li>
    </ul>
</li>
<li><b>¡WARNING! </b>Also a did router was created to manage did methods, but it has an incompatibility with the node version. The code is still there to future development but it <b>MUST NOT BE USED</b>
</li>
</ul>

## Env config:

This API uses the port 8080. Create the following environment variables (Data contained here is a functional example with a testnet node address, but you must change this variables for your own environment):

```
ACCOUNT_ADDRESS: "0x1b06d1a0c45c85f951d2d4bb3e6617f0d9472529"
ACCOUNT_PRIVATE_ENCRYPTION_KEY: "07c7976c13f9452931cf81240267a372ef10ade904595b6085809c550ff78bfe"
ACCOUNT_PRIVATE_KEY: "07c7976c13f9452931cf81240267a372ef10ade904595b6085809c550ff78bfe"
ACCOUNT_PUBLIC_ENCRYPTION_KEY: "0x1b06d1a0c45c85f951d2d4bb3e6617f0d9472529"
NODE_ADDRESS: "0x62563b6608e45d8ffc97115695a076e900c2f6a2"
NODE_EXPIRATION: 1736394529

```

<hr />


## Get started:

<ol>
<li>
  Set a docker-compose-override.yml file with the enviroment variables and deploy thecontainer by running docker-compose up (run docker-compose build if you had a previousimage). If you want to deploy directly from Docker file feel free to do it (rememberto set the required enviroment variables).
</li>
<li>
  Check API by fetch /healthy endpoint. Remember that this api uses the port 8080. It should  return a 200 status whith the following object:

  ```
  {
      "message": "Healthy"
  }

  ```

  If it returns an error check the deployment, check environment permissions, or restart the  deployment following this guide.
</li>
</ol>

The endpoints of this API are being called only from lacnet-issuer-api, from src/services/issuerService and src/services/vcService, if you want to see how these endpoints are called please check those files on <a href="https://github.com/acreditta/lacnet-issuer-api.git">https://github.com/acreditta/lacnet-issuer-api.git</a>

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 919127997747.dkr.ecr.us-east-1.amazonaws.com
docker build -t lacnet-api-ssi . --platform linux/amd64

docker tag lacnet-api-ssi:latest 919127997747.dkr.ecr.us-east-1.amazonaws.com/lacnet-api-ssi:latest


ocker push 919127997747.dkr.ecr.us-east-1.amazonaws.com/lacnet-api-ssi:latest