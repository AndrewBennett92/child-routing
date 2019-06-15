import * as Router from 'ojs/ojrouter'
class Options {
    parentRouter: Router
    constructor(params: any) {
        this.parentRouter = params.parentRouter
    }

    loadOption1 = () => {
        this.parentRouter.go('option1')
    }

    loadOption2 = () => {
        this.parentRouter.go('option2')
    }

    loadOption3 = () => {
        this.parentRouter.go('option3')
    }

    connected() {
        console.log('options connected')
    }
}

export = Options