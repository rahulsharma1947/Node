
let errors=[];
function checkempty(name, value){
	if(value==""){
		setError(name, "It is required Field");
    }
}

function checkexpression(name, value, RegExp){
	if(!RegExp.test(value)){
		setError(name, "it is not in Correct pattern");
	}
}

function checkMaxlength(name, value, l){
	if(value.length>=l){
		setError(name, "It shoud not greater then "+l);
	}
}

function checkMinlength(name, value, l){
	if(value.length<3){
		esetError(name, "it shoud not less then "+l);
	}
}


function passmatch(name, value1, value2){
	if(value1!=value2){
		esetError(name, "Conferm Password not mathch from password");
	}
}

function mobilelenght(name, value){
	if(value.length<=9 || value.length>=11){
		esetError(name, "Mobile No is Not Valid");
	}
}

function setError(name, error){
	if (typeof(errors[name]) == "undefined"){
		errors[name]=error;
	}
}
exports.checkempty=checkempty;
exports.checkexpression=checkexpression;
exports.checkMaxlength=checkMaxlength;
exports.checkMinlength=checkMinlength;
exports.mobilelenght=mobilelenght;
exports.passmatch=passmatch;
exports.errors=errors;
