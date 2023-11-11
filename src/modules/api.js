// Модуль для API

// Общая функция для запросов, если ошибки то код ошибки
function customFetch(url,options){
    return fetch(url,{
        headers : {
            'Content-Type': 'charset=utf-8',
        },
        ...options
    })
    .then(response => {
        let result = [{code:"error",
                       status:response.status,
                       text:response.statusText}];

        if (response.status === 200) {
            result = response.json();
        }
        return result;
    })
    .catch(error => {
        const result = [{code:"error",
                       text:error}];
        return result;

    });
}

//Запрос информация по адресу
export function getAdressInfo(adress) {
    const searchUrl = 'https://nominatim.openstreetmap.org/search';
    const prm1 = "addressdetails=1";
    const prm2 = `q=${adress}`;
    const prm3 = "format=jsonv2";
    const prm4 = "limit=10";
    const url =`${searchUrl}?${prm1}&${prm2}&${prm3}&${prm4}`;
    console.log(url);
    return customFetch(url,{
        headers: { 'Content-Type': 'application/json' }
    });
}