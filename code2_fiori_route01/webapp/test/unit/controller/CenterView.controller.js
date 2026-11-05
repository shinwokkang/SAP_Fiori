/*global QUnit*/

sap.ui.define([
	"code2/fiori/route01/code2fioriroute01/controller/CenterView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CenterView Controller");

	QUnit.test("I should test the CenterView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
