class Attendant {
  constructor(parkingLot) {
    // if (!parkingLot) throw new Error("Parking Lot is required");
    this.parkingLot = parkingLot;
  }

  park(car) {
    return this.parkingLot.park(car);
  }

  unpark(ticket) {
    return this.parkingLot.out(ticket);
  }
}

module.exports = Attendant;
