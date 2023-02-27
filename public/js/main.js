"use strict";

requirejs.config({
  paths: {
    postmonger: "./js/postmonger",
  },
  shim: {
    "./js/jquery.min": {
      exports: "$",
    },
    "./js/customActivity": {
      deps: ["jquery.min", "postmonger"],
    },
  },
});

requirejs(["./js/jquery.min", "./js/customActivity"], function ($, customEvent) {});
requirejs(["./js/jquery.min"], function($) {});

requirejs.onError = function (err) {
  if (err.requireType === "timeout") {
    console.log("modules: " + err.requireModules);
  }
  throw err;
};