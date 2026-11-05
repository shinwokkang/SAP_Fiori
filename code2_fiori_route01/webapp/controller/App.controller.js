sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("code2.fiori.route01.code2fioriroute01.controller.App", {
      onInit() {
      }
  });
});


/**
 * routing 순서
 * 1. View - Controller 1:1 로 매핑
 * 2. menifest.json 파일에 routing 정보 입력
 *    - routing 의 routes와 targets만 건들이면 됨.
 *    -
 *      "routes": [
        {
          "name": "RouteCenterView",
          "pattern": ":?query:",
          "target": [
            "TargetCenterView"
          ]
        }
      ], 

      => 여기의 name 값은 Appview에 CenterView를 올린다는 의미임.
      => routes에 각각의 View의 이름을 부여할 수 있다.

      => pattern : query string
            -> parameter를 던질 때 관여한다.
      
      => target : 은 아래의 targets를 의미한다.
      
      "targets": {
        "TargetCenterView": {
          "id": "CenterView",
          "name": "CenterView"
        }
      }
      => 여기에서 view id 와 view name이 있다 !
      -> name 만 우리가 맞춘 view에 맞추고
      -> id 는 그냥 식별하기 위함.
      => 그런데 id와 name 을 맞추는 것이 일반적임.


      이것과 맞춰서 routes와 targets 에 내가 추가하고자 하는 routing을 추가하면 된다.

      --------------------------------
      또한 pattern에 Viewname을 넣어서 넘겨줘야하기 때문에
      차후에 파라미터를 넘길 때 필요하다고 하심. (추후 확장성 때문에)
      targets의 name과 맞춰달라고 하심.
      추후에 파라미터를 넘길 때 이 형식이라고 하심.
      ---------------------------------

    https://ui5.sap.com/1.120.53/#/api/sap.ui.core.UIComponent
    UIComponent 클래스를 통해서 routing 정보를 가져온다.
    Constructor
    routing 정보를 가지고 오는 기능
    - 1. Methods 를 확인한다. (기능이 있지 않을까? )
    2. byUd => getView().byId() 가 가능한가보다?
      2-1. get을 보자. -> getRouter 가 있고 getRouterFor 가 있다.

      getRouterFor 가 필요하다.
      -> 클래스 이름 (sap.~ ) 까지 다 나온 이유
        -> 앞에 경로부터 객체 이름까지 다 나온 이유는 우리가 객체를 사용하려면 해당 클래스를 대표하는 instance.
        getRouter와 같은 Method 이름만 있는 것은 해당 클래스가 시동이 걸려진 상태일 때 호출이 가능 (instance Method) 라고 함.
        클래스 이름으로 바로 부르는 것은 Static 정적 메소드라고 하는데, 이건 instance가 필요없음. 즉, 생성자가 필요없고 해당 클래스 이름으로 직접 다이렉트로 호출이 가능하다는 의미임.
        이거 ABAP에서 클래스 만들 때 정적이냐 뭐 그런걸로 더 배운다고 하심.

      menifest.json에서 name하고 targets의 정보를 Return 해줌
      컨트롤러에서 먼저 가지고 와서 리턴을 해주는 구조라고 하심.

      Visibility: publicSince: 1.16.1
      sap.ui.core.UIComponent.getRouterFor(oControllerOrView) : sap.ui.core.routing.Router

      => 현재 this.getView()
      getRouterFor에 다가 this를 던져줘야한다는 의미라고 하셨는데, 잘 이해가 안갔음.

      sap.ui.core.UIComponent.getRouterFor(oControllerOrView)
      이걸로 먼저 라우팅 정보를 가지고 와야하는구나를 알자.

        onLeft : function ()
        {
            sap.ui.core.UIComponent.getRouterFor(this);
        }

    => 이렇게 하는데, Return 으로 Router를 던져준다.
    Router 클래스를 보자.
    https://ui5.sap.com/1.120.53/#/api/sap.ui.core.routing.Router
    이동한다 ? 라는 기능 -> Method를 보자.
    
    Go 하는 기능 -> get, set 이 아닌 To 를 보자.
    https://ui5.sap.com/1.120.53/#/api/sap.ui.core.routing.Router%23methods/navTo

    Visibility: public
    navTo(sName, oParameters?, oComponentTargetInfo?, bReplace?) : this

    sName : 라우트의 이름을 줘야함. ( menifest 의 routes.name )

        onLeft : function ()
        {
            sap.ui.core.UIComponent.getRouterFor(this).navTo("RouteLeftView");
        }

    이렇게 주면 된다.


    여기까진 라우팅 정보
    sap.ui.core.UIComponent.getRouterFor(this) 

    라우팅 정보를 주면 navTo 를 통해서 "이동" 이라는 기능을 실행함.
    sap.ui.core.UIComponent.getRouterFor(this).navTo("RouteLeftView");



    ----------------------------------
    11시 수업 : 모듈화에 대해서.

    지금 만든 
       sap.ui.core.UIComponent.getRouterFor(this).navTo("RouteLeftView"); 들이 계속 반복된다.

        getRouter : function ()
        {
            sap.ui.core.UIComponent.getRouterFor(this)
        }

    이 컨트롤러에서 라우팅 정보를 자주 가져와야함.
    따라서 이렇게 getRouter 라는 function으로 빼뒀다.
    => getRouter만 Call 하면 sap.ui.core.UIComponent.getRouterFor(this) 이 내용을 수행함.

    getRouterFor(this) 가 instance만 가져오고 끝나는 문제가 있음.
    우리는 이 function을 통해서 sap.ui.core.UIComponent.getRouterFor(this) 에서 받아온 값을 줘야된다.

    따라서 
            getRouter : function ()
        {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }

    요렇게 return 문을 작성해서 getRouter가 return으로 라우팅 정보를 주도록 한다 !
    즉, routing instance를 return하도록 만든다.

    ABAP에서는 모듈화가 매우 중요함.
    모듈화를 아주 잘 이해해서 반복적으로 사용, 특정 기능을 하는 부분을 따로 모아둘 것 !
    모아둬서 Call 만 해가지구 수행할 수 있도록 한다.

    [ 부르는 (Call ) 방법 ]
         onRight : function ()
        {
            getRouter().navTo("RouteRightView");
        },

      이렇게 작성하면
      not defined 가 나온다.

          onRight : function ()
        {
            this.getRouter().navTo("RouteRightView");
        },

      이렇게 this를 붙여줘서 this = 해당 Controller 내에서의 getRouter() 를 찾아라. 라고 말해준다.




      -------------------------
      지금 밀듯이 가는데, 이거 애니메이션 (어떤 식으로 View를 바꿀 지) 를 manifest.targets 에서 수정해서 바꿀 수 있음.
      "targets": {
        "TargetCenterView": {
          "id": "CenterView",
          "name": "CenterView",
      -> "transition":"show"
        },

        "TargetLeftView" : {
          "id": "LeftView",
          "name": "LeftView",
      ->  "transition": "flip"
        },

        "TargetRightView" : {
          "id": "RightView",
          "name": "RightView",
      ->  "transition":"fade"
        }
      }

        "transition" 이란 속성 slide(기본 값), flip, show, 



 */