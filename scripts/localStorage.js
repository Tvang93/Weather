function saveToSearchHistory(search){

    let searchArr = getHistoryFromLocalStorage();

    if(!searchArr.includes(search)){
        searchArr.push(search);
    }
    
    localStorage.setItem('SearchHistory', JSON.stringify(searchArr));

    let localStorageData = getHistoryFromLocalStorage();
    if(localStorageData.length > 4){
        localStorageData.shift()
        localStorage.setItem('SearchHistory', JSON.stringify(localStorageData));
    }
}

function saveToFavorites(city){
    console.log("saved")
    let cityArr = getFavoritesFromLocalStorage();

    if(!cityArr.includes(city)){
        cityArr.push(city);
    }
    
    localStorage.setItem('Favorites', JSON.stringify(cityArr));
}

function getHistoryFromLocalStorage(){
    let localStorageData = localStorage.getItem('SearchHistory');
    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function getFavoritesFromLocalStorage(){
    let localStorageData = localStorage.getItem('Favorites');
    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFavorites(favorite){
    console.log("remove")
    let localStorageData = getFavoritesFromLocalStorage();

    let favoritesIndex = localStorageData.indexOf(favorite);

    localStorageData.splice(favoritesIndex, 1);

    localStorage.setItem('Favorites', JSON.stringify(localStorageData));

}

export {saveToSearchHistory, saveToFavorites, getHistoryFromLocalStorage, getFavoritesFromLocalStorage, removeFavorites}