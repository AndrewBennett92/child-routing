/**
  Copyright (c) 2015, 2018, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
'use strict';

var fs = require('fs-extra');

module.exports = function (configObj) {

  //This will copy all the TS files to web/js/ts output directory.
  //This is required because to debug we need sourcemap files to work
  //correctly. Since the composite output is within a version folder
  //we need the ts files of composites in this directory
  const filterFunc = (src, dest) => {
    // your logic here
    // it will be copied if return true
    console.log('copying::'+ src + ' to web/js/ts folder');
    if(src.endsWith('.ts')){
      console.log('copying::'+ src + ' to web/js/ts folder');
      return true;
    }
    else if(fs.lstatSync(src).isDirectory()){
      return true;
    }
    return false;
  }

  return new Promise((resolve, reject) => {
    console.log("Running after_serve hook.");
    let outputDir = configObj['paths']['staging']['stagingPath'];
    let source = './'+outputDir+ '/ts/jet-composites';
    let dest = './'+outputDir+ '/js/ts/jet-composites';
    fs.copy(source, dest, { filter: filterFunc }, err => {
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
