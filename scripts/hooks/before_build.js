/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/

'use strict';
var fs = require('fs-extra');

module.exports = function (configObj) {
  //This will copy all the non TS files to js source directory.
  const filterFunc = (src, dest) => {
    // your logic here
    // it will be copied if return true
    
    if(src.endsWith('.ts')){
      return false;
    }
    console.log('copying::'+ src + ' to src/js folder');
    return true;
  }
  return new Promise((resolve, reject) => {
    console.log("Running before_build hook.");
  	fs.copy('./src/ts/jet-composites', './src/js/jet-composites', { filter: filterFunc }, err => {
      if (err){
        console.error(err);
      }
      else{
        console.log('success!')
      }
      resolve();
    });
  });
};
