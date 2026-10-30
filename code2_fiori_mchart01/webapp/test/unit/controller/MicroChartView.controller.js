/*global QUnit*/

sap.ui.define([
	"code2/fiori/mchart/code2fiorimchart01/controller/MicroChartView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MicroChartView Controller");

	QUnit.test("I should test the MicroChartView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
