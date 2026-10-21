/*global QUnit*/

sap.ui.define([
	"code2/script/edu01/code2scriptedu01/controller/Edu01View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Edu01View Controller");

	QUnit.test("I should test the Edu01View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
