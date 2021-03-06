///define universal inputs 
var month = '';
var day = '';
var degree = '';


//sunset time change for utc to est
var loadEst = function(utc){
	//The following code changes Universal Standard Time to Eastern Standard Time
		var utcArray = utc.split(" ");
		var uTime = utcArray[0].split("");
		var h1 = Math.floor(uTime[0]);
		var h2 = Math.floor(uTime[1]);
		var m1 = Math.floor(uTime[2]);
		var m2 = Math.floor(uTime[3]);
		var m3 = Math.floor(uTime[4]);

		var tensMinute = "";
		var onesMinute = "";

		console.log(uTime.length);
	//if UTC hour of day is not a double digit do this
		if(uTime.length < 8){
		var utcSetHour = h1;
		var estSetHour = utcSetHour - 4;
		var tensMinute = m1;
		var onesMinute = m2;
		}
	//if utc hour is a double digit 
		else{
		var utcSetHour = (h1 * 10) + h2;
		var estSetHour = utcSetHour - 4;
		var tensMinute = m2;
		var onesMinute = m3;
		}

		console.log(estSetHour);
		$('#sunsetTime').html('<h3 id = "sunsetTime">'+"SUNSET IS AT "+ estSetHour +":"+ tensMinute + onesMinute+ " PM"+'</h3>');

};

//retrieve sunset info from the API for NYC long + lat
var getApi = function(){
	$.getJSON("http://api.sunrise-sunset.org/json?lat=40.7127837&lng=-74.0059413&date=2015"+ month+day, function(json) {
		console.log(json);

		var utc = json.results.sunset;

	if(utc.length !== 0){
		loadEst(utc);	
	}

	else{
		console.log("API data error");
	}

	});//api json end
};

//set variables for month and day with input values

var setViz = function(degree){
	var degree = month * 30;
	var rotate = function(){
		console.log("rotating " + degree + " degrees");
		$('#starChart').rotate(degree);
	};
	rotate();
	getApi();
};

var getMonthDay = function(){
	month = $( ".month" ).val();
	day = $( ".day" ).val();
	
	if(month === "01"){
		var pMonth = "JANUARY";
	}
	else if(month === "02"){
		var pMonth = "FEBRUARY";
	}
	else if(month === "03"){
		var pMonth = "MARCH";
	}
	else if(month === "04"){
		var pMonth = "APRIL";
	}
	else if(month === "05"){
		var pMonth = "MAY";
	}
	else if(month === "06"){
		var pMonth = "JUNE";
	}
	else if(month === "07"){
		var pMonth = "JULY";
	}
	else if(month === "08"){
		var pMonth = "AUGUST";
	}
	else if(month === "09"){
		var pMonth = "SEPTEMBER";
	}
	else if(month === "10"){
		var pMonth = "OCTOBER";
	}
	else if(month === "11"){
		var pMonth = "NOVEMBER";
	}
	else{
		var pMonth = "DECEMBER";
	};

	console.log( "Getting sunset and stars for " + pMonth + ", " + day +".");
	$('#date').html('<h2 id = "pMonthDay"> NIGHT SKY FOR 40.71&#176;N, -74&#176;W: ' + pMonth +" "+ day+'</h2>');

	console.log(degree);
	setViz(degree);
};

$( document ).ready(function() {
	$("#submit").click(function(e){
		console.log("xoxoxo!");
		getMonthDay();
		e.preventDefault();
	});
});
