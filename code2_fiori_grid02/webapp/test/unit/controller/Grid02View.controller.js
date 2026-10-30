/*global QUnit*/

sap.ui.define([
	"code2/fiori/grid02/code2fiorigrid02/controller/Grid02View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Grid02View Controller");

	QUnit.test("I should test the Grid02View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
