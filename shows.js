function show(showtitle, season, episodes){
	this.showtitle = showtitle;
	this.season = createArray(season);
	this.episodes = episodes;
	this.episodesBySeason = [];
	this.createEpBySeason = function (eps) {
		//creates an array that has episode arrays
		//contained within arranged in season order
		var i = 0;
		while (i < eps.length){
			var feed =  eps[i];
			this.episodesBySeason[i] = createArray(feed);
			i++;
		}
	}
}

//variables for handling video player
var player = document.getElementById('videoPlayer');
var mp4Vid = document.getElementById('mp4Source');

//initiates new show objects
//show has three inputs: 
//1)Name of the show which is the folder all seasons and episodes are stored in
//2)Number of seasons for the show which are folders within show name
//3)Array of number of episodes per season arranged in order
var Show1 = new show('Show1', 3, [1,2,3]);
var Show2 = new show('Show2', 2, [4,2]);
var Show3 = new show('Show3', 4,[2,4,3,2]);

//creates an array of season options for the season selection box that can be selected by show
var selectSeasons = new Array();
	selectSeasons[0] = Show1.season;
	selectSeasons[1] = Show2.season;
	selectSeasons[2] = Show3.season;

function createArray(num){
	//creates an array that simply adds numbers ascending
	//to the inputed number
	var myArray = [];
	var i = 1;
	while (i <= num){
		myArray.push(i);
		i++;
	}
	return myArray;
}

function pickShow(show1, show2, show3){
	//generates an array that represents which show, season, and episode to pick randomly
	var theShow = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
	var show = [];
	if (theShow == 1){
		Show1.createEpBySeason(Show1.episodes);
		show[0] = show1;	
		show[1] = Math.floor(Math.random() * (Show1.season.length - 1 + 1)) + 1;
		show[2] = Math.floor(Math.random() * (Show1.episodesBySeason[(show[1] - 1)].length - 1 + 1)) + 1;
	}else if (theShow == 2){
		Show2.createEpBySeason(Show2.episodes);
		show[0] = show2;
		show[1] = Math.floor(Math.random() * (Show2.season.length - 1 + 1)) + 1;
		show[2] = Math.floor(Math.random() * (Show2.episodesBySeason[(show[1]-1)].length - 1 + 1)) + 1;

	}else{
		Show3.createEpBySeason(Show3.episodes);
		show[0] = show3;
		show[1] = Math.floor(Math.random() * (Show3.season.length - 1 + 1)) + 1;
		show[2] = Math.floor(Math.random() * (Show3.episodesBySeason[(show[1] - 1)].length - 1 + 1)) + 1;
	}
	return show;
}

function runShow() {
	//puts together a filepath for randomly generated show
	//video must be stored as mp4
	var file = pickShow(Show1.showtitle, Show2.showtitle, Show3.showtitle);
	var fileOpen = file[0] + "/" + file[1] + "/" + file[2] + ".mp4";
	//alert("The file chosen will be " + fileOpen); test code
	runVideo(fileOpen);
}

function updateSeason(selectedshow){
	//updates and shows the season selection option box
	document.pick.season.length = 0;
	document.getElementById('season').style.display = 'block';
	for(i=0; i < selectSeasons[selectedshow].length; i++){
		document.pick.season.options[document.pick.season.options.length] = new Option(selectSeasons[selectedshow][i]);
	}
}

function updateEpisode(selectedseason){
	//updates and shows the episode selection option box and displays the showStart button
	 document.pick.episode.length = 0;
	 document.getElementById('episode').style.display = 'block';
	 document.getElementById('showStart').style.display = 'block';
	if (document.pick.show.selectedIndex == 0){
		Show1.createEpBySeason(Show1.episodes);
		for(i=0; i < Show1.episodesBySeason[selectedseason].length; i++){
			document.pick.episode.options[document.pick.episode.options.length] = new Option(Show1.episodesBySeason[selectedseason][i]);
		}
	}else if (document.pick.show.selectedIndex == 1){
			Show2.createEpBySeason(Show2.episodes);
			for(i=0; i < Show2.episodesBySeason[selectedseason].length; i++){
				document.pick.episode.options[document.pick.episode.options.length] = new Option(Show2.episodesBySeason[selectedseason][i]);
		}		
	}else {
		Show3.createEpBySeason(Show3.episodes);
			for(i=0; i < Show3.episodesBySeason[selectedseason].length; i++){
				document.pick.episode.options[document.pick.episode.options.length] = new Option(Show3.episodesBySeason[selectedseason][i]);
			}
		}	
}

function runSelection(show,season,episode){
	//puts together the file to open for episodes chosen via selection
	var file = [show,season + 1,episode + 1];
	if (show == 0){
		file[0] = Show1.showtitle;
	}else if (show == 1) {
		file[0] = Show2.showtitle;
	}else{
		file[0] = Show3.showtitle;
	}
	var fileOpen = file[0] + "/" + file[1] + "/" + file[2] + ".mp4";
	//alert("The file chosen will be " + fileOpen); test code
	runVideo(fileOpen);
}

function runVideo(source){
	//starts videos in the video player
	player.pause();
	mp4Vid.setAttribute('src', source);
	player.load();
	player.play();
}

function autoPlay(){
	//determines if autoplay is on or off
	if (document.getElementById('autoplay').checked == true){
		//alert('The box is checked'); test code
		player.addEventListener('ended', canPlay, false);
		
	}else {
		//alert('The box is unchecked'); test code
		player.removeEventListener('ended', canPlay, false);
	}
}

function canPlay(e){
	//function to handle autoplay feature
	if(!e){e = window.event;}
	//alert('vid end'); test code
	runShow();
}