module.exports=function(){

    this.formvalidation=require('../lib/formvalidation');

	this.checkval=function(checkfunction, name, value, arg=null){
		if(arg==null){
			this.formvalidation[checkfunction](name, value)
		}else{
			this.formvalidation[checkfunction](name, value, arg)
		}
	}

	this.geterror=function(){
		return this.formvalidation.errors;
	}

}