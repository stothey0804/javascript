function getUserPreferences(){
    const preferences = new Promise((resolve, reject) => {
        resolve({
            theme: 'dusk',
        });
    });
    return preferences;
}

getUserPreferences().then(preferences => {
    console.log(preferences.theme);
});

function failUserPreferece() {
    const finder = new Promise((resolve, reject) => {
        reject({
            type: '접근 거부됨',
        });
    });
    return finder;
}

failUserPreferece().then(preferences => {
    console.log(preferences.theme);
}).catch(error => {
    console.error(`실패: ${error.type}`);
})

function getMusic(theme){
    if(theme === 'dusk') {
        return Promise.resolve({
            album: 'music for airports',
        })
    }
    return Promise.resolve({
        album: 'kind of blue',
    });
}

function getArtist(album) {
    return Promise.resolve({
        artist: 'Braian Eno',
    });
}

function failMusic(theme) {
    return Promise.reject({
        type: 'network error',
    });
}

getUserPreferences()
    .then(preference => getMusic(preference.theme))
    .then(music => {console.log(music.album)});
    
getUserPreferences()
    .then(preference => getMusic(preference.theme))
    .then(music => getArtist(music.album))
    .then(music => {console.log(music.artist)});

// promise가 거절되는 모든 경우 처리 - catch
getUserPreferences()
    .then(preference => failMusic(preference.theme))
    .then(music => getArtist(music.album))
    .catch(e => { console.log(e) });
    
