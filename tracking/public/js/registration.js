$(document).ready(function(){
    formsubmit=[];
    returnvalue=false;
    var onlyalfaregEx=new RegExp("^[A-Za-z ]{0,}$");
    var onlyalphanum=new RegExp("^[A-Za-z0-9 ]{0,}$");
    var mobileregEx=new RegExp("^[0-9 ]{10,}$");
    var emailregEx= /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    formsubmit["name"]="It is required";
    formsubmit["postname"]="It is required";
    formsubmit["email"]="It is required";
    formsubmit["labAdress"]="It is required";
    formsubmit["mobile_no"]="It is required";
    formsubmit["password"]="It is required";
    formsubmit["confirm_password"]="It is required";

    $("#name").on("blur", function(){
        //console.log($(this).val().length<=3 && $(this).val().length>=50);
        if(checkempty(this)){
        	formsubmit[$(this).prop("id")]= "It is required";
        	adderror($(this).prop("id"));
        }else if(checkexpression(onlyalfaregEx, this)){
            formsubmit[$(this).prop("id")]="Accept Only Alphabet";
            adderror($(this).prop("id"));
        }else if(checkMinlength(this, 3) || checkMaxlength(this, 50)){
            formsubmit[$(this).prop("id")]="Length of name between 3 to 50";
            adderror($(this).prop("id"));
        }else{
            removeerror($(this).prop("id"));
        }
    });
    $("#postname").on("blur", function(){
        if($(this).val()==""){
            formsubmit[$(this).prop("id")]= "It is required";
            adderror($(this).prop("id"));
        }else if(!onlyalphanum.test($(this).val())){
            formsubmit[$(this).prop("id")]="Do Not insert any spaical charecters";
            adderror($(this).prop("id"));
        }else if($(this).val().length<=2 || checkMaxlength(this, 100)){
            formsubmit[$(this).prop("id")]="Length of name between 3 to 50";
            adderror($(this).prop("id"));
        }else{
            removeerror($(this).prop("id"));
        }
    });
    $("#email").on("blur", function(){
        //console.log(emailregEx.test($(this).val()));
        if($(this).val()==""){
            formsubmit[$(this).prop("id")]= "It is required";
            adderror($(this).prop("id"));
        }else if(!emailregEx.test($(this).val())){
            formsubmit[$(this).prop("id")]="please fill the requested formate";
            adderror($(this).prop("id"));
        }else{
            removeerror($(this).prop("id"));
        }
    });

    $("#mobile_no").on("blur", function(){
        //console.log(emailregEx.test($(this).val()));
        if($(this).val()==""){
            formsubmit[$(this).prop("id")]= "It is required";
            adderror($(this).prop("id"));
        }else if(!mobileregEx.test($(this).val())){
            formsubmit[$(this).prop("id")]="please fill the requested formate";
            adderror($(this).prop("id"));
        }else if($(this).val().length<=9 || $(this).val().length>=11){
            formsubmit[$(this).prop("id")]="Mobile No is Not Valid";
            adderror($(this).prop("id"));
        }else{
            removeerror($(this).prop("id"));
        }
    });

    $("#labAdress").on("blur", function(){
        //console.log(emailregEx.test($(this).val()));
        if($(this).val()==""){
            formsubmit[$(this).prop("id")]= "It is required";
            adderror($(this).prop("id"));
        }else if(!onlyalfaregEx.test($(this).val())){
            formsubmit[$(this).prop("id")]="Accept Only Alphabet";
            adderror($(this).prop("id"));
        }else if($(this).val().length<=3 || $(this).val().length>=450){
            formsubmit[$(this).prop("id")]="Length of name between 3 to 50";
            adderror($(this).prop("id"));
        }else{
            removeerror($(this).prop("id"));
        }
    });
    $("#password").on("blur", function(){
        if($(this).val()==""){
            formsubmit[$(this).prop("id")]= "It is required";
            adderror($(this).prop("id"));
        }else if($(this).val().length<8 || $(this).val().length>16){
            formsubmit[$(this).prop("id")]="Length of password between 8 to 16";
            adderror($(this).prop("id"));
        }else{
            removeerror($(this).prop("id"));
            if($("#confirm_password").val()!==""){
                if($(this).val()===$("#confirm_password").val()){
                    removeerror($("#confirm_password").prop("id"));
                }else{
                    formsubmit[$(this).prop("id")]="Must match from password";
                    adderror($("#confirm_password").prop("id"));
                }
            }
        }
    });
    $("#confirm_password").on("blur", function(){
        if($(this).val()==""){
            formsubmit[$(this).prop("id")]= "It is required";
            adderror($(this).prop("id"));
        }else if($(this).val().length<8 || $(this).val().length>16){
            formsubmit[$(this).prop("id")]="Length of password between 8 to 16";
            adderror($(this).prop("id"));
        }else if($(this).val()!=$("#password").val()){
            formsubmit[$(this).prop("id")]="Must match from password";
            adderror($(this).prop("id"));
        }else{
            removeerror($(this).prop("id"));
        }
    });
});


function validateForm(){
	var length=0;
    for(var key in formsubmit){
        length=length+1;
    }
    if(length>0){
        alert("please fill all detail");
        return false;
    }else{
        return true;
    }
}

function checkempty(elemnt){
	if($(elemnt).val()==""){
        return true;
    }else{
        return false;
    }
}

function checkexpression(RegExp, elemnt){
	if(!RegExp.test($(elemnt).val())){
		return true;
	}else{
		return false;
	}
}

function checkMaxlength(elemnt, l){
	if($(elemnt).val().length>=l){
		return true;
	}else{
		return false;
	}
}

function checkMinlength(elemnt, l){
	if($(elemnt).val().length<3){
		return true;
	}else{
		return false;
	}
}


function adderror(id){
    if(document.getElementById("error-"+id+"")!=null){
        document.getElementById("error-"+id+"").remove();
    }
    $('<span class="error" id="error-'+id+'">*'+formsubmit[id]+'</span>').insertAfter($("#"+id+""));
    $("#"+id+"").css("border-color","red");
    returnvalue=false;
}
function removeerror(id){
    if(document.getElementById("error-"+id+"")!=null){
        document.getElementById("error-"+id+"").remove();
    }
    delete formsubmit[id];
    $("#"+id+"").css("border-color","green");
    returnvalue=true;
}
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}