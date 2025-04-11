const ParkingLot = require("../parking/parking");
const Attendant = require("../parking/attendant");

describe("ParkingLot and Attendant", () => {
  // Park by self
  it("should park a car when the slot is available and not using attendant", () => {
    const parkingLot = new ParkingLot(1, 0);
    const ticket = parkingLot.park("B 1234 ABC");
    expect(ticket).toBe("B 1234 ABC-1");
  });

  it("should unpark a car when ticket is match and not using attendant", () => {
    const parkingLot = new ParkingLot(1, 0);
    const ticket = parkingLot.park("B 1234 ABC");
    const unPark = parkingLot.unPark(ticket);
    expect(unPark).toBe("B 1234 ABC-1 has been out of Parkir, Thank You!");
  });

  it("should throw error when the slot is not available and not using attendant", () => {
    const parkingLot = new ParkingLot(0, 0);
    expect(() => parkingLot.park("B 1234 ABC")).toThrow("Parking lot is full");
  });

  it("should throw error when the car is empty and not using attendant", () => {
    const parkingLot = new ParkingLot(1, 0);
    expect(() => parkingLot.park()).toThrow("Car is required");
  });

  // Park using attendant
  it("should park a car in the first available parking lot and using attendant", () => {
    const parkingLotA = new ParkingLot(1, 0);
    const parkingLotB = new ParkingLot(2, 0);
    const attendant = new Attendant();
    attendant.addParkingLot("A", parkingLotA);
    attendant.addParkingLot("B", parkingLotB);

    const ticket = attendant.park("B 1234 ABC");
    expect(ticket).toBe("A-B 1234 ABC-1");
  });

  it("should unpark a car and free up the slot", () => {
    const parkingLotA = new ParkingLot(1, 0);
    const attendant = new Attendant();
    attendant.addParkingLot("A", parkingLotA);

    const ticket = attendant.park("B 1234 ABC");
    const message = attendant.unPark(ticket);
    expect(message).toBe("B 1234 ABC-1 has been out of Parkir, Thank You!");
  });

  it("should throw an error if the parking lot is invalid", () => {
    const parkingLotA = new ParkingLot(1, 0);
    const attendant = new Attendant();
    attendant.addParkingLot("A", parkingLotA);

    expect(() => attendant.unPark("Invalid-Parking-Lot")).toThrow(
      "Invalid parking lot"
    );
  });

  it("should throw an error if the same car is parked again", () => {
    const parkingLotA = new ParkingLot(2, 0);
    const attendant = new Attendant();
    attendant.addParkingLot("A", parkingLotA);

    attendant.park("B 1234 ABC");
    expect(() => attendant.park("B 1234 ABC")).toThrow("Car is already parked");
  });

  it("should notify when parking lot is full", () => {
    const parkingLotA = new ParkingLot(0, 0);
    const parkingLotB = new ParkingLot(2, 0);
    const attendant = new Attendant("Jason");
    attendant.addParkingLot("A", parkingLotA);
    attendant.addParkingLot("B", parkingLotB);
    parkingLotA.addObserver(attendant);

    const park = attendant.park("B 1234 ABC");
    expect(park).toBe("Jason Available parking lots: B");
  });

  it("should throw an error if name or parking lot is not provided when adding a parking lot", () => {
    const attendant = new Attendant("Jason");
    expect(() => attendant.addParkingLot(null, {})).toThrow(
      "Name and Parking Lot are required"
    );
    expect(() => attendant.addParkingLot("A", null)).toThrow(
      "Name and Parking Lot are required"
    );
  });

  it("should throw an error if no car is provided to park", () => {
    const parkingLotA = new ParkingLot(1, 0);
    const attendant = new Attendant("Jason");
    attendant.addParkingLot("A", parkingLotA);

    expect(() => attendant.park()).toThrow("Car is required");
  });

  // it("should throw an error if all parking lots are full", () => {
  //   const parkingLotA = new ParkingLot(0, 0);
  //   const parkingLotB = new ParkingLot(0, 0);
  //   const attendant = new Attendant("Jason");
  //   attendant.addParkingLot("A", parkingLotA);
  //   attendant.addParkingLot("B", parkingLotB);

  //   expect(() => attendant.park("B 1234 ABC")).toThrow(
  //     "All parking lots are full"
  //   );
  // });

  it("should notify observers when parking lot is full", () => {
    const parkingLotA = new ParkingLot(1, 0, "A");
    const attendant = new Attendant("Jason");
    parkingLotA.addObserver(attendant);

    parkingLotA.park("B 1234 ABC");
    expect(parkingLotA.isLotFull()).toBe(true);
  });
});
