/*global QUnit*/

sap.ui.define([
	"code2/fiori/exam/emamproject/controller/ExamView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ExamView Controller");

	QUnit.test("I should test the ExamView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
