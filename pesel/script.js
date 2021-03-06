var validatePeselWorker = new Worker('validate_one_pesel.js');
var showAllPeselsWorker = new Worker('show_all_pesels.js');
var findValidPeselsWorker = new Worker('find_valid_pesels.js');
var isValidDiv = document.getElementById("is-valid");
var foundDiv = document.getElementById("found-pesels");
var showAllDiv = document.getElementById("show-all");

showAllPeselsWorker.addEventListener('message', function(e) {
    var div = document.createElement('div');
    isValidDiv.querySelectorAll('*').forEach(n => n.remove());
    foundDiv.querySelectorAll('*').forEach(n => n.remove());
    div.innerHTML = e.data; 
    showAllDiv.appendChild(div);
}, false)

validatePeselWorker.addEventListener('message', function(e) {
    var div = document.createElement('div');
    foundDiv.querySelectorAll('*').forEach(n => n.remove());
    showAllDiv.querySelectorAll('*').forEach(n => n.remove());
    div.innerHTML = e.data.pesel + " jest poprawny"; 
    isValidDiv.appendChild(div);
})

findValidPeselsWorker.addEventListener('message', function(e) {
    var div = document.createElement('div');
    isValidDiv.querySelectorAll('*').forEach(n => n.remove());
    showAllDiv.querySelectorAll('*').forEach(n => n.remove());
    div.innerHTML = e.data; 
    foundDiv.appendChild(div);
})

function showAllPesels() {
    showAllPeselsWorker.postMessage(getFormNumbers().birthDate);
}

function validatePesel() {
    validatePeselWorker.postMessage(getFormNumbers());
}

function findValidPesels() {
    var numbers = getFormNumbers();
    var data = numbers.ordinalNumber + "" + numbers.gender + "" + numbers.controlNumber;
    findValidPeselsWorker.postMessage(data)
}

function getFormNumbers() {
    return formData = {
        birthDate: procesDate(document.getElementById("birthDate").value),
        ordinalNumber: document.getElementById("ordinalNumber").value,
        gender: document.getElementById("gender").value,
        controlNumber: document.getElementById("controlNumber").value
    }
}

function procesDate(date) {
    var dateObject = date.split("-");
    var year = dateObject[0];
    var month = dateObject[1];
    var day = dateObject[2];
    return constructDateNumbers(year, month, day);
 }
 
 function constructDateNumbers(year, month, day) {
    const preparedYear = year.substring(2, 4);
    if (year >= 1900 && year <= 1999) {
       return preparedYear + "" + month + "" + day;
    } else if (year >= 1800 && year <= 1899) {
       const preparedMonth = month + 80;
       return preparedYear + "" + preparedMonth + "" + day;
    } else if (year >= 2000 && year <= 2099) {
       const preparedMonth = month + 20;
       return preparedYear + "" + preparedMonth + "" + day;
    } else if (year >= 2100 && year <= 2199) {
       const preparedMonth = month + 40;
       return preparedYear + "" + preparedMonth + "" + day;
    } else if (year >= 2200 && year <= 2299) {
       const preparedMonth = month + 60;
       return preparedYear + "" + preparedMonth + "" + day;
    }
 }