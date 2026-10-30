/*global QUnit*/

sap.ui.define([
	"code2/fiori/vizchart01/code2fiorivizchart01/controller/VizChart01View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("VizChart01View Controller");

	QUnit.test("I should test the VizChart01View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
