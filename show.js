/*...............................................................................................
                                     Object Generation

  - Code generates a new show object.
      ex. Show1
            showTitle: 'Show1'
            season:
              1:
                episodes: [1,2,3]
  - Show1.showTitle to access Title of the Show
  - Show1.season[#] to access season number where # is the season number you want
  - Show1.season[#].episodes gives the array of episodes for a season
  - Show1.season[#].episodes[# - 1] gives episode number where episode you want is #
................................................................................................*/

function show(showTitle, seasons, episodes){
  //creates new show object
  this.showTitle = showTitle;
  this.season = createSeason(seasons, episodes);
}

function createSeason(seasons, episodes){
  //creates new season object for a show
  var newSeasons = {};
  for(i = 0; i < seasons; i++) {
    var season = String(i + 1);
    newSeasons[season] = { episodes: createArray(episodes[i])};
  }
  return newSeasons;
}

function createArray(num) {
  //creates an array
  var newArray = [];
  for(j = 1; j <= num; j++){
    newArray.push(j);
  }
  return newArray;
}


/*.................................................................................................
                                       Configuration

  - numShow should be equal to the number of show objects you create
  - to create new show object:
    - var ShowVariable = new show("showTitle", #ofSeasons, [#episodesSeason1, #episodesSeason2, etc....]);
  - shows is an array used to store show objects.  add all show objects created to the array
.................................................................................................*/

//number of show objects created
var numShow = 3;

//show objects created
var Show1 = new show('Show1', 3, [1,2,3]);
var Show2 = new show('Show2', 2, [4,2]);
var Show3 = new show('Show3', 4,[2,1,3,2]);

//array to hold show objects
var shows = [Show1, Show2, Show3];

//holds which show is selected in select box
var selectedShowObject

//variables for handling video player
var player = document.getElementById('videoPlayer');
var mp4Vid = document.getElementById('mp4Source');

/*.................................................................................................
                                    Basic Functionality

  - all the code necessary to run once the random episode button is clicked
.................................................................................................*/

function runShow(fileOpen) {
  //***puts together a filepath for randomly generated show
  //video must be stored as mp4
  var file = pickShow(numShow);
  var fileOpen = fileOpen || file[0] + "/" + file[1] + "/" + file[2] + ".mp4";
  //alert("The file chosen will be " + fileOpen); test code
  runVideo(fileOpen);
}

function pickShow(numShow){
  //generates an array that represents which show, season, and episode to pick randomly based on number of show objects created
  var show = []
  var showNum = randomNum(numShow);
  var theShow = shows[showNum - 1]

  //show object
  show[0] = theShow.showTitle;
  //show season
  show[1] = randomNum(Object.keys(theShow.season).length);
  theSeason = String(show[1]);
  //show episode in season
  show[2] = randomNum(theShow.season[theSeason].episodes.length);

  return show;
}

function randomNum(num){
  //generates random number from 1 to num
  return Math.floor((Math.random()* num) + 1);
}

function runVideo(source){
  //starts videos in the video player
  player.pause();
  mp4Vid.setAttribute('src', source);
  player.load();
  player.play();
}

/*...............................................................................................
                                   Selection Code
...............................................................................................*/
window.onload = function (){
  //sets intial options for select boxes to the first show in shows
  document.getElementById('show').style.display = 'block';
  for(i=0; i < numShow; i++){
    document.pick.show.options[document.pick.show.options.length] = new Option(shows[i].showTitle);
  }
}

function updateSeason(selectedshow){
  //updates and shows the season selection option box
  document.pick.season.length = 0;
  document.getElementById('season').style.display = 'block';
  selectedShowObject = shows[selectedshow];
  for(i=1; i <= Object.keys(shows[selectedshow].season).length; i++){
    document.pick.season.options[document.pick.season.options.length] = new Option(i);
  }
}

function updateEpisode(selectedseason){
  //***updates and shows the episode selection option box and displays the showStart button
  document.pick.episode.length = 0;
  document.getElementById('episode').style.display = 'block';
  document.getElementById('showStart').style.display = 'block';
  for(i=1; i <= selectedShowObject.season[String(selectedseason + 1)].episodes.length; i++){
    document.pick.episode.options[document.pick.episode.options.length] = new Option(i);
  }
}

function runSelection(show,season,episode){
  //puts together the file to open for episodes chosen via selection
  var fileOpen = shows[show].showTitle + "/" + (season+1) + "/" + (episode+1) + ".mp4";
  runShow(fileOpen);
}

/*............................................................................................
                             Autoplay Code
............................................................................................*/

function autoPlay(){
  //determines if autoplay is on or off
  if (document.getElementById('autoplay').checked == true){
    player.addEventListener('ended', canPlay, false);
  }else {
    player.removeEventListener('ended', canPlay, false);
  }
}

function canPlay(e){
  //function to handle autoplay feature
  if(!e){e = window.event;}
    runShow();
  }
