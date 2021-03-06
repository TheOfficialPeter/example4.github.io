var titles = ["About Me", "Previous Work", "Contact", "Credits"];
var contents = ["About me stuff here", "previous work goes here with images or smth", "","This website is an example of my work. It was made using HTML, CSS and JS."];
var arrow = document.getElementById("arrow");
var box1 = document.getElementById("num1-box");
var box2 = document.getElementById("num2-box");
var box3 = document.getElementById("num3-box");
var box4 = document.getElementById("num4-box");
var discord = document.getElementById("discord");
var mail = document.getElementById("mail");
var box = document.getElementById("box");
var dragStart = 0;
var x = 0;
var dragThreshX = 300;
var dragThreshY = 200;
var highlightButton = 0;
var debounce = false
var device = "";

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
			else
			{
				buttons[x-1].style.background = "rgba(0,0,0,0)";
				buttons[x].style.background = "rgba(217, 217, 217, 0.2)";	
				highlightButton = x;
			};
		};

		var pageNum = document.getElementById("red-page-number");
		var pageTitle = document.getElementById("page-title");
		var pageContent = document.getElementById("page-content");
		
		arrow.style.opacity = "0";
		setTimeout(function(){
			pageNum.style.opacity = "0";
			pageTitle.style.opacity = "0";
			pageContent.style.opacity = "0";
		},300);
			
		setTimeout(function(){
			pageNum.remove();
			pageTitle.remove();
			pageContent.remove();
		},500);

		box = box || document.getElementById("box");

		setTimeout(function(){
			box.style.marginRight = "-200%";
			box.style.marginLeft = "200%";
		},600);

		var newBox = box.cloneNode(true);
		newBox.style.background = "crimson";

		if (device == "mobile"){
			newBox.style.margin = "87px -10px -37px 10px";
		}
		else{
			newBox.style.margin = "37px -48px -37px 48px";
		};

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

			if (x == 2){
				pageContent.innerText = "";

				// add contact info
				var email = document.createElement("div");
				var message = document.createElement("div");
				var submit = document.createElement("div");
				var submitText = document.createElement("div");
				var emailText = document.createElement("div");
				var messageText = document.createElement("div");

				email.id = "emailbox";
				message.id = "messagebox";
				submit.id = "submitbox";

				email.style = `position: absolute;
								width: 327px;
								box-shadow: 4px 4px 2px 2px #1e1e1e;
								height: 63px;
								left: 0;
								top: 20px;
								z-index: 999;
								background: #545454;`;
				message.style = `position: absolute;
								width: 327px;
								height: 155px;
								left: 0;
								box-shadow: 4px 4px 2px 2px #1e1e1e;
								top: 100px;
								z-index: 999;
								background: #545454;`;
				submit.style = `position: absolute;
								width: 184px;
								height: 70px;
								left: 65px;
								top: 300px;
								z-index: 999;
								box-shadow: 4px 4px 2px 2px #1e1e1e;
								cursor: pointer;
								transition: all .2s;
								background: #545454;`;
				submitText.style = `position: absolute;
									left: 0;
									right: 0;
									font-family: Mont;
									font-weight: 700;
									text-align: center;
									top: calc(50% - 30px/2);
									font-size: 25px;`;
				emailText.style = `position: absolute;
									right: 0;
									top: 10px;
									font-family: Open;
									transition: all .2s;
									font-size: 20px;
									left: 10px;`;
				messageText.style = `position: absolute;
									right: 0;
									top: 10px;
									transition: all .2s;
									font-family: Open;
									font-size: 20px;
									left: 10px;`;

				submitText.innerText = "Submit";
				emailText.innerText = "Email";
				messageText.innerText = "Message";

				pageContent.appendChild(email);
				pageContent.appendChild(message);
				pageContent.appendChild(submit);
				submit.appendChild(submitText);
				email.appendChild(emailText);
				message.appendChild(messageText);
			}
			else
			{
				pageContent.innerText = contents[x];

				try{
					document.getElementById("emailbox").remove();
					document.getElementById("messagebox").remove();
					document.getElementById("submitbox").remove();
				}
				catch
				{
					return;
				};
			};

		}, 500);

		setTimeout(function(){
			newBox.style.background = "#2e2e2e";
			newBox.style.zIndex = "11";
			newBox.style.transition = "all 1s";
			box.remove();
			box = newBox;

			box.onmousedown = function(){
				dragStart = event.clientX
				document.onmousemove = function(event2){
					if ((event2.clientX - dragX) >= dragThreshX && device == ""){
						nextSlide(-1);
					}
					else if ((event2.clientY - dragY) >= dragThreshY && device == "mobile"){
						nextSlide(-1);
					};
				};
			};
		
			box.onmouseup = function(){
				document.onmousemove = null;
			};

		},1000);

		setTimeout(function(){	
			if (device == "mobile"){
				newBox.style.margin = "0 0 0 0";
			}
			else{
				newBox.style.margin = "0";
			};
		}, 100);

		setTimeout(function(){
			arrow.style.opacity = "1";
			arrow.style.zIndex = "99";
			debounce = false;
		}, 1000);
	}
}

