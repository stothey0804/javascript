function saveBreed(breed) {
    localStorage.setItem('breed', breed);
}

function getSavedBreed() {
    return localStorage.getItem('breed');
}

function removeBreed() {
    return localStorage.removeItem('breed');
}

function applyBreedPreference(filters) {
    const breed = getSavedBreed();
    if (breed) {
        filters.set('breed', breed);
    }
    return filters;
}
// 저장한 데이터를 사용 map으로 변환
function retreivePreference() {
    const preferences = JSON.parse(localStorage.getItem('preferences'));
    return new Map(preferences);
}
// 전부 클리어
function clearPreferences() {
    localStorage.clear();
}
