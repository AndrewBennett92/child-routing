/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */


import * as ko from "knockout";
import Router = require("ojs/ojrouter");
import Utils = require('./Utils');
import ArrayDataProvider = require('ojs/ojarraydataprovider');
import * as ResponsiveUtils from 'ojs/ojresponsiveutils';
import ResponsiveKnockoutUtils = require('ojs/ojresponsiveknockoututils');


//###Component imports###
import { ojDialog } from "ojs/ojdialog";
import { ojMenu } from "ojs/ojmenu";
import { ojNavigationList } from 'ojs/ojnavigationlist';
import { ojModule } from 'ojs/ojmodule-element';
import { ojButton } from 'ojs/ojbutton';
import { ojOption} from 'ojs/ojoption';

// this is for requiring the actual component
import "ojs/ojdialog";
import "ojs/ojtoolbar";
import "ojs/ojbutton";
import "ojs/ojmenu";
import "ojs/ojnavigationlist";
import "ojs/ojmodule-element";

class ControllerViewModel {
    router: Router;
    smScreen: KnockoutObservable<boolean>;
    mdScreen: KnockoutObservable<boolean>;
    moduleConfig: KnockoutObservable<ojModule['config']>;
    appName: KnockoutObservable<string>;
    userLogin: KnockoutObservable<string>;
    navDataSource: ArrayDataProvider<string, object>;
    drawerParams: object;
    footerLinks: Array<object>;
    menuButtonClass: KnockoutComputed<Array<string>>;
    menuItemSelect: (event: ojMenu.ojAction)=>void;
    close: (event: ojButton.ojAction)=>void;
    selectionChange: (event: ojNavigationList.selectionChanged<string, object>)=>void;
    constructor() {
        let self = this;
        this.router = Router.rootInstance;

        // Media queries for repsonsive layouts
        let smQuery = ResponsiveUtils.getFrameworkQuery('sm-only');
        if (smQuery) {
            self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
        }
        let mdQuery = ResponsiveUtils.getFrameworkQuery('md-up');
        if (mdQuery) {
            self.mdScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
        }

        // Navigation setup
        let navData = [
            {
                name: 'Dashboard',
                id: 'dashboard',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'
            },
            {
                name: 'Incidents',
                id: 'incidents',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
            },
            {
                name: 'Customers',
                id: 'customers',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
            },
            {
                name: 'About',
                id: 'about',
                iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'
            }
        ];

        // Header
        // Application Name used in Branding Area
        self.appName = ko.observable("TypeScript Starter Template");
        // User Info used in Global Navigation area
        self.userLogin = ko.observable("john.hancock@oracle.com");

        // Dropdown menu states
        self.menuItemSelect = function(event: CustomEvent) {
            let selectedOption = event.target as ojOption;
            switch (selectedOption.value) {
                case "about":
                    let dialog = document.getElementById('aboutDialog') as ojDialog;
                    dialog.open();
                    break;
                default:
            }
        };

        self.close = function() {
            let dialog = document.getElementById('aboutDialog') as ojDialog;
            dialog.close();
        }

        // Change the router state based on selection
        self.navDataSource = new ArrayDataProvider(navData, { keyAttributes: 'id' });
        self.selectionChange = (event: CustomEvent) => {
            let newVal = event.detail.value;
            if (newVal !== self.router.stateId()) {
                self.router.go(newVal);
            }
        }

        // Navigation setup
        let defaultConfig: ojModule['config'] = { view: [], viewModel: null, cleanupMode: "onDisconnect" };
        self.moduleConfig = ko.observable(defaultConfig);

        ko.computed(
            (): void => {
              Utils.resolveViewAndViewModel(this.router.moduleConfig.name(), self.moduleConfig, 'none', {})
            }
          );

        // Footer
        self.footerLinks = [
            new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
            new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
            new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
            new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        ];


    }
}

class footerLink {
    name: string;
    linkId: string;
    linkTarget: string;
    constructor(name: string, linkId: string, linkTarget: string) {
        this.name = name;
        this.linkId = linkId;
        this.linkTarget = linkTarget;
    }
}
export = ControllerViewModel;