function resizeWindow(platform){
	if (platform == "mobile"){
		device = "mobile";
		var navbar = document.getElementById("nav");
		var newNavbar = navbar.cloneNode();
		var navTitle = document.getElementById("nav-title");
		var discord = document.getElementById("newDiscord") || document.getElementById("discord");
		var email = document.getElementById("newMail") || document.getElementById("mail");
		var box = document.getElementById("box");
		var boxShadow = document.getElementById("box-shadow");
		var pageContent = document.getElementById("page-content");
		var num1Box = document.getElementById("num1-box");
		var num2Box = document.getElementById("num2-box");
		var num3Box = document.getElementById("num3-box");
		var num4Box = document.getElementById("num4-box");
		var num1 = document.getElementById("num1");
		var num2 = document.getElementById("num2");
		var num3 = document.getElementById("num3");
		var num4 = document.getElementById("num4");

		num1Box.style.opacity = "0";
		num2Box.style.opacity = "0";
		num3Box.style.opacity = "0";
		num4Box.style.opacity = "0";
		num1.style.opacity = "0";
		num2.style.opacity = "0";
		num3.style.opacity = "0";
		num4.style.opacity = "0";

		try{
			var arrow = document.getElementById("arrow") || document.getElementById("newArrow");
		}
		finally{
			navTitle.style.fontSize = "25px";
			navTitle.style.marginTop = "12.5px";
			navTitle.style.textAlign = "center";
			navTitle.style.left = "calc(50% - 221px/2)";

			navbar.style.width = "250px";
			navbar.style.left = "calc(50% - 250px/2)";
		
			discord.id = "newDiscord";
			discord.style = `position: absolute;
								width: 28px;
								height: 28px;
								left: calc(50% - 28px/2 - 30px);
								bottom: 27px;
								transition: filter .3s;
								opacity: 1;
								z-index: 999;
								cursor: pointer;`;

			email.id = "newMail";
			email.style = `position: absolute;
								width: 28px;
								height: 28px;
								left: calc(50% - 28px/2 + 30px);
								bottom: 27px;
								transition: filter .3s;
								opacity: 1;
								z-index: 999;
								cursor: pointer;`;

			pageContent.style.left = "calc(50% - 20px);";

			arrow.id = "newArrow";
			arrow.style.width = "75px";
			arrow.style.height = "75px";
			arrow.style.position = "absolute";
			arrow.style.zIndex = "9999";
			arrow.style.bottom = "100px";
			arrow.style.top = "";
			arrow.style.transform = "rotate(90deg)";
			arrow.style.left = "calc(50% - 75px/2";

			// same style as navbar
			var newNavbar = document.getElementById("newNav") || navbar.cloneNode();
			if (newNavbar !== null){
				newNavbar.style = ``;

				box.style.transition = "all 0s";
				box.style.marginTop = "0";
				box.style.left = "10px";
				box.style.right = "20px";
				boxShadow.style.transition = "all 0s";
				boxShadow.style.marginTop = "0";
				boxShadow.style.left = "20px";
				boxShadow.style.right = "10px";
				
				newNavbar.id = "newNav";
				newNavbar.style = `box-sizing: border-box;
									position: absolute;
									width: 150px;
									height: 60px;
									left: calc(50% - 150px/2 + 0.5px);
									bottom: 10px;

									background: rgba(30, 30, 30, 0.2);
									border: 1px solid rgba(255, 255, 255, 0.2);
									border-radius: 50px;`;

				document.body.appendChild(newNavbar);
			};

			setTimeout(function(){
				box.style.transition = "all 1s";
			},1000);

			setTimeout(function(){
				boxShadow.style.transition = "all .5s";
				arrow.style.transition = "all .5s";
			},500);
		}
	}
	else
	{
		device = "";
		var navbar = document.getElementById("nav");
		var navTitle = document.getElementById("nav-title");
		var discord = document.getElementById("discord") || document.getElementById("newDiscord");
		var email = document.getElementById("newMail") || document.getElementById("mail");
		var box = document.getElementById("box");
		var boxShadow = document.getElementById("box-shadow");
		var arrow = document.getElementById("newArrow") || document.getElementById("arrow");
		var num1Box = document.getElementById("num1-box");
		var num2Box = document.getElementById("num2-box");
		var num3Box = document.getElementById("num3-box");
		var num4Box = document.getElementById("num4-box");
		var num1 = document.getElementById("num1");
		var num2 = document.getElementById("num2");
		var num3 = document.getElementById("num3");
		var num4 = document.getElementById("num4");

		num1Box.style.opacity = "1";
		num2Box.style.opacity = "1";
		num3Box.style.opacity = "1";
		num4Box.style.opacity = "1";
		num1.style.opacity = "1";
		num2.style.opacity = "1";
		num3.style.opacity = "1";
		num4.style.opacity = "1";

		try{
			var newNavbar = document.getElementById("newNav");
			newNavbar.remove();
		}
		catch{
			discord.style = `position: absolute;
								width: 28px;
								height: 28px;
								left: calc(50% - 28px/2 + 123px);
								top: 55px;
								transition: filter .3s;
								opacity: 1;
								cursor: pointer;`;
			email.style = `position: absolute;
							width: 28px;
							height: 28px;
							left: calc(50% - 28px/2 + 163px);
							top: 55px;
							transition: filter .3s;
							cursor: pointer;`;

			navTitle.style.fontSize = "45px";
			navTitle.style.marginTop = "";
			navTitle.style.marginLeft = "";
			navTitle.style.left = "calc(50% - 221px/2 - 61.5px)";

			navbar.style.width = "397px";
			navbar.style.left = "calc(50% - 397px/2)";
			
			box.style.marginTop = "";
			box.style.left = "234px";
			box.style.right = "171px";
			box.style.transition = "all 1s";
			boxShadow.style.marginTop = "";
			boxShadow.style.transition = "all .5";
			boxShadow.style.left = "282px";
			boxShadow.style.right = "123px";
	
			arrow.style = `position: absolute;
							width: 105px;
							height: 105px;
							right: 119px;
							top: calc(50% - 105px/2);
							z-index: 99;
							cursor: pointer;
							transition: all .5s;`;
		};
	};
};

if (window.innerWidth <= 800){
	resizeWindow("mobile");
};

window.onresize = function(){
	if (window.innerWidth > 800){
		resizeWindow("desktop");
	}
	else
	{
		resizeWindow("mobile");
	}
};

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

box.onmousedown = function(event){
	dragX = event.clientX;
	dragY = event.clientY;
	document.onmousemove = function(event2){
		if ((event2.clientX - dragX) >= dragThreshX && device == ""){
			nextSlide(-1);
		}
		else if ((event2.clientY - dragY) >= dragThreshY && device == "mobile"){
			nextSlide(-1);
		};
	};
};
		
box.onmouseup = function(){
	document.onmousemove = null;
};

window.onclick = function(event3){
	var circle = document.createElement("div");
	circle.id = "circle";
	circle.style = "border-radius: 50%; height: 0; width: 0; position: absolute; background: transparent; border: 4px solid #FF7878;";
	circle.style.left = (event3.clientX - 5).toString()+"px";
	circle.style.top = (event3.clientY - 5).toString()+"px";
	circle.style.zIndex = "9999";
	circle.style.transition = "all .3s";
	
	setTimeout(function(){
		circle.style.height = "30px";
		circle.style.width = "30px";
		circle.style.marginLeft = "-15px";
		circle.style.marginTop = "-15px";
	},50);

	setTimeout(function(){
		circle.style.opacity = "0";
	},100);

	setTimeout(function(){
		circle.remove()
	},300);

	document.body.appendChild(circle);
};
