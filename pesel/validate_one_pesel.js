this.addEventListener('message', function (e) {
   var formData = e.data;
   this.postMessage(validatePesel(formData.birthDate + "" + formData.ordinalNumber + "" + formData.gender + "" + formData.controlNumber));
}, false);

function validatePesel(pesel) {
   let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
   let sum = 0;
   let control = 10;
   let controlNumber = parseInt(pesel.substring(10, 11));
   for (let i = 0; i < weight.length; i++) {
      sum += (parseInt(pesel.substring(i, i + 1)) * weight[i]);
   }
   sum = sum % 10;
   if (sum == 0) control = 0;
   if (control - sum === controlNumber) {
      return {
         pesel: pesel,
         isValid: true,
      };
   } else {
      return {
         pesel: pesel,
         isValid: false
      }
   }
}