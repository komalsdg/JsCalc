currentval = "0";
memoryval = "";
oldval = "";
calculation = "0";
secondval = "";

function load(){

var button = document.getElementsByClassName("btn");
for (var i=0; i < button.length; i++) {

	button[i].addEventListener("click",function(e){
   		
		if(this.classList.contains("clear")) // AC
	    {
	    	clearvalues();
	    	currentval = "0";
	    }

		if(!isNaN(currentval) || currentval == ".")
		{
			
			if(this.classList.contains("dot")) // .
		    {
		    	if((memoryval == "" || currentval != oldval) && currentval.toString().indexOf(".") < 0)
		    		currentval = currentval + ".";
		    	else
		    		currentval = "0.";
		    }

		    if(this.classList.contains("np")) // +/-
		    {
		    	if(currentval == "0")
		    		currentval = "0";
		    	else if((memoryval == "" || currentval != oldval) && currentval.toString().indexOf("-") < 0)
		    		currentval = this.value + currentval;
		    	else
		    		currentval = currentval.slice(1);
		    }

		    if(this.classList.contains("num")) // 0-9
		    {
		    	currentval = removeprezero(currentval);

				if(memoryval == "" || currentval != oldval)
					currentval += this.innerHTML;
		    	else
				{	currentval = this.innerHTML;
					secondval = currentval;
				}
		    }

		    if(this.classList.contains("symbol")) // %/*-+
		    {
		    	currentval = currentval == "" ? "0" : currentval;
		    	operatenum(this.innerHTML);
		    }

		    if(this.classList.contains("equal")) // =
		    {
		    	document.getElementById("itemmemory").innerHTML = "";
		    	currentval = calculatenum();
		    	currentval = isNaN(currentval) ? "Cannot divide by zero" : currentval;
		    }

			document.getElementById("itemans").innerHTML = currentval;
		}
	},false);
}

}

function removeprezero(value)
{
	if(value === '0')
	value = value.slice(1)
	return value;
}

function clearvalues()
{
	memoryval = "";
	oldval = "";
	calculation = "0";
	document.getElementById("itemmemory").innerHTML = "";
}

function operatenum(value)
{
	if(currentval != "")
	{
		if((oldval == currentval) && (calculation == value))
		{}
		else
		{
		if(calculation != "0" && calculation == value)
			document.getElementsByClassName("equal")[0].click();
		
		if(calculation == "sqrt")
			document.getElementsByClassName("equal")[0].click();
		
		calculation = value;
		oldval = currentval;
		memoryval = (currentval + value);
		document.getElementById("itemmemory").innerHTML = memoryval;
		}

	}
}

function calculatenum()
{
	var svalue = calculation;
	var result = "0";
	    	switch(svalue)
	    	{
	    		case "sqrt":
	    		result = Math.sqrt(parseFloat(currentval));
	    		break;
	    		case "/":
	    		result = parseFloat(oldval) / parseFloat(currentval);
	    		break;
	    		case "*":
	    		result = parseFloat(oldval) * parseFloat(currentval);
	    		break;
	    		case "-":
	    		result = parseFloat(oldval) - parseFloat(currentval);
	    		break;
	    		case "+":
	    		result = parseFloat(oldval) + parseFloat(currentval);
	    		break;
	    		default:
	    		break;
	    	}
	    	oldval = secondval;

	return result;
}



