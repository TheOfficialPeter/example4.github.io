var arrow = document.getElementById("arrow");
var box = null;
var x = 0;

function nextSlide(){
	var button1 = document.getElementById("num1-box");
	var button2 = document.getElementById("num2-box");
	var button3 = document.getElementById("num3-box");
	var button4 = document.getElementById("num4-box");
	var buttons = [button1, button2, button3, button4];
		
	var prevButton = buttons[x];
	x += 1;

	if (x === 4){
		prevButton.style.background = "rgba(217, 217, 217, 0.0)";
		x = 0;
		var prevButton = buttons[x];
		prevButton.style.background = "rgba(217, 217, 217, 0.2)";
	}

	var currentButton = buttons[x];
	prevButton.style.background = "rgba(217, 217, 217, 0.0)";
	currentButton.style.background = "rgba(217, 217, 217, 0.2)";

	var pageNum = document.getElementById("red-page-number");
	var pageTitle = document.getElementById("page-title");
	var pageContent = document.getElementById("page-content");
	var pageConsent = document.getElementById("page-consent");
	
	arrow.style.opacity = "0";
	setTimeout(function(){
		pageNum.style.opacity = "0";
		pageTitle.style.opacity = "0";
		pageContent.style.opacity = "0";
		pageConsent.style.opacity = "0";
	},300);
		
	setTimeout(function(){
		pageNum.innerText = "";
		pageTitle.innerText = "";
		pageContent.innerText = "";
		pageConsent.innerText = "";
	},500);

	box = box || document.getElementById("box");
	
	setTimeout(function(){
		box.style.marginRight = "-2000px";
		box.style.marginLeft = "2000px";
	},500);

	var newBox = box.cloneNode(true);
	newBox.style.background = "crimson";
	newBox.style.margin = "37px -48px -37px 48px";
	newBox.style.transition = "all .3s";
	
	newBox.style.zIndex = "1";
	box.style.zIndex = "90";
	document.body.appendChild(newBox);

	setTimeout(function(){
		newBox.style.background = "#2e2e2e";
		newBox.style.zIndex = "11";
		newBox.style.transition = "all 1s";
		box = newBox;
	},1000);
	
	setTimeout(function(){
		newBox.style.margin = "0";
	}, 100);

	setTimeout(function(){
		arrow.style.opacity = "1";
		arrow.style.zIndex = "99";
	}, 1000);

}

arrow.onclick = function(){
	nextSlide();
}
