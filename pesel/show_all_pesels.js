var validatePeselWorker = new Worker('validate_one_pesel.js');

this.addEventListener('message', function(e) {
  buildCombinations(e.data);
}, false);

validatePeselWorker.addEventListener('message', function(e) {
    var data = e.data;
    if(data.isValid) {
        sendResult(data.pesel);
    }
}, false)

function sendResult(pesel) {
    this.postMessage(pesel);
}


function buildCombinations(date) {
    for (var i = 0; i<99999; i++) {
        var restOfPesel;
        if(i < 10) {
            restOfPesel = "0000" + i;
        } else if (i < 100) {
            restOfPesel = "000" + i;
        } else if (i < 1000) {
            restOfPesel = "00" + i;
        } else if (i < 10000) {
            restOfPesel = "0" + i;
        } else {
            restOfPesel = i;
        }
        var data = {
            birthDate: date,
            ordinalNumber: (restOfPesel + '').substring(0, 3),
            gender: (restOfPesel + '').substring(3, 4),
            controlNumber: (restOfPesel + '').substring(4, 5)
        }
        validatePeselWorker.postMessage(data);
    }
}