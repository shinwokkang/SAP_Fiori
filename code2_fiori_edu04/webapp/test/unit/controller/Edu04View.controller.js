/*global QUnit*/

sap.ui.define([
	"code2/fiori/edu04/code2fioriedu04/controller/Edu04View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Edu04View Controller");

	QUnit.test("I should test the Edu04View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
