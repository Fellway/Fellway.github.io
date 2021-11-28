var validatePeselWorker = new Worker('validate_one_pesel.js');

this.addEventListener('message', function (e) {
    findPesels(e.data);
}, false);

validatePeselWorker.addEventListener('message', function(e) {
    var data = e.data;
    if(data.isValid) {
        sendResult(data.pesel);
    }
})

function sendResult(pesel) {
    this.postMessage(pesel);
}

function findPesels(data) {
    var year;
    var month;
    var day;
    for (var i = 0; i < 100; i++) {
        if(i < 10) {
            year = "0" + i;
        } else {
            year = i;
        }
        for(var j=1; j<13; j++) {
            if(j < 10) {
                month = "0" + j;
            } else {
                month = j;
            }
            for(var k=1; k < 32; k++) {
                if(k < 10) {
                    day = "0" + k;
                } else {
                    day = k;
                }
                validatePeselWorker.postMessage({
                    birthDate: year + "" + month + "" + day,
                    ordinalNumber: (data + "").substring(0, 3),
                    gender: (data + "").substring(3, 4),
                    controlNumber: (data + "").substring(4, 5)
                });
            }
        }
    }
} 