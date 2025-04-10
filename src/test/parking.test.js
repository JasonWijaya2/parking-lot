const ParkingLot = require("../parking/parking");

describe("ParkingLot", () => {
  it("Car Parked", () => {
    const parking = new ParkingLot(10, 0);
    const ticket = parking.park("B 1234 ABC");

    expect(ticket).toBe("B 1234 ABC-1");
  });

  it("should return slot is not available when slot = 0", () => {
    const parking = new ParkingLot(0, 0);
    const ticket = parking.park("B 1234 ABC");
    expect(ticket).toBe("Slot not available");
  });

  it("Car Out", () => {
    const parking = new ParkingLot(10, 0);
    const car = parking.park("B 1234 ABC");
    const car2 = parking.park("B 5678 ABC");
    const ticket = parking.out(car);
    expect(ticket).toBe("B 1234 ABC-1 has been out of Parkir, Thank You!");
  });

  it("Should throw error if ticket not match", () => {
    const parking = new ParkingLot(10, 0);
    expect(() => parking.out("Invalid-Ticket")).toThrow("Ticket is not match");
  });

  it("Should throw error if car is missing", () => {
    const parking = new ParkingLot(10, 0);
    expect(() => parking.park("")).toThrow("Car is required");
  });
});
