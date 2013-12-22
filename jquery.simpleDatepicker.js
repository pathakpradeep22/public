
(function( $ ) {
  $.fn.simpleDatepicker = function(options) {
	   var defaults = {
          startYear : 2001,
          endYear : 2030,
          variable3 : true,
          variable4 : true
		}
		 
		var settings = $.extend({}, defaults, options);
		console.log("startYear==="+settings.startYear); 
		settings.endYear = settings.endYear > settings.startYear ? settings.endYear : settings.startYear+1;
  		var getCalendar = function(currDay, currMonth, currYear){
			//alert(currDay+" "+currMonth+" "+currYear);
				//Get the weekday for Day 1 for current month 
			//console.log(currDay+" "+currMonth+" "+currYear);
			var getStartDay = new Date(currYear+"/"+parseInt(currMonth+1)+"/1");
			var dayStart =  getStartDay.getDay();
			//console.log("dayStart"+currDay);
			var daySelected = currDay;
			
			currDay = new Date().getDate();
			var innerRows = "";
			var dayCount = 1;
			var allYear="";
			var allMonths="";
			//console.log("Log"+$left+" "+$top);
			if($.inArray(currMonth,maxday31)>=0)
			{
					maxdays = 31;
			}
			else if($.inArray(currMonth,maxday30)>=0)
			{
					maxdays = 30;
			}
			else if($.inArray(currMonth,maxday29)>=0)
			{
					maxdays = 28;
					if(currYear%4==0)
					{
						maxdays = 29;
					}
			}

			// Display year dropdown
			allYear+="<select name='allYear' id='allYear' class='allYear'>";
			
			for(var i =settings.startYear;i<=settings.endYear;i++){
				if(i==currYear)
				{
					//alert(i+"=="+currYear);
					allYear+="<option value='"+i+"' selected='selected'>"+i+"</option>";
				}
				else
				{
					//console.log(i+"=="+currYear);
					allYear+="<option value='"+i+"'>"+i+"</option>";
				}
			}
			allYear+="</select>";

			// Display month dropdown
			allMonths+="<select name='allMonths' id='allMonths' class='allMonths'>";
			for(var j =0;j<monthArray.length;j++){
				if(j==currMonth)
					allMonths+="<option value='"+j+"' selected='selected'>"+monthArray[j]+"</option>";
				else
					allMonths+="<option value='"+j+"'>"+monthArray[j]+"</option>";
			}
			allMonths+="</select>";

			//console.log("maxdays"+maxdays);
			startday = 1;	
			var $navHeader = "<div style=\"width:200px;height:20px;border-bottom:solid 1px;#666666;float:left;margin-top:5px;float:left;padding-bottom:4px;\"><span style=\"margin-left:5px;\" alt=\"prev\" class=\"nav\" title=\"Previous Month\">Prev</span><div style=\"margin-left:0px;width:131px;overflow:hidden;float:left;position:relative;text-align:center;\">"+monthArray[currMonth]+" "+allYear+"</div><span style=\"\" class=\"nav\" alt=\"next\" title=\"Next Month\">Next</span></div>"; 
			var $weekdays = "<div style=\"width:200px;height:auto;float:right;\"><table width=\"\" style=\"padding:2px;\"><tr><td width=\"\">Sun</td><td width=\"\">Mon</td><td width=\"\">Tue</td><td width=\"\">Wed</td><td width=\"\">Thu</td><td width=\"\">Fri</td><td width=\"\">Sat</td></tr>";
			
			for(var rowcount = 1;rowcount<=maxweek;rowcount++)
			{
				innerRows+="<tr>";
				for(var daycount = 1;daycount<=7;daycount++)
				{
					if(startday<=maxdays+dayStart)
					{
						if(startday>=dayStart+1)
						{
							//console.log("selected"+dayCount+""+eval(date.getMonth())+""+date.getFullYear());
							//console.log("selected"+daySelected+""+currMonth+""+currYear);
							if(dayCount+""+eval(date.getMonth())+""+date.getFullYear()==daySelected+""+currMonth+""+currYear)
							{
								//console.log("daySelected"+daySelected);
								var selected = "selected";
							}
							else
							{
								var selected = "";
							}
							//Current date
							if(dayCount==currDay)
							{
								innerRows += "<td align=center class=\"today "+selected+" caldata\" datepick=\""+currYear+"-"+parseInt(currMonth+1)+"-"+dayCount+"\"><div>"+dayCount+"</div></td>";
							}
							else
							{
								innerRows += "<td class=\"caldata "+selected+"\" align=center datepick=\""+currYear+"-"+parseInt(currMonth+1)+"-"+dayCount+"\"><div>"+dayCount+"</div></td>";
							}
							
							dayCount++;
						}
						else
						{
							innerRows += "<td>&nbsp;</td>";
						}
					}
					else
					{
						innerRows += "<td>&nbsp;</td>";
					}
					startday++;
				}
				innerRows+="</tr>";
			}
			$weekdays += innerRows+"</table></div>";
			return $navHeader+$weekdays;
				
		}
    // Do your awesome plugin stuff here
	var date = new Date();
	
	var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var maxweek;
	var maxdays;
	var startday;
	var maxday31 = [0,2,4,6,7,9,11];
	var maxday30 = [3,5,8,10];
	var maxday29 = [1];
     return this.each(function() {
						
			$this = $(this)	;
			$curr = $(this);
			$this.attr('readonly',true);
			var $calendar = $("<div class=\"calendar\"></div>");
			var $offset = $this.offset();
			var $left = $offset.left;
			var $top = $offset.top+$this.height()+6;
			
			var date = new Date();
			var currDay ;
			var currMonth ;
			var currYear ;
			maxweek =6;
			maxdays = 31;
			startday = 1;
		
			$calendar.css({'left':$left,'top':$top});
			
			
			$this.on('click', function(e){
					
					$calendar.remove();
					date = new Date();
					var $current = $(this);
					
					
					startday = 1;				
			 		e.preventDefault();
					e.stopPropagation();
					//alert($current.val());
					if($current.val()!="")
					{
						
						var parseDate = $current.val().split("-");
						//alert("parseDate"+parseDate);
						if(parseDate.length>=3)//Date was in proper format
						{
							currMonth = parseDate[1]-1;
							currDay = parseDate[2];
							//currDay = date.getDate();
							currYear = parseDate[0];
						}
						//console.log(currMonth+"=="+currYear);
						
					}
					else
					{
						currDay = date.getDate();
						currMonth = date.getMonth();
						currYear = date.getFullYear();
					}
					//alert("Date"+currDay+" "+currMonth+" "+currYear);
					//console.log(currDay+" "+currMonth+" "+currYear);
					$calendar.html(getCalendar(currDay, currMonth, currYear)).appendTo("body").hide().css({'opacity':1}).fadeIn("fast");
					$current.focus();

					$current.on('keyup', function(e){
								 if(e.keyCode==27)
								 {
									 $calendar.remove();	
								 }
								});
					//Pre Next navigation handle

					$calendar.on('click',function(e){e.preventDefault();

					e.stopPropagation();});
					
					
					$calendar.on('click', 'td.caldata', function(){
					$current.val($(this).attr('datepick'));
					$calendar.remove();
					e.preventDefault();
					e.stopPropagation();
															  
					});

					// For month dropdown
					$calendar.on('change', 'select.allMonths', function(e){
						currMonth = this.value;
						$calendar.html(getCalendar(currDay, currMonth, currYear)).appendTo("body");
						
					});

					// For year dropdown
					$calendar.on('change', 'select.allYear', function(e){
						currYear = this.value;
						$calendar.html(getCalendar(currDay, currMonth, currYear)).appendTo("body");
						
					});
					
					$calendar.on('click', 'span.nav', function(e){
							e.preventDefault();
							e.stopPropagation();
							//Left navigation
							if($(this).attr('alt')=='prev')
							{
								currMonth--;
								if(currMonth<0)
								{
									currMonth = 11;
									currYear--;
									
								}
								$calendar.html(getCalendar(currDay, currMonth, currYear)).appendTo("body");
								$current.focus();
								$this.live('keyup', function(e){
								 if(e.keyCode==27)
								 {
									 $calendar.remove();	
								 }
								});
								//console.log(currMonth+" "+currYear);
							}
							//Right navigation
							if($(this).attr('alt')=='next')
							{
								currMonth++;
								if(currMonth>=12)
								{
									currMonth = 0;
									currYear++;
								}
								$calendar.html(getCalendar(currDay, currMonth, currYear)).appendTo("body");
								$current.focus();
								$this.live('keyup', function(e){
								 if(e.keyCode==27)
								 {
									 $calendar.remove();	
								 }
								});
								//console.log(currMonth+" "+currYear);
							}
					});
				});	
			
			//Close calendar on body click
			$(document).click(function(){
					$calendar.remove();		   
				});
			});//each closed
		

  };
})( jQuery );
