function saveToLocalStorage(search){

    let searchArr = getFromLocalStorage();

    if(!searchArr.includes(search)){
        searchArr.push(search);
    }
    
    localStorage.setItem('Names', JSON.stringify(nameArr))
}

function getFromLocalStorage(){
    let localStorageData = localStorage.getItem('Names');
    if(localStorageData == null){
        return [];
    }

    return JSON.parse(localStorageData);
}

function removeFromLocalStorage(search){
    let localStorageData = getFromLocalStorage();

    let nameIndex = localStorageData.indexOf(search);

    localStorageData.splice(nameIndex, 1);

    localStorage.setItem('Names', JSON.stringify(localStorageData));

}

export { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage}