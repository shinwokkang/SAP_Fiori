sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code2.fiori.grid02.code2fiorigrid02.controller.Grid02View", {
        onInit() 
        {
            let oJsonData = {
                            countrySet : [
                                            {Country : "대한민국",   Capital : "서울",          Area : "동아시아"},
                                            {Country : "홍콩",      Capital : "홍콩",           Area : "동아시아"},
                                            {Country : "태국",      Capital : "방콕",           Area : "동남아시아"},
                                            {Country : "캐나다",    Capital : "오타와",          Area : "북중미"},
                                            {Country : "호주",      Capital : "캔버라",          Area : "오세아니아"},
                                            {Country : "브라질",    Capital : "브라질리아",       Area : "남미"},
                                            {Country : "아르헨티나", Capital : "부에노스아이레스",  Area : "남미"},
                                            {Country : "독일",      Capital : "베를린",          Area : "유럽"},
                                            {Country : "러시아",    Capital : "모스크바",         Area : "유럽"}
                                        ]   
                            },
                oModel    = new JSONModel(oJsonData),
                oModel2   = new JSONModel("/data/material.json");

                this.getView().setModel(oModel);
                this.getView().setModel(oModel2, "Mat");
                        
        },

        onSearch : function ()
        {
            // let oBinding = this.getView().byId("countrySet").getBinding();
            let oBinding = this.getView().byId("countrySet").getBinding(),
                oFilter = null,
                aFilter  = [],
                vCountry = this.getView().byId("ICountry").getValue(),
                vArea    = this.getView().byId("IArea").getValue();
            
            // eslint-disable-next-line no-console
            console.log(oBinding);


            // if (vCountry != "")
            // {
            //     oFilter = new sap.ui.model.Filter({
            //         path: "Country",
            //         operator : sap.ui.model.FilterOperator.EQ,
            //         value1 : vCountry,
            //         value2 : oBinding
            //     })
            // }

            if (vCountry != "")
            {
                oFilter = new Filter({
                    path: "Country",
                    operator : FilterOperator.Contains,
                    value1 : vCountry
                });

                aFilter.push(oFilter); // null 은 넣지 않는다.
            }

            if (vArea != "")
            {
                oFilter = new Filter({
                    path: "Area",
                    operator : FilterOperator.Contains,
                    value1 : vArea
                });
                 aFilter.push(oFilter);
            }

 
            oBinding.filter(aFilter);
            this.getView().byId("ICountry").setValue("");
            this.getView().byId("IArea").setValue("");

            
            // Filter에 null 값이 들어가면 알아서 All 로 출력됨.
        },

        onSearch2 : function ()
        {
            let oBinding  = this.getView().byId("materialSet").getBinding(),
                oFilter   = null,
                aFilter   = [],
                vMatnr    = this.getView().byId("IMatnr").getValue(),
                vNetprice = this.getView().byId("INetprice").getValue();
         


            if (vMatnr != "")
            {
                oFilter = new Filter({
                    path: "Matnr",
                    operator : FilterOperator.Contains,
                    value1 : vMatnr
                })
                 aFilter.push(oFilter);
            }

            // input 값 비교할 때 !
            if (vNetprice != "")
            {
                oFilter = new Filter({
                    path: "Netprice",
                    operator : FilterOperator.EQ,
                    value1 : parseInt(vNetprice)
                })
                 aFilter.push(oFilter);
            }

            oBinding.filter(aFilter);

        }
    });
});

