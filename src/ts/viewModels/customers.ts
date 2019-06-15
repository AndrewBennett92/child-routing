import * as Router from "ojs/ojrouter";
import Utils = require('../Utils');
import { ojModule } from 'ojs/ojmodule-element';
import * as ko from 'knockout'

class CustomersViewModel {
    childRouter: Router;
    moduleConfig: KnockoutObservable<ojModule['config']>;
    constructor() {
        let defaultConfig: ojModule['config'] = { view: [], viewModel: null, cleanupMode: "onDisconnect" };
        this.moduleConfig = ko.observable(defaultConfig);
        this.setupChildRouter();

        // Listen for changes of router after sync
        let currentRouterSelection = this.childRouter.moduleConfig.name;
        currentRouterSelection.subscribe(
          (name): void => {
            Utils.resolveViewAndViewModel(name, this.moduleConfig, 'onDisconnect', {parentRouter: this.childRouter});
          }
        );

        // Load initial module on sync
        Router.sync().then(() => {
            Utils.resolveViewAndViewModel(this.childRouter.moduleConfig.name(), this.moduleConfig, 'onDisconnect', {parentRouter: this.childRouter});
        })

    }

    public setupChildRouter(): void {
        this.childRouter = Router.rootInstance.createChildRouter(
            "settings-router",
            "customers"
          );

        this.childRouter.configure({
          "options": { isDefault: true },
          "option1": { label: "Module 1" },
          "option2": { label: "Module 2" },
          "option3": { label: "Module 3" }
        });


      }

    connected(): void {
        // Implement if needed
    };

    disconnected(): void {
        // Implement if needed
        this.childRouter.dispose();
    };

    transitionCompleted(): void {
        // Implement if needed
    };
}
export = CustomersViewModel;