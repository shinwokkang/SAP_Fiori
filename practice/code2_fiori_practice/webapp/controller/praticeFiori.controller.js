sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/Text"
], (Controller, JSONModel, MessageToast, Text) => {
    "use strict";

    return Controller.extend("code2.fiori.pratice.code2fioripractice.controller.praticeFiori", {
        onInit() 
        {
            /**
             * 다른 팀이 엑셀에서 뽑은 자재 목록을 2차원 배열로 보내 왔어요. 
             * 첫 줄은 칸 이름이고, 숫자도 전부 글자예요. 
             * UI5 표에 넣으려면 '같은 모양 객체들의 배열'(인터널 테이블 모양)이어야 해요.
             * 
             * """
             * const aRaw = [
                                ["Matnr",    "Maktx",       "Menge"],
                                ["STEEL_01", "Steel Plate", "120"],
                                ["BOLT_M8",  "Bolt M8",     "900"],
                                ["MOTOR_A",  "Motor A",     "12"]
                            ];
             *
             * ### 요구사항
                    1. aRaw를 `lt_material`(객체 배열)로 바꿔요. 키 이름("Matnr" 등)을 코드에 직접 쓰지 말고 **첫 줄에서 꺼내** 쓰세요. 
                    (단, '숫자로 바꿀 칸은 Menge'라는 것만은 코드에 써도 돼요.)
                    2. Menge만 숫자로, 나머지는 글자 그대로.
                    3. 수량 합계와 수량이 가장 많은 자재를 콘솔에 찍어요.
                    4. aRaw 첫 줄 끝에 `"Werks"`, 나머지 줄 끝에 `"1010"` · `"1020"` · `"1010"`을 더해도 **다른 코드는 한 글자도 안 고치고** 결과에 Werks가 들어가야 해요.
                    5. 이름은 📏 8 규칙대로 — 표 · 한 줄 · 값 하나가 각각 무엇인지 이름에서 보이게.
             */

                this.getView().setModel(new JSONModel({
                        ValueLiveUpdate : true,
                        InputValue      : "",
                        Length          : 0
                    }), "Live");


        const oRentalModel = new JSONModel("/data/rentalRequests.json");
            this.getView().setModel(oRentalModel, "Rent");

        },

        _run1 : function ()
        {
            /**
             * 1 번 문제
             */
            // const aRaw = [
            //     ["Matnr",    "Maktx",       "Menge"],
            //     ["STEEL_01", "Steel Plate", "120"],
            //     ["BOLT_M8",  "Bolt M8",     "900"],
            //     ["MOTOR_A",  "Motor A",     "12"]
            // ];

            // // ① 첫 줄 = 칸 이름 목록
            // const lt_field    = aRaw[0],
            //       lt_material = [];

            // // ② 1번 줄부터 = 데이터 줄 → 한 줄마다 객체(ls_material) 하나
            // for (let lv_row = 1; lv_row < aRaw.length; lv_row++) {
            //     const ls_material = {};

            //     // ③ 칸 번호 하나로 '칸 이름'과 '값'을 같은 자리에서 꺼내기
            //     for (let lv_col = 0; lv_col < lt_field.length; lv_col++) {
            //         const lv_field = lt_field[lv_col];          // "Matnr" · "Maktx" · "Menge"
            //         let   lv_value = aRaw[lv_row][lv_col];      // "STEEL_01" · "Steel Plate" · "120"

            //         if (lv_field === "Menge") {
            //             lv_value = parseInt(lv_value, 10);      // 수량만 숫자로
            //         }
            //         ls_material[lv_field] = lv_value;           // 키가 변수에 있으니 대괄호
            //     }
            //     lt_material.push(ls_material);                  // 완성된 한 줄을 표에
            // }

            // console.log(JSON.stringify(lt_material));

            // // ④ 합계 · 가장 많은 자재 — 표를 한 줄씩 돌며 (LOOP AT … INTO)
            // let lv_sum = 0,
            //     ls_max = lt_material[0];

            // for (const ls_material of lt_material) {
            //     lv_sum += ls_material.Menge;
            //     if (ls_material.Menge > ls_max.Menge) {
            //         ls_max = ls_material;
            //     }
            // }
            // console.log("수량 합계 : " + lv_sum);
            // console.log("가장 많은 자재 : " + ls_max.Matnr + " (" + ls_max.Menge + ")");




        },

        /**
         * 
         * 2번 문항
         */        onLiveChangeW2 : function (oEvent)
        {
            /**
             * 2번 문제
             */

            const sValue = oEvent.getParameter("value");

            this.getView().byId("tW2GetValue").setText(sValue);  
            // Sample 방식 그대로 (getValue 줄)
            
            this.getView().getModel("Live").setProperty("/Length", sValue.length);   
            // 글자 수는 Model로
            // 스위치 OFF(valueLiveUpdate false)면 Input의 value가 Model(/InputValue)로 들어가는 건
            // change(Enter · 칸 벗어남) 때뿐이라 getProperty 줄은 그때만 바뀌어요. liveChange는 늘 칠 때마다.

        },

        /**
         * 3번 문항
         */
        onAddMemo : function ()
        {
            const oInput = this.getView().byId("iMemo"),
                  oBox   = this.getView().byId("vbMemo"),
                  sMemo  = oInput.getValue();

            if (sMemo === "") {
                MessageToast.show("메모를 입력하세요", {
                    duration : 2000,
                    my       : "center top",
                    at       : "center top",
                    offset   : "0 20"
                });
                return;
            }
                const iNo = oBox.getItems().length + 1;                 // 몇 번째인지는 VBox에게 묻기
                oBox.addItem(new Text({ text : iNo + ". " + sMemo }));  // 실행 중에 만드는 컨트롤 → new + addItem
                oInput.setValue("");
                this._updateMemoState();
        },

        _updateMemoState : function ()
        {
            const cMax   = 5,
                  iCount = this.getView().byId("vbMemo").getItems().length,
                  bFull  = iCount >= cMax;

            this.getView().byId("lMemoCount").setText(iCount + " / " + cMax);
            this.getView().byId("bMemoAdd").setEnabled(!bFull);
            this.getView().byId("iMemo").setEditable(!bFull);
        },


        onReset : function ()
        {
            this.getView().byId("contactInput").setValue("");
        }

    });
});
