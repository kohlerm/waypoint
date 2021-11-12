import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { GetDeploymentRequest, Deployment, Ref } from 'waypoint-pb';
import ApiService, { DeploymentExtended } from 'waypoint/services/api';
import { Model as AppRouteModel } from '../app';

type Model = Deployment.AsObject;

export default class DeploymentsList extends Route {
  @service api!: ApiService;

  async model(): Promise<DeploymentExtended> {
    let app = this.modelFor('workspace.projects.project.app') as AppRouteModel;
    return app.deployments[0];
  }

  redirect(model: Model): void {
    this.transitionTo('workspace.projects.project.app.deployment.deployment-seq', model.sequence);
  }
}
