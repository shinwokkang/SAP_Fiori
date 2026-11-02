sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code2.fiori.practice.edu01practice.controller.Edu01View_Practice", {
        onInit() 
        {
            const oModel  = new JSONModel("/data/practice-members.json"),
                  lt_data = this.getView().setModel(oModel, "Member");

            if (!lt_data) {
                alert("JSON 파일을 불러온 뒤 다시 눌러주세요.");
                return;
            }

        },

        /**
         * 1번 실습
         */

        showName : function ()
        {
            let Name = this.getView().byId("showNameButton").getText();
                alert(Name);
        },

        finishSetting : function ()
        {
            this.getView().byId("settingButton").setEnabled(false);
            alert ("설정 완료");
        },

        /**
         * 2번 실습
         */

        showGreeting : function ()
        {
            let lv_Name = this.getView().byId("nameInput").getValue();
                          this.getView().byId("textResult").setText(lv_Name + "님, 환영합니다.");
            
                          this.getView().byId("nameInput").setValue("");
        },

        clearGreeting : function ()
        {
            this.getView().byId("nameInput").setValue("");
            this.getView().byId("textResult").setText("입력 대기");
        },

        calcOrder : function ()
        {
            let lv_price   = parseInt(this.getView().byId("price").getValue()),
                lv_qty     = parseInt(this.getView().byId("qty").getValue()),
                lv_packing = parseInt(this.getView().byId("packing").getValue()), 
                lv_total   = lv_price * lv_qty + lv_packing;      
            

            this.getView().byId("total").setValue(parseInt(lv_total));
        },

        calcRectangle : function ()
        {
            let lv_width  = parseInt(this.getView().byId("width").getValue()),
                lv_height = parseInt(this.getView().byId("height").getValue()),
                lv_area   = lv_width * lv_height,
                lv_perimeter = (lv_width + lv_height) * 2;

            this.getView().byId("area").setValue(lv_area);
            this.getView().byId("perimeter").setValue(lv_perimeter);
            
        },

        clearRectangle : function ()
        {
            this.getView().byId("width").setValue("");
            this.getView().byId("height").setValue("");
            this.getView().byId("area").setValue("");
            this.getView().byId("perimeter").setValue("");
        },

        applyMessage : function()
        {
            let lv_messageInput = this.getView().byId("messageInput").getValue();
            this.getView().byId("messageText").setText(lv_messageInput);
        },

        alignLeft : function ()
        {
            this.getView().byId("messageText").setTextAlign(sap.ui.core.TextAlign.Left);
        },

        alignCenter : function ()
        {
            this.getView().byId("messageText").setTextAlign(sap.ui.core.TextAlign.Center);
        },

        alignRight : function ()
        {
            this.getView().byId("messageText").setTextAlign(sap.ui.core.TextAlign.Right);
        },

        calcDelivery : function ()
        {
            let lv_amount   = parseInt(this.getView().byId("amount").getValue()),
                lv_delivery = 3000;
            
            if ( lv_amount === "" || lv_amount < 0 ){
                alert("0이상의 숫자를 입력하세요.");
                return;
            }

            if (lv_amount >= 30000){
                lv_delivery = 0;
            }

            this.getView().byId("delivery").setValue(lv_delivery);
            this.getView().byId("totalPrice").setValue(lv_amount + lv_delivery);

        },

        checkRoom : function ()
        {
            const lt_room = [101, 102, 201, 301];

            let lv_input = this.getView().byId("roomNumber").getValue(),
                lv_inputRoom = parseInt(lv_input),
                lb_room = false;

            for (const lv_roomNumber of lt_room) {
                if ( lv_inputRoom == lv_roomNumber ){
                    this.getView().byId("roomResult").setValue("입실 가능");
                    lb_room = true;
                }                
            }

            if ( !lb_room ){
                this.getView().byId("roomResult").setValue("등록되지 않은 강의실");
            }
        },

        calcScore : function ()
        {
            let it_id    = ["korean", "english", "math"],
                lv_sum   = 0,
                lv_avg   = 0,
                lv_grade = null;

            for (const element of it_id) {
        
                let lv_input = this.getView().byId(element).getValue(),
                    lv_score = parseInt(lv_input);
                
                if (lv_input == "" || lv_score < 0){
                    alert(element + "숫자를 입력해주세요. ");
                    return;
                }

                lv_sum += lv_score;
                
            }

            lv_avg = lv_sum / it_id.length;

            if (lv_avg >= 90){
                lv_grade = "A";
            } else if (lv_avg >= 80){
                lv_grade = "B";
            } else if (lv_avg >= 70){
                lv_grade = "C";
            } else {
                lv_grade = "D";
            }

            this.getView().byId("sum").setText(lv_sum);
            this.getView().byId("avg").setText(lv_avg);
            this.getView().byId("grade").setText(lv_grade);


        },

        printMultiples : function ()
        {
            let lv_limit    = parseInt(this.getView().byId("limit").getValue()),
                lv_multiple = parseInt(this.getView().byId("multiple").getValue()),
                lv_count    = 0,
                lv_list    = "",
                lv_sum      = 0;
                
            for ( let i = 1 ; i < lv_limit ; i ++)
            {
                if(i % lv_multiple == 0){
                    if ( lv_count > 0 ) {
                    lv_list += ", ";
                    }
                    lv_list += i;
                    lv_count ++;
                    lv_sum += i;
                }
            }
        
            if ( !lv_count ){
                this.getView().byId("numbers1").setText("없음");
                this.getView().byId("count").setText("0");
                this.getView().byId("sum1").setText("0");
                return;
            }
            
            this.getView().byId("numbers1").setText(lv_list);
            this.getView().byId("count").setText(String(lv_count));
            this.getView().byId("sum1").setText(String(lv_sum));

            },


        
        showMembers : function ()
        {
            let lt_member = this.getView().getModel("Member").oData.gt_member,
                lv_names = "",
                lv_active = 0;
            
            console.log(lt_member); // [ {}, {}, {}, {} ]

            for (const ls_member of lt_member) {
                console.log(ls_member);
                if (lv_names != "" ){
                    lv_names += ", ";
                }
                lv_names += ls_member.Name;

                if ( ls_member.Use == true ){
                    lv_active ++;
                }
            }

            this.getView().byId("names").setText(lv_names);
            this.getView().byId("countMember").setText(String(lt_member.length));
            this.getView().byId("acticeMember").setText(String(lv_active));
        },

        findMember : function ()
        {
            let lt_member = this.getView().getModel("Member").oData.gt_member, // [ {}, {}, {}, {} ]
                lv_inputMember = this.getView().byId("memberIdInput").getValue(),
                lb_foundMember = false;

            if (lv_inputMember == ""){
                alert("회원 ID를 입력하세여.");
                return;
            }

            for (const ls_member of lt_member) {
                if ( ls_member.Id == lv_inputMember) {
                    this.getView().byId("names1").setText(ls_member.Name);
                    this.getView().byId("age1").setText(String(ls_member.Age));
                    this.getView().byId("use1").setText(String(ls_member.Use));
                    lb_foundMember = true;
                    break;
                }
            }

            if ( !lb_foundMember )
            {
                this.getView().byId("names1").setText("-");
                this.getView().byId("age1").setText("-");
                this.getView().byId("use1").setText("-");
            }

        },

        // searchMembers : function ()
        // {
        //     let lt_member      = this.getView().getModel("Member").oData.gt_member,
        //         lv_genderInput = this.getView().byId("gender").getValue(),
        //         lv_minAgeInput = parseInt(this.getView().byId("minAge").getValue());
        //         lv_names       = "",
        //         lv_count       = 0;

        //     for (const ls_member of lt_member) {
        //         if ( (ls_member.Gender == lv_genderInput ) || lv_minAgeInput ) {

        //         }
                
        //     }
        // }
    });
});
