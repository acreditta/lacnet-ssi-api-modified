import Router from "./router.js";

export default class DIDRouter extends Router {

  constructor( logger ) {
    super( logger );
  }

  init() {
    this.get( '/', 'PUBLIC', this.healthCheck );
  }

  async healthCheck() {
    return { status: 200, message: 'Healthy' };
  }

}