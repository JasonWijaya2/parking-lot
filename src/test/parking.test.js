const ParkingLot = require("../parking/parking");
const Attendant = require("../parking/attendant");

describe("ParkingLot and Attendant", () => {
  it("should park a car in the first available parking lot", () => {
    const parkingLotA = new ParkingLot(1, 0);
    const parkingLotB = new ParkingLot(2, 0);
    const attendant = new Attendant();
    attendant.addParkingLot("A", parkingLotA);
    attendant.addParkingLot("B", parkingLotB);

    const ticket = attendant.park("B 1234 ABC");
    expect(ticket).toBe("A-B 1234 ABC-1");
  });

  it("should park a car in the next parking lot if the first is full", () => {
    const parkingLotA = new ParkingLot(0, 0);
    const parkingLotB = new ParkingLot(2, 0);
    const attendant = new Attendant();
    attendant.addParkingLot("A", parkingLotA);
    attendant.addParkingLot("B", parkingLotB);

    const ticket = attendant.park("B 1234 ABC");
    expect(ticket).toBe("B-B 1234 ABC-1");
  });

  it("should throw an error if all parking lots are full", () => {
    const parkingLotA = new ParkingLot(0, 0);
    const parkingLotB = new ParkingLot(0, 0);
    const attendant = new Attendant();
    attendant.addParkingLot("A", parkingLotA);
    attendant.addParkingLot("B", parkingLotB);

    expect(() => attendant.park("B 1234 ABC")).toThrow(
      "All parking lots are full"
    );
  });

  it("should throw an error if all parking lots are full", () => {
    const parkingLotA = new ParkingLot(0, 0);
    const parkingLotB = new ParkingLot(0, 0);
    const attendant = new Attendant();
    attendant.addParkingLot("A", parkingLotA);
    attendant.addParkingLot("B", parkingLotB);

    expect(() => attendant.park("B 1234 ABC")).toThrow(
      "All parking lots are full"
    );
  });

  it("should unpark a car and free up the slot", () => {
    const parkingLotA = new ParkingLot(1, 0);
    const attendant = new Attendant();
    attendant.addParkingLot("A", parkingLotA);

    const ticket = attendant.park("B 1234 ABC");
    const message = attendant.unpark(ticket);
    expect(message).toBe("B 1234 ABC-1 has been out of Parkir, Thank You!");
  });

  it("should throw an error if the parking lot is invalid", () => {
    const parkingLotA = new ParkingLot(1, 0);
    const attendant = new Attendant();
    attendant.addParkingLot("A", parkingLotA);

    expect(() => attendant.unpark("Invalid-Parking-Log")).toThrow(
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
});
