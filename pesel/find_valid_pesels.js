this.addEventListener('message', function (e) {
    findPesels(e.data);
 }, false);

 function findPesels(data) {
     console.log(data);
 }