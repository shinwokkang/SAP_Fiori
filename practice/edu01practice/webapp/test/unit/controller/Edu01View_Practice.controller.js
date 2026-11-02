/*global QUnit*/

sap.ui.define([
	"code2/fiori/practice/edu01practice/controller/Edu01View_Practice.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Edu01View_Practice Controller");

	QUnit.test("I should test the Edu01View_Practice controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
