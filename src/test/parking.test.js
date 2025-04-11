const ParkingLot = require("../parking/parking");
const Attendant = require("../parking/attendant");

describe("ParkingLot and Attendant", () => {
  it("should park a car and return a ticket", () => {
    const parking = new ParkingLot(10, 0);
    const ticket = parking.park("B 1234 ABC");
    expect(ticket).toBe("B 1234 ABC-1");
  });

  it("should return 'Slot not available' when no slots are available", () => {
    const parking = new ParkingLot(0, 0);
    const ticket = parking.park("B 1234 ABC");
    expect(ticket).toBe("Slot not available");
  });

  it("should unpark a car and return a success message", () => {
    const parking = new ParkingLot(10, 0);
    const ticket = parking.park("B 1234 ABC");
    const message = parking.out(ticket);
    expect(message).toBe("B 1234 ABC-1 has been out of Parkir, Thank You!");
  });

  it("should throw an error if the ticket does not match", () => {
    const parking = new ParkingLot(10, 0);
    expect(() => parking.out("Invalid-Ticket")).toThrow("Ticket is not match");
  });

  it("should throw an error if no car is provided", () => {
    const parking = new ParkingLot(10, 0);
    expect(() => parking.park("")).toThrow("Car is required");
  });

  it("should use Attendant to park a car", () => {
    const parkingLot = new ParkingLot(10, 0);
    const attendant = new Attendant(parkingLot);
    const ticket = attendant.park("B 1234 ABC");
    expect(ticket).toBe("B 1234 ABC-1");
  });

  it("should use Attendant to unpark a car", () => {
    const parkingLot = new ParkingLot(10, 0);
    const attendant = new Attendant(parkingLot);
    const ticket = attendant.park("B 1234 ABC");
    const message = attendant.unpark(ticket);
    expect(message).toBe("B 1234 ABC-1 has been out of Parkir, Thank You!");
  });

  it("should throw an error if Attendant tries to park without a car", () => {
    const parkingLot = new ParkingLot(10, 0);
    const attendant = new Attendant(parkingLot);
    expect(() => attendant.park("")).toThrow("Car is required");
  });

  it("should throw an error if Attendant tries to unpark without a ticket", () => {
    const parkingLot = new ParkingLot(10, 0);
    const attendant = new Attendant(parkingLot);
    expect(() => attendant.unpark("")).toThrow("Ticket is required");
  });
});
