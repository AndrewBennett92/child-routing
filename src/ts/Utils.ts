import {ojModule} from "ojs/ojmodule-element";
import ModuleElementUtils = require("ojs/ojmodule-element-utils");

class Utils {

    private constructor() {
    }

    public static resolveViewAndViewModel = (name: string, moduleConfig: KnockoutObservable<ojModule['config']>, cleanUpMode?: "onDisconnect"|"none", params?: object) =>{
        let viewPath = 'views/'+ name+ '.html';
        let viewmodelPath = 'viewModels/'+name;
        let viewPromises = Promise.all([
            ModuleElementUtils.createView({viewPath: viewPath}),
            ModuleElementUtils.createViewModel({viewModelPath: viewmodelPath, params: params})
        ]);
        viewPromises.then(
            (values) => {
                let vm = values[1];

                moduleConfig({view: values[0], viewModel: vm, cleanupMode: cleanUpMode? cleanUpMode: "onDisconnect"});
            },
            (rejectReason) => {
                console.log(rejectReason);
            }
        )
    }
}

export = Utils;

