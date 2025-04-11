class Attendant {
  constructor(parkingLot) {
    // if (!parkingLot) throw new Error("Parking Lot is required");
    this.parkingLot = parkingLot;
  }

  park(car) {
    if (!car) {
      throw new Error("Car is required");
    }
    return this.parkingLot.park(car);
  }

  unpark(ticket) {
    if (!ticket) {
      throw new Error("Ticket is required");
    }
    return this.parkingLot.out(ticket);
  }
}

module.exports = Attendant;
