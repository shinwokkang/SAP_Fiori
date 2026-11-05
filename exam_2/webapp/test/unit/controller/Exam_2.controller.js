/*global QUnit*/

sap.ui.define([
	"code2/fiori/exam/exam2/controller/Exam_2.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Exam_2 Controller");

	QUnit.test("I should test the Exam_2 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
