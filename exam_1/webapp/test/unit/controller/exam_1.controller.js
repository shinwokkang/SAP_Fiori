/*global QUnit*/

sap.ui.define([
	"code2/fiori/exam/exam1/controller/exam_1.controller"
], function (Controller) {
	"use strict";

	QUnit.module("exam_1 Controller");

	QUnit.test("I should test the exam_1 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
