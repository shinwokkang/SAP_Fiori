/*global QUnit*/

sap.ui.define([
	"code2/fiori/pratice/code2fioripractice/controller/praticeFiori.controller"
], function (Controller) {
	"use strict";

	QUnit.module("praticeFiori Controller");

	QUnit.test("I should test the praticeFiori controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
