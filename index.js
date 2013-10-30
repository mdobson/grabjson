#!/usr/bin/env node

var program = require("commander"),
    pkg = require("./package.json"),
    request = require("request"),
    fs = require("fs");

program
  .version(pkg.version)
  .usage("[options] [url]")
  .option("-s --save [file]", "Save resulting request to a file.")
  .option("-p --prop [property]", "Output a specific property")
  .parse(process.argv)

var file = program.file;
var prop = program.property;
var url = program.args.shift();

var reqOpts = {
  url: url,
  json: true
};

request(reqOpts, function(error, response, body) {
  if(error) {
    console.log(error);
  } else {
    var o = null;
    if(prop) {
      o = body[prop];
    } else {
      o = body;
    }

    if(file) {
      fs.writeFile(file, JSON.stringify(o, null, 2), function(error) {
        if(error) {
          console.log(error);
        }
      });
    }

    console.log(JSON.stringify(o, null, 2));
    
  }
});


