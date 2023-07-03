// writing the script for the play vodeo on hovering on it.

const videoContainer = document.querySelector('.video-container');
const video = videoContainer.querySelector('.video');

let isVideoPlaying = false;

videoContainer.addEventListener('mouseenter', () => {
  if (!isVideoPlaying) {
    video.play();
    isVideoPlaying = true;
  }
});

videoContainer.addEventListener('mouseleave', () => {
  if (isVideoPlaying) {
    video.pause();
    isVideoPlaying = false;
  }
});


// ----------------------------

// writing script to fetched the youtube video from the youtube v3 APIs

// let API_KEY = "AIzaSyCbFNTwv7SzHmJ6zDCXutCmaY_rWdkw0ZQ";



// ----------------

//Youtube API credential :     AIzaSyCDhwrIu8HE-kb8rDbtIDbZ-BG2ici6Zrc


// Load the YouTube Data API client library
gapi.load('client', start);

// Initialize the API client and make the request
function start() {
  gapi.client.init({
    apiKey: 'AIzaSyCbFNTwv7SzHmJ6zDCXutCmaY_rWdkw0ZQ' // Replace with your API key
  }).then(function() {
    fetchRandomVideos();
  });
}

function fetchRandomVideos() {
  gapi.client.request({
    path: 'https://www.googleapis.com/youtube/v3/search',
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: 200, // Number of videos to retrieve
      regionCode: 'IN', // Replace with your desired region code
   
    }
  }).then(function(response) {
    var videos = response.result.items;
    var videosContainer = document.getElementById('video-main-inner-container');
    videosContainer.innerHTML = ''; // Clear previous results

    videos.forEach(function(video) {
      var videoId = video.id.videoId;
      var title = video.snippet.title;
      var channelName = video.snippet.channelTitle;
      var publishedAt = new Date(video.snippet.publishedAt);
      var thumbnailUrl = video.snippet.thumbnails.default.url;
      var viewCount = video.statistics ? video.statistics.viewCount : 'N/A';

      var videoElement = document.createElement('div');
      videoElement.classList.add('video-container-item');


        videoElement.innerHTML = `
            <div class="video-container">
                <a href="https://www.youtube.com/watch?v=${videoId}" ><img src="${thumbnailUrl}" alt="${title}" class="video">  </a>

            </div>
            <div class="video-details">
                <div class="yt-channel-logo">
                    <img src="./assets/Navigations/User-Avatar.png" class="channel-logo">
                </div>
                <div class="yt-video-details">
                    <div class="video-title">
                         <p> ${title} </p> 
                    </div>
                    <p class="yt-channel-name">${channelName}</p>
                    <p>  <span class="view-count">${viewCount} views</span> <span class="uploaded-time">• ${formatDate(publishedAt)}</span>  <p>
                </div>
            </div>
        `;

      videosContainer.appendChild(videoElement);
    });
  }, function(error) {
    console.error('Error:', error.result.error.message);
  });
}

function formatDate(date) {
  var options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
}
