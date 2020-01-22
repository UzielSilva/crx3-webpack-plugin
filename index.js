var fs = require('fs');
var path = require('path');
var join = path.join;
var mkdirp = require('mkdirp');
var crx3 = require('crx3');

function Plugin(options) {
  this.options = options || {};
  if (!this.options.updateUrl) {
    this.options.updateUrl = "http://localhost:8000/";
  }
  if (!this.options.updateFilename) {
    this.options.updateFilename = "updates.xml";
  }

  // remove trailing slash
  this.options.updateUrl = this.options.updateUrl.replace(/\/$/, "");

  // setup paths
  this.context = path.dirname(module.parent.filename);
  this.keyFile = path.isAbsolute(this.options.keyFile) ? this.options.keyFile : join(this.context, this.options.keyFile);
  this.outputPath = path.isAbsolute(this.options.outputPath) ? this.options.outputPath : join(this.context, this.options.outputPath);
  this.contentPath = path.isAbsolute(this.options.contentPath) ? this.options.contentPath : join(this.context, this.options.contentPath);

  // set output info
  this.crxName = this.options.name + ".crx";
  this.zipName = this.options.name + ".zip";
  this.crxFile = join(this.outputPath, this.crxName);
  this.zipFile = join(this.outputPath, this.zipName);
  this.updateFile = join(this.outputPath, this.options.updateFilename);
  this.updateUrl = this.options.updateUrl + "/" + this.options.updateFilename;
}

// hook into webpack
Plugin.prototype.apply = function(compiler) {
  var self = this;
  return compiler.plugin('done', function() {
    self.package.call(self);
  });
}

// package the extension
Plugin.prototype.package = function() {
  var self = this;
  mkdirp(self.outputPath, function(err) {
    if (err) throw(err)
    this.crx = crx3([this.contentPath], {
      keyPath: this.keyFile,
      crxPath: this.crxFile,
      zipPath: this.zipFile,
      xmlPath: this.updateFile,
      crxURL: this.updateUrl,
    });
  });
}

module.exports = Plugin;
