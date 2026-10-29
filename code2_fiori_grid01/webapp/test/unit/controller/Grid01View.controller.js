/*global QUnit*/

sap.ui.define([
	"code2/fiori/grid01/code2fiorigrid01/controller/Grid01View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Grid01View Controller");

	QUnit.test("I should test the Grid01View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
