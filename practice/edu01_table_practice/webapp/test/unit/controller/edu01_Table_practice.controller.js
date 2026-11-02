/*global QUnit*/

sap.ui.define([
	"code2/fiori/practice/edu01tablepractice/controller/edu01_Table_practice.controller"
], function (Controller) {
	"use strict";

	QUnit.module("edu01_Table_practice Controller");

	QUnit.test("I should test the edu01_Table_practice controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
