$(document).ready(function () {
    //$('#dataTables-example').dataTable();
	class userlist{
		async getuserlist(){
			let self=this;
			let url="http://localhost:8080/owner/getuserlist";
		    let response = await fetch(url,{
		    	method:'POST'
		    });
			if (response.ok) { 
			  let json = await response.json();
			  if(json.result.length>0){
			  	let data=json.result;
			  	for(var i=0;i<data.length;i++){
			  		let button =document.createElement("BUTTON");
			  		var t;
			  		button.id="userbtns_"+data[i].ID;
			  		button.classList.add("btn");
			  		if(data[i].approved==="true"){
			  			button.classList.add("btn-danger");
			  			button.classList.add("cancelApproved");
			  			t = document.createTextNode("Cancel Approved");
			  			button.appendChild(t);
			  			button.onclick=function(){
			  				self.cancelApproved(this);
			  			}
			  		}else{
			  			button.classList.add("btn-primary");
			  			button.classList.add("approvedUser");
			  			t = document.createTextNode("Approved");
			  			button.appendChild(t);
			  			button.onclick=function(){
			  				self.approvedUser(this);
			  			}
			  		}
			  		let tr=document.createElement("tr");
			  		let th1=document.createElement("th");
			  		th1.innerHTML=data[i].ID;
			  		tr.append(th1);
			  		let th2=document.createElement("th");
			  		th2.inneerHTML=data[i].name;
			  		tr.append(th2);
			  		let th3=document.createElement("th");
			  		th3.innerHTML=data[i].username;
			  		tr.append(th3);
			  		let th4=document.createElement("th");
			  		th4.innerHTML=data[i].mobile_no;
			  		tr.append(th4);
			  		let th5=document.createElement("th");
			  		th5.innerHTML=data[i].post;
			  		tr.append(th5);
			  		let th6=document.createElement("th");
			  		th6.innerHTML=data[i].lab_name;
			  		tr.append(th6);
			  		let th7=document.createElement("th");
			  		th7.innerHTML=data[i].created_date;
			  		tr.append(th7);
			  		let th8=document.createElement("th");
			  		th8.innerHTML=data[i].role;
			  		tr.append(th8);
			  		let th9=document.createElement("th");
			  		th9.append(button);
			  		tr.append(th9);
			  		$("#userlist").append(tr);

			  	}
			  }
			} else {
			  alert("HTTP-Error: " + response.status);
			}
		}

		async approvedUser(btn){
			btn.classList.add('fa');
			btn.classList.add('fa-spinner');
			let self=this;
			let url="http://localhost:8080/owner/approveduser";
			let response = await fetch(url,{
		    	method:'POST',
		    	headers: {
			        'Content-Type': 'application/json'
			    },
		    	body: JSON.stringify({"userid":btn.id.split("_")[1]})
		    });
			if (response.ok) {
				let json = await response.json();
				if(json.result==="done"){
					btn.innerHTML="";
					btn.classList.remove("btn-primary");
					btn.classList.remove("fa");
					btn.classList.remove("fa-spinner");
					btn.classList.add("btn-danger");
					let t = document.createTextNode("Cancel Approved");
					btn.appendChild(t);
					btn.onclick=function(){
			  			self.cancelApproved(this);
			  		}
				} else{
					alert("There are Some error");
				}
			}else {
			  alert("HTTP-Error: " + response.status);
			}
		}

		async cancelApproved(btn){
			btn.classList.add('fa');
			btn.classList.add('fa-spinner');
			var self=this;
			let url="http://localhost:8080/owner/cancelapproved";
			let response = await fetch(url,{
		    	method:'POST',
		    	headers: {
			        'Content-Type': 'application/json'
			    },
		    	body: JSON.stringify({"userid":btn.id.split("_")[1]})
		    });
			if (response.ok) {
				let json = await response.json(); 
				if(json.result==="done"){
					btn.innerHTML="";
					btn.classList.remove("btn-danger");
					btn.classList.remove("fa");
					btn.classList.remove("fa-spinner");
					btn.classList.add("btn-primary");
					let t = document.createTextNode("Approved");
					btn.appendChild(t);
					btn.onclick=function(){
			  			self.approvedUser(this);
			  		}
				} else{
					alert("There are Some error");
				}
			}else {
			  alert("HTTP-Error: " + response.status);
			}
		}
	}
	let myuserlist = new userlist();
	myuserlist.getuserlist();

});
