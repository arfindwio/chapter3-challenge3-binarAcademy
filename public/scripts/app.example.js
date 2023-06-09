class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.tipeDriver = document.getElementById("tipe-driver");
    this.tanggal = document.getElementById("tanggal");
    this.waktuJemput = document.getElementById("waktu-jemput");
    this.jumlahPenumpang = document.getElementById("jumlah-penumpang");
  }

  async load(penumpang) {
    const tanggal = app.tanggal.value;
    const waktuJemput = app.waktuJemput.value;
    const driverType = app.tipeDriver.value;

    const inputTime = new Date(`${tanggal} ${waktuJemput}`);
    const miliTimeInput = inputTime.getTime();

    const cars = await Binar.listCars((item) => {
      const dataTime = new Date(item.availableAt);
      const miliDataTime = Number(dataTime.getTime());
      const dateFilter = miliDataTime < miliTimeInput;
      const capacityFilter = item.capacity >= penumpang;
      const availableCar = item.available === true;
      const tipeSopir = driverType === "Dengan sopir" || driverType === "Tanpa sopir";

      if (availableCar) {
        return tipeSopir && capacityFilter && dateFilter;
      }
    });

    Car.init(cars);
  }

  run = () => {
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.classList.add("mobil-pencarian", "col-lg-4", "col-sm-12");
      node.innerHTML = car.render();

      this.carContainerElement.appendChild(node);
    });
  };

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
