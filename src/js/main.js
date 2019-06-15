/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */

/**
 * Example of Require.js boostrap javascript
 */

'use strict';

requirejs.config({
  // Path mappings for the logical module names
  paths:
  //injector:mainReleasePaths
  {
    // path mappings are controlled via the path_mappings.json file
  }
  //endinjector
});

require(['root'],
  function (root) { // this callback gets executed when all required modules are loaded
    var rootVM = new root();
  });



