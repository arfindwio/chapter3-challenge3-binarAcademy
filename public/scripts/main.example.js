/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * */

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Coba olah data ini hehe :)
//console.log(params);

/*
 * Contoh penggunaan DOM di dalam class
 * */
const app = new App();

app.loadButton.addEventListener("click", function () {
  const tipeDriver = app.tipeDriver.value;
  const jumlahPenumpang = app.jumlahPenumpang.value;

  if (jumlahPenumpang > 0 && tipeDriver) {
    app.clear();
    app.load(jumlahPenumpang).then(app.run);
  }
});

app.clearButton.addEventListener("click", function () {
  app.clear();
});
