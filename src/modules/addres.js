import {getAdressInfo} from "./api.js";


class AdressInfo {
    constructor(fieldClassName, formClassName, divClassName) {
        this.fieldClassName = fieldClassName; 
        this.formClassName = formClassName; 
        this.divClassName = divClassName; 
    }

    async getInfo(address){
        return await getAdressInfo(address);
    };

    init = () => {
        const findForm  = document.querySelector(`.${this.formClassName}`);
        const divAllResult  = document.querySelector(`.${this.divClassName}`);
        const addressElement  = document.querySelector(`.${this.fieldClassName}`);
        findForm.addEventListener("submit", (event) => {
            event.preventDefault();
            divAllResult.innerHTML = "Поиск ...";
            let adrInfo = this.getInfo(addressElement.value);
            adrInfo.then(function(result) {
                divAllResult.innerHTML = `Не найдено по ${addressElement.value}`;
                result.forEach(function (element) {
                    divAllResult.innerHTML = '';
                    let divResult = document.createElement("div");
                    divResult.classList.add("container__result-block");
                    let divResultColKey = document.createElement("div");
                    divResultColKey.classList.add("container__result-block-key");
                    let divResultColVal = document.createElement("div");
                    divResultColVal.classList.add("container__result-block-val");
                    Object.keys(element).forEach(function (key) {
                        let divResultKey = document.createElement("div");
                        divResultKey.innerHTML = key;
                        divResultKey.classList.add("container__result-key");
                        let divResultVal = document.createElement("div");
                        divResultVal.innerHTML = element[key];
                        divResultVal.classList.add("container__result-val");
                        divResultColKey.appendChild(divResultKey);
                        divResultColVal.appendChild(divResultVal);
                        
                    }); 
                    divResult.appendChild(divResultColKey);     
                    divResult.appendChild(divResultColVal);     
                    divAllResult.appendChild(divResult);  
                });
                
            });              
    
        });
    }    
}

const adressInfo = new AdressInfo("find-input","form-find","container-result");
adressInfo.init();
