class Attendant {
  constructor(name) {
    this.name = name;
    this.parkingLots = new Map();
    this.availableParkingLots = this.parkingLots;
  }

  addParkingLot(name, parkingLot) {
    if (!name || !parkingLot)
      throw new Error("Name and Parking Lot are required");
    this.parkingLots.set(name, parkingLot);
  }

  notifyFull(parkingLotName) {
    this.availableParkingLots.delete(parkingLotName);

    const availableLotNames = [...this.availableParkingLots.keys()].join(", ");
    return `${this.name} Available parking lots: ${availableLotNames}`;
  }

  park(car) {
    if (!car) throw new Error("Car is required");

    for (const [name, parkingLot] of this.parkingLots) {
      if (!parkingLot.isLotFull()) {
        const ticket = parkingLot.park(car);
        return `${name}-${ticket}`;
      } else {
        const notification = this.notifyFull(name);
        if ([...this.availableParkingLots.keys()].length === 0) {
          throw new Error(notification);
        }
        return notification;
      }
    }

    // throw new Error("All parking lots are full");
  }

  unPark(ticket) {
    if (!ticket) throw new Error("Ticket is required");

    const [lotName, ...ticketParts] = ticket.split("-");
    const parkingLot = this.parkingLots.get(lotName);
    if (!parkingLot) throw new Error("Invalid parking lot");

    const carTicket = ticketParts.join("-");
    return parkingLot.unPark(carTicket);
  }
}

module.exports = Attendant;
