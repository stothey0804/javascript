function getUserPreferences(callback) {
    return setTimeout(() => {
        callback({
            theme: 'dusk',
        });
    }, 1000);
}

function log(value) {
    return console.log(value);
}

log('start');

getUserPreferences(preferences => {
    return log(preferences.theme.toUpperCase());
})

log('end?');

// ------

function getMusic(theme, callback) {
    return setTimeout(() => {
        if (theme === 'dusk') {
            return callback({
                album: 'music for airports',
            });
        }
        return callback({
            album: 'kind of blue',
        });
    },1000);
}

getUserPreferences(preferences => {
    return getMusic(preferences.theme, music => {
        return console.log(music.album);
    });
});