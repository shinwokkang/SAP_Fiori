sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code2.fiori.practice.edu01tablepractice.controller.edu01_Table_practice", {
        onInit() 
        {
            let oModel = new JSONModel("/data/practice-shop.json");
            this.getView().setModel(oModel, "Sales");

            this.getView().setModel(new JSONModel("/data/practice-sales.json"), "Sales2");
        },

        searchProducts : function ()
        {
            // 1. 검색 대상 표의 목록 연결을 가져옵니다.
            let oBinding  = this.getView().byId("productTable").getBinding(),
                oFilter   = null,
                aFilter   = [],
                vkeyword  = this.getView().byId("keyword").getValue(),
                vcategory = this.getView().byId("category").getValue();
            
            // 2. 상품명 입력이 있을 때만 포함 조건을 만듭니다.
            if (vkeyword != "")
            {
                oFilter = new Filter({
                    path: "Name",
                    operator : FilterOperator.Contains,
                    value1 : vkeyword
                });

                aFilter.push(oFilter); // null 은 넣지 않는다.
            }
            
            // 3. 분류 입력이 있을 때만 정확 일치 조건을 만듭니다.
            if (vcategory != "")
            {
                oFilter = new Filter({
                    path: "Category",
                    operator : FilterOperator.Contains,
                    value1 : vcategory
                });
                 aFilter.push(oFilter);
            }
            
            // 4. 조건 배열을 표의 Binding에 적용합니다.
            oBinding.filter(aFilter);
            this.getView().byId("keyword").setValue("");
            this.getView().byId("category").setValue("");
            
            
            },

        resetProducts : function ()
        {
            let oBinding  = this.getView().byId("productTable").getBinding();
                oBinding.filter();

            this.getView().byId("keyword").setValue("");
            this.getView().byId("category").setValue("");
        },

        applyDiscount : function ()
        {
            // let lt_member = this.getView().getModel("Member").oData.gt_member,
            let oModel        = this.getView().getModel("Sales"),
                lt_product    = oModel.oData.gt_product,    // [ {}, {}, {}, {} ]
                vDiscountRate = parseInt(this.getView().byId("discountRate").getValue()),
                lt_discount   = []; // 할인 결과를 담을 빈 배열.


            for (const ls_product of lt_product) {
                let ls_discount = {
                    Code : ls_product.Code,
                    Name : ls_product.Name,
                    Category : ls_product.Category,
                    Price : ls_product.Price,
                    Stock : ls_product.Stock,
                    SalePrice : parseInt(ls_product.Price) * (100-vDiscountRate) / 100
                };

                lt_discount.push(ls_discount); // [ {}, {}, {}, {} ..]
            }

            let oDiscountModel = new JSONModel({
                gt_product: lt_discount
            });

            this.getView().byId("productTable2").setModel(oDiscountModel, "Sales" );
        },

        resetDiscount : function ()
        {
            this.getView().byId("discountRate").setValue("0");
            this.applyDiscount();
        },







        showAllSales : function ()
        {
            let lt_Sales          = this.getView().getModel("Sales2").oData.gt_sale, // [ {}, {}, {}, {} ]             
                lv_stationeryQty = 0,
                lv_drinkQty      = 0,
                lv_snackQty      = 0,
                lv_qty           = 0,
                lv_total         = 0;

            console.log(this.getView().getModel("Sales2"));
            console.log(this.getView().getModel("Sales2").oData);
            console.log(lt_Sales);

            // ls_shop = { }
            for (const ls_Sales of lt_Sales) {
                lv_qty   += ls_Sales.Qty;
                lv_total += ls_Sales.Qty * ls_Sales.Price;

                switch (ls_Sales.Category)
                {
                    case "문구":
                        lv_stationeryQty += ls_Sales.Qty;
                        break;
                    case "음료":
                        lv_drinkQty += ls_Sales.Qty;
                        break;
                    case "간식":
                        lv_snackQty += ls_Sales.Qty;
                        break;
                }

                let lt_chart = [
                    {Category: "문구", Qty: lv_stationeryQty},
                    {Category: "음료", Qty: lv_drinkQty},
                    {Category: "간식", Qty: lv_snackQty}
                ];

                let oChartModel = new JSONModel({gt_chart: lt_chart});

                this.getView().byId("salesChart").setModel(oChartModel, "Sales");
                this.getView().byId("qty").setText(String(lv_qty));
                this.getView().byId("total").setText(String(lv_total));
            }
            
        },






        showPaidSales : function ()
        {
            let lt_Sales          = this.getView().getModel("Sales2").oData.gt_sale, // [ {}, {}, {}, {} ]             
                lv_stationeryQty = 0,
                lv_drinkQty      = 0,
                lv_snackQty      = 0,
                lv_qty           = 0,
                lv_total         = 0;

            for (const ls_Sales of lt_Sales) {
                if ( ls_Sales.Paid ){
                    lv_qty   += ls_Sales.Qty;
                    lv_total += ls_Sales.Qty * ls_Sales.Price;

                    switch (ls_Sales.Category){
                        case "문구":
                            lv_stationeryQty += ls_Sales.Qty;
                            break;
                        case "음료":
                            lv_drinkQty += ls_Sales.Qty;
                            break;
                        case "간식":
                            lv_snackQty += ls_Sales.Qty;
                            break;
                    }
                }
            }

            let lt_chart = [
                {Category: "문구", Qty: lv_stationeryQty},
                {Category: "음료", Qty: lv_drinkQty},
                {Category: "간식", Qty: lv_snackQty}
            ];

            let oChartModel = new JSONModel({gt_chart: lt_chart});
            
            this.getView().byId("salesChart").setModel(oChartModel, "Sales");
            this.getView().byId("qty").setText(String(lv_qty));
            this.getView().byId("total").setText(String(lv_total));
        },












        showAllSales2: function (bPaidOnly)
        {
            let oView = this.getView();
            let oModel = oView.getModel("Sales2");
            let lt_sale = oModel && oModel.oData && oModel.oData.gt_sale;

            if (!lt_sale) {
                alert("판매 데이터를 불러온 뒤 다시 눌러주세요.");
                return;
            }

            let oCategoryQty = {"문구": 0, "음료": 0, "간식": 0};
            let lv_qty = 0;
            let lv_total = 0;

            for (const ls_sale of lt_sale) {
                if (bPaidOnly === false || ls_sale.Paid === true) {
                    lv_qty   += ls_sale.Qty;
                    lv_total += ls_sale.Qty * ls_sale.Price;

                    oCategoryQty[ls_sale.Category] += ls_sale.Qty;
                }
            }

            let lt_chart = [];

            for (const lv_category in oCategoryQty) {
                lt_chart.push({
                    Category: lv_category,
                    Qty: oCategoryQty[lv_category]
                });
            }

            let oChartModel = new JSONModel({gt_chart: lt_chart});

            oView.byId("salesChart").setModel(oChartModel, "Sales");
            oView.byId("qty").setText(lv_qty + "개");
            oView.byId("total").setText(lv_total + "원");
        },















        addToCart: function ()
        {
            let oView         = this.getView(),
                oProductModel = oView.getModel("Sales"), // 원본 상품 모델
                oCartModel    = oView.getModel("Cart"),     // 지금까지 담은 주문 모델
                lt_product    = oProductModel && oProductModel.oData && oProductModel.oData.gt_product,
                lt_cart       = oCartModel && oCartModel.oData && oCartModel.oData.gt_cart;

            if (!lt_product || !lt_cart) {
                alert("상품 JSON과 Cart 모델 연결을 확인해주세요.");
                return;
            }

            // 1. 입력값 읽기: Number로 바꿔야 소수 입력을 잘라서 통과시키지 않습니다.
            let lv_productCode = oView.byId("productCode").getValue().trim(),
                lv_qtyText     = oView.byId("productQty").getValue().trim(),
                lv_productQty  = parseInt(lv_qtyText);

            // let lv_productQty = Number(lv_qtyText);

            if (lv_productCode === "" || lv_qtyText === "" ||
                !Number.isInteger(lv_productQty) || lv_productQty < 1 || lv_productQty > 10) {
                alert("상품 코드와 주문 수량1~10 정수를 입력해주세요.");
                return;
            }

            // 2. 상품 코드가 정확히 일치하는 원본 상품 한 행 찾기
            let ls_product = null;
            for (const ls_productRow of lt_product) {
                if (ls_productRow.Code === lv_productCode) {
                    ls_product = ls_productRow;
                    break;
                }
            }

            if (ls_product === null) {
                alert("등록되지 않은 상품 코드입니다.");
                return;
            }

            // 3. 이미 주문 목록에 있는 상품인지 확인하기
            let ls_cart = null;
            for (const ls_cartRow of lt_cart) {
                if (ls_cartRow.Code === lv_productCode) {
                    ls_cart = ls_cartRow;
                    break;
                }
            }

            // 4. 이번 입력 + 기존 주문 수량을 합쳐 재고와 비교하기
            let lv_newQty = lv_productQty;
            if (ls_cart !== null) {
                lv_newQty += ls_cart.Qty;
            }

            if (lv_newQty > ls_product.Stock) {
                alert("재고가 부족합니다.");
                return;
            }

            // 여기까지는 검사만 합니다. 모든 검사를 통과한 다음 주문을 바꿉니다.
            // 5. 처음 담는 상품은 새 행을 추가하고, 같은 상품은 기존 행을 갱신하기
            if (ls_cart === null) {
                let ls_newCart = {
                    Code: ls_product.Code,
                    Name: ls_product.Name,
                    Category: ls_product.Category,
                    Price: ls_product.Price,
                    Qty: lv_newQty,
                    Amount: ls_product.Price * lv_newQty
                };
                lt_cart.push(ls_newCart);
            } else {
                ls_cart.Qty = lv_newQty;
                ls_cart.Amount = ls_cart.Price * lv_newQty;
            }

            // 6. 현재 주문 목록 전체를 기준으로 합계와 차트 수량을 다시 계산하기
            let lv_totalQty = 0;
            let lv_totalAmount = 0;
            let lv_stationeryQty = 0;
            let lv_drinkQty = 0;
            let lv_snackQty = 0;

            for (const ls_order of lt_cart) {
                lv_totalQty += ls_order.Qty;
                lv_totalAmount += ls_order.Amount;

                switch (ls_order.Category) {
                    case "문구":
                        lv_stationeryQty += ls_order.Qty;
                        break;
                    case "음료":
                        lv_drinkQty += ls_order.Qty;
                        break;
                    case "간식":
                        lv_snackQty += ls_order.Qty;
                        break;
                }
            }

            let lt_chart = [
                {Category: "문구", Qty: lv_stationeryQty},
                {Category: "음료", Qty: lv_drinkQty},
                {Category: "간식", Qty: lv_snackQty}
            ];

            // 7. 수업의 new JSONModel + setModel로 주문표·합계·차트를 함께 갱신하기
            let oNewCartModel = new JSONModel({
                gt_cart: lt_cart,
                gt_chart: lt_chart,
                TotalQty: lv_totalQty,
                TotalAmount: lv_totalAmount
            });
            oView.setModel(oNewCartModel, "Cart");

            // 성공했을 때만 입력값을 비웁니다.
            oView.byId("productCode").setValue("");
            oView.byId("productQty").setValue("");
        },


        
    });
});
