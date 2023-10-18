let player, time_update_interval;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video-container', {
        width: 600,
        height: 400,
        videoId: 'v63Z_NCdYqQ',
        playerVars: {
            playlist: 'z1Ev1Z0cCG4,FG0fTKAqZ5g',
            // autoplay: 1,
            // controls: 0
        },
        events: {
            onReady: initialize
        }
    });
}

function initialize(){
    // Update the controls on load
    updateTimerDisplay();
    updateProgressBar();

    // Clear any old interval.
    clearInterval(time_update_interval);

    // Start interval to update elapsed time display and
    // the elapsed part of the progress bar every second.
    time_update_interval = setInterval(function () {
        updateTimerDisplay();
        updateProgressBar();
    }, 1000)

}
// This function is called by initialize()
function updateTimerDisplay() {
    // Update current time text display.
    $('#current-time').text(formatTime(player.getCurrentTime()));
    $('#duration').text(formatTime(player.getDuration()));
}

function formatTime(time) {
    return moment(0).add(moment.duration({'seconds': time})).format('mm:ss');
}

// This function is called by initialize()
function updateProgressBar() {
    // Update the value of our progress bar accordingly.
    $('#progress-bar').val((player.getCurrentTime() / player.getDuration()) * 100);
}

$('#play').on('click', function () {
    player.playVideo();
});

$('#pause').on('click', function () {
    player.pauseVideo();
});
$('#mute-toggle').on('click', function () {
    var mute_toggle = $(this);

    if (player.isMuted()) {
        player.unMute();
        mute_toggle.text('volume_up');
    }
    else {
        player.mute();
        mute_toggle.text('volume_off');
    }
});

$('#volume-input').on('change', function () {
    player.setVolume($(this).val());
});