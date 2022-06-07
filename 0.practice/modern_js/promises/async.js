function getUserPreferences(){
    const preferences = new Promise((resolve, reject) => {
        resolve({
            theme: 'dusk',
        });
    });
    return preferences;
}
// 비동기 담당
async function getTheme() {
    const { theme } = await getUserPreferences();
    return theme;
}

getTheme().then(theme => console.log(theme));


// -------

async function getArtistbyPreference(){
    const { theme } = await getUserPreferences();
    const { album } = await getMusic(theme);
    const { artist } = await getArtist(album);
    return artist;
}

async function failArtistbyPreference(){
    const { theme } = await getUserPreferences();
    const { album } = await failMusic(theme);
    const { artist } = await getArtist(album);
    return artist;
}

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


getArtistbyPreference().then(artist => console.log(artist));

// 예외처리
failArtistbyPreference()
    .then(artist => console.log(artist))
    .catch(e => console.error(e));
