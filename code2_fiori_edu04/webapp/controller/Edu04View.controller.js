sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code2.fiori.edu04.code2fioriedu04.controller.Edu04View", {
        onInit() 
        {
            let oData = {
                            ls_Airline : {
                                            Carrid   : "AA",
                                            Carname  : "America Air",
                                            CurrCode : "USD"
                                         },
                            
                            lt_Class   : [
                                             {Name : "강신욱", Number : 1},
                                             {Name : "강인학", Number : 2},
                                             {Name : "김민기", Number : 3},
                                             {Name : "김수빈", Number : 4},
                                             {Name : "김수연", Number : 5}
                                         ]
                        },
                
                oModel       = new JSONModel(oData);
            
            this.getView().setModel(oModel);
            this.getView().setModel(new JSONModel("/data/Material.json"), "Mat");



        },

        checkModel : function ()
        {
            // oModel 을 또 선언하는 것은 local 이기 때문에 가능함.
            let oModel = this.getView().getModel(),
                oJson  = oModel.oData.ls_Airline;
            
            for (const key in oJson) {
                const element = oJson[key];
                console.log("Key : " + key + "/ element : " + element);               
            }

            console.log("--------------------");
            

            console.log(oModel);
            console.log(oModel.oData);
            console.log(oModel.oData.ls_Airline);
            console.log(oModel.oData.ls_Airline.Carname);
            console.log(oModel.oData.ls_Airline.Carrid);
            console.log(oModel.oData.ls_Airline.CurrCode);
        },

        checkItab : function ()
        {
            let oJson  = this.getView().getModel().oData,
                lt_data = oJson.lt_Class;
                
            for (const index in lt_data) {
                console.log( "index : " + index );
                console.log( lt_data[index]);                
                console.log( "-------" );
            
            }

            console.log("=========")

            for (const ls_data of lt_data) {
                for (const key in ls_data) { 
                    const element = ls_data[key];
                    console.log(element);                 
                }
            }
        },

        checkJsonFile : function()
        {
            let oModel = this.getView().getModel("Mat"), // 여기 "Mat 써줘야됨을 유의할 것. 자주 까먹을 듯."
                lt_steel = oModel.oData.gt_steel;

            for (const ls_steel of lt_steel) {
                console.log(ls_steel.Matnr + " , " + ls_steel.Maktx + " , " + ls_steel.Mtart);
                
            }

        }
    });
});


/**
 * ABAP 에서의 naming -> 불문율임. (오류나지 않지만 반드시 지켜야함. 추후 관리 차원에서.)
 * 해당 변수가 전역인지 지역인지가 중요해지고, ABAP에서 배열(internal table)인지 하나의 Row 인지
 * 
 * 
 * strutor와 internal Table 을 구분하는 것도 중요함.
 * prefix로 이름을 짓는 것이 중요함.
 * ABAP은 prefix로 naming 관리하는 것이 굉장히 중요함.
 * 찾아다녀야하는 문제점이 생김 ( // 이거 예시 하나 들어줘. )
 * 
 * 전역 : Global
 *  전역 -> "g" 로 시작
 *      internal Table => gt_변수명
 *      struct         => gs_변수명
 *      변수            => gv_변수명
 * 
 * 지역 : Local
 *  지역 -> "l" 로 시작
 *      internal Table => lt_변수명
 *      struct         => ls_변수명
 *      변수            => lv_변수명
 * 
 * 
 * key는 식별자이기 때문에 네이밍을 따로 하지 않음.
 * 
 * 
 * ABAP에서는
 * ls_airline.Carrname 이라는 표현을
 * ls_airline-Carrname 으로 표현된다.
 * 특정 struct나 internal Table 안에 있는 것을 표현할 때에는 "-"
 * 
 * 
 * lt_class -> 배열 안에 여러개의 struct 넣고자 함.
 * internalTable 은 필드 갯수와 필드 이름이 같다. (2개, Name, Number 가 같다. 다른 것은 없다.)
 *  Ex) 1행은 Name인데, 2행은 Class로 사용하고 그런 것은 말이 안된다고 하심.
 *  key를 가지고 있는 모든 data는 동일한 key 구조로 가지고 있다.
 *  배열에 넣은 이유 == 동일한 구조의 구조를 넣고자 하기 때문이다.
 * 지금 위에 있는 lt_class와 internalTable의 구조가 똑같다고 하심 !
 * 그래서 위의 구조를 잘 이해하는 것이 매우 중요함. ( // 이 부분에 대해서 풀어서 설명해주고 internalTable에 대해서 추후에 이해하기 용이하도록 약간 internalTable은 어떤 지 풀어서 설명해줘. )
 * 
 * lt_data 내의 struct 구조에 대해서 네이밍을 어떻게 줘야할까?
 * ls 는 있는데 누구한테 속해있나 ? == lt_data 에 속해있다.
 * 따라서 " ls_data " 라고 네이밍을 맞춰준다. (이거 중요 !!)
 * internal Table의 한개의 struct를 가지고 있는 것을 나타낼 때 누구의 것인지 네이밍을 명확하게 나타내줄 것.
 * gt_data 내의 struct 는 gs_data 라고 표현.
 * lt_AAA 내의 struct 는 ls_AAA 라고 표현. 등. 네이밍 매우 중요함.
 * 
 * JSON 은 gt인데,
 * 선언을 하면서 lt 와 ls로 되어가는 과정에 대해서 나중에 헷갈릴 것 같음.
 * -> 이 부분에 대해서 정리를 조금 더 해야될 것 같음.
 * 
 * 
 * ABAP에서는 단순한 for while 이 아닌 for of , for in 같은 형식으로 가지고 옴.
 * 
 */     