/**
 * onSearch 에 대해서
 * Row를 가지고 있는 것이 Table이라는 component
 * input이라는 태그를 썻을 때에도 어떤 Input에 값이 들어갔는 지 알기 위해서 id를 부여했는데,
 * 
 * 우린 Table을 검색할 것인데, vIEW에 테이블이 여러개가 있을 때
 * -> 어떤 테이블이 가지고 있는 지 식별해내야함.
 * 따라서 테이블에도 ID를 주어야함.
 * 
 * TABLE에 있는 것을 검색하기 위해서 어떤 것들이 필요할까?
 * TABLE COMPONENT에 들어가있는 DATA를 알아야됨.
 * => getModel로는 안되는 이유.
 * TABLE에 묶여있는 데이터를 읽어서 원하는 것을 찾아서 테이블에 나타나도록 해야함.
 * 
 * 해당 TABLE에 묶여있는 JSON DATA를 받아와야함.
 * 해당 TABLE COPONENT에 대해서 알아볼 필요가 있음 -> API 공식문서로 감.
 * 
 * https://ui5.sap.com/1.120.52/#/api/sap.ui.table.Table%23methods/Summary
 * getBinding : Get the binding object for a specific aggregation/property.
 * aggregation 을 다룬다 oJson을 다룰 때 aggregation이라고 함.
 * Table에서 aggregation은 순환형 데이터를 가지고 있는데, 특정 aggregation을 가지고 있는데 
 * -=> 묶여있는 객체 중 특정 aggregation (순환형 데이터)를 준다.
 * 
 * 따라서 이것이 필요하다고 하심.! (근데 이거 읽는 방법에 대해서 조금 더 이해하기 쉽게 설명 좀 해줘.)
 * 
 * 
 * 1. View의 Table에 id를 준다.
 * 
 * https://ui5.sap.com/1.120.52/#/api/sap.ui.table.Table%23methods/getBinding
 * GetBinding 메서드가 무엇을 받는가 ?
 * sName? / string / "rows" / Name of the property or aggregation
 * Defluat Value 가 "rows" 인데 무조건 rows를 사용하면 안됨.
 * ui.table / item.table 등에 따라 다르다는 데 이해 못함.
 * 
 * rows는 
 * <t:Table
            id="countrySet"
            rows="{/countrySet}"    
 * 여기의 rows를 주면 된다고 하시는데, 이해가 잘 안됨.
            rows라는 속성에 Binding 정보가 있다고 하심.
 * Returns이
sap.ui.model.Binding / The binding for the given name
Binding 이라는 Class를 던져줌.

-> Binding이란 Class가 뭔지 보기위해서
https://ui5.sap.com/1.120.52/#/api/sap.ui.model.Binding 여길로 들어감.

받아오면 만들어진 상태로 Return이 되기때문에 Constructor는 필요없음.

무엇이 필요할까? 를 보기 위해서 Method를 본다.
https://ui5.sap.com/1.120.52/#/api/sap.ui.model.Binding%23methods/Summary

Table 컴포넌트가 이미 쓰고 있는 Binding을 사용하기 때문에 Constructor가 필요없고
이걸 사용해서 "검색"을 하기 때문에 Method를 본다.

---- 공식문서에 없어서 일단 패스 .

Binding을 가지고 무엇을 하는가?
Binding이 필터를 건다는 의미이다.
=> 있는 것 중에서 찾는다.

필터를 걸기위해서 무엇이 필요한가?
Filter를 검색함 -> https://ui5.sap.com/1.120.52/#/api/sap.ui.model.Filter
필터를 구성해야하니까 Constructor를 봄.

Example: Using an object with a path, an operator and one or two values

  sap.ui.define(['sap/ui/model/Filter', 'sap/ui/model/FilterOperator'], function(Filter, FilterOperator) {
    new Filter({
      path: "Price",
      operator: FilterOperator.BT,
      value1: 11.0,
      value2: 23.0
    });
  });

path : 해당 키 (우리는 Country)
operator : 연산자 (어떤 연산을 하는가? FilterOperator.BT = FilterOperater도 Class, BT는 Between )
value1 , value2 는 이 사이의 것을 찾는다.

우리가 하고자하는 것은 검색이므로
FilterOperator의 .BT가 아닌 우리의 것에 맞게한다.

검색을 받아온다.
View에서 Input id 에서 가져온다.
-> vCountry = this.getView().byId("ICountry").getValue();

필터를 구성해보자.
1. 아무 것도 검색하지 않았을 때 = 모두 다 나와야함.
2. 검색하면 나와야함
=> if 문을 사용함.

oFilter = new sap.ui.model.Filter()
Filter() 를 부르기 위해서는 sap.ui.model.Filter를 가져와야함.


FilterOperator는 sap.ui.model.FilterOperator 이걸 또 사용해야함.
https://ui5.sap.com/1.120.52/#/api/sap.ui.model.FilterOperator

FilterOperator 의
Contains -> *아* 등 "아"가 있기만 하면 다 가지고 와라
EndsWith -> 끝나는 말.
EQ -> 같다
GQ -> 크거나 같다
LE, LT, NB, NE 등등 ..


getBinding을 통해서 받아왔음.
Binding은 검색을 Filter로 하기때문에 Filter로 함.
oFilter를 처음에 null 로 둔이유. 선언만 하기 위해서 (사용자의 입력을 받으면 그 때 가져오려고.)

Filter - 입력한 것이 있다면 필터링 , 없으면 전부 나오도록 함.

검색어를 입력하기 않고 Search부터 눌러서 메시지 뜰거면 if 문에서 조절하면 됨.


 */