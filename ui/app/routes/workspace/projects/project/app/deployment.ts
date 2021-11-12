import Route from '@ember/routing/route';
import { Model as AppRouteModel } from '../app';
import DeploymentsController from 'waypoint/controllers/workspace/projects/project/app/deployment';
import { DeploymentExtended } from 'waypoint/services/api';

type Model = AppRouteModel['deployments'];

export default class Deployment extends Route {
  async model(): Promise<Model> {
    let app = this.modelFor('workspace.projects.project.app') as AppRouteModel;
    return app.deployments;
  }

  afterModel(): void {
    let latestDeployment = this.modelFor(this.routeName)[0] as DeploymentExtended;
    if (!this.routeName.endsWith('/(seq/)d/')) {
      this.transitionTo(
        'workspace.projects.project.app.deployment.deployment-seq',
        latestDeployment.sequence
      );
    }
  }

  resetController(controller: DeploymentsController, isExiting: boolean): void {
    if (isExiting) {
      controller.set('isShowingDestroyed', null);
    }
  }
}
