var titles = ["About Me", "Previous Work", "Contact", "Credits"];
var contents = ["About me stuff here", "previous work goes here with images or smth", "","This website is an example of my work. It was made using HTML, CSS and JS also without frameworks becuase I hate those."];
var arrow = document.getElementById("arrow");
var box1 = document.getElementById("num1-box");
var box2 = document.getElementById("num2-box");
var box3 = document.getElementById("num3-box");
var box4 = document.getElementById("num4-box");
var discord = document.getElementById("discord");
var mail = document.getElementById("mail");
var box = null;
var x = 0;
var highlightButton = 0;
var debounce = false

function nextSlide(num){
	if (debounce === false){
		debounce = true;
		var button1 = document.getElementById("num1-box");
		var button2 = document.getElementById("num2-box");
		var button3 = document.getElementById("num3-box");
		var button4 = document.getElementById("num4-box");
		var buttons = [button1, button2, button3, button4];

		if (num != -1){
			x = num;
	
			buttons[x].style.background = "rgba(217, 217, 217, 0.2)";	
			buttons[highlightButton].style.background = "rgba(0,0,0,0)";

			highlightButton = num;
		}
		else
		{
			x += 1;

			if (x == 4){
				buttons[x-1].style.background = "rgba(0,0,0,0)";
				x = 0;
				buttons[x].style.background = "rgba(217, 217, 217, 0.2)";	
				highlightButton = x;
			}
		};

		var pageNum = document.getElementById("red-page-number");
		var pageTitle = document.getElementById("page-title");
		var pageContent = document.getElementById("page-content");
		
		arrow.style.opacity = "0";
		setTimeout(function(){
			pageNum.style.opacity = "0";
			pageTitle.style.opacity = "0";
		},300);
			
		setTimeout(function(){
			pageNum.remove();
			pageTitle.remove();
			pageContent.remove();
		},500);

		box = box || document.getElementById("box");
		
		setTimeout(function(){
			pageNum.innerText = "";
			pageTitle.innerText = "";
			pageContent.innerText = "";
		},300);

		setTimeout(function(){
			box.style.marginRight = "-200%";
			box.style.marginLeft = "200%";
		},500);

		var newBox = box.cloneNode(true);
		newBox.style.background = "crimson";
		newBox.style.margin = "37px -48px -37px 48px";
		newBox.style.transition = "all .3s";
		
		newBox.style.zIndex = "1";
		box.style.zIndex = "90";
		document.body.appendChild(newBox);

		setTimeout(function(){
			var pageNum = document.getElementById("red-page-number");
			var pageTitle = document.getElementById("page-title");
			var pageContent = document.getElementById("page-content");
			
			pageNum.innerText = "0"+(x+1).toString();
			pageTitle.innerText = titles[x];
			pageContent.innerText = contents[x];
		}, 500);

		setTimeout(function(){		
			newBox.style.background = "#2e2e2e";
			newBox.style.zIndex = "11";
			newBox.style.transition = "all 1s";
			box.remove();
			box = newBox;
		},1000);

		setTimeout(function(){
			newBox.style.margin = "0";
		}, 100);

		setTimeout(function(){
			arrow.style.opacity = "1";
			arrow.style.zIndex = "99";
			debounce = false;
		}, 1000);
	}
}

if (window.innerWidth <= 1400){
	resizeWindow("mobile");
};

window.onresize = function(){
	if (window.innerWidth > 1400){
		resizeWindow("desktop");
	}
	else
	{
		resizeWindow("mobile");
	}
};

function sendNotif(platform){
	if (platform == "discord"){
		var notifBlock = document.createElement("div");
		notifBlock.id = "notifBlock";


		document.body.appendChild(notifBlock);
	}
	else
	{
		var notifBlock = document.createElement("div");
		notifBlock.id = "notifBlock";


		document.body.appendChild(notifBlock);
	}
};

discord.onclick = function(){
	sendNotif("discord");
}

mail.onclick = function(){
	sendNotif("mail");
}

box1.onclick = function(){
	nextSlide(0);
};

box2.onclick = function(){
	nextSlide(1);
};

box3.onclick = function(){
	nextSlide(2);
};

box4.onclick = function(){
	nextSlide(3);
};

arrow.onclick = function(){
	nextSlide(-1);
};
