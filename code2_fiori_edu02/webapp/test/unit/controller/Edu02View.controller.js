/*global QUnit*/

sap.ui.define([
	"code2/fiori/edu02/code2fioriedu02/controller/Edu02View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Edu02View Controller");

	QUnit.test("I should test the Edu02View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
