class Attendant {
  constructor() {
    this.parkingLots = new Map();
  }

  addParkingLot(name, parkingLot) {
    if (!name || !parkingLot)
      throw new Error("Name and Parking Lot are required");
    this.parkingLots.set(name, parkingLot);
  }

  park(car) {
    if (!car) throw new Error("Car is required");

    for (const [name, parkingLot] of this.parkingLots) {
      if (!parkingLot.isLotFull()) {
        const ticket = parkingLot.park(car);
        return `${name}-${ticket}`;
      }
    }
    throw new Error("All parking lots are full");
  }

  unpark(ticket) {
    if (!ticket) throw new Error("Ticket is required");

    const [lotName, ...ticketParts] = ticket.split("-");
    console.log(ticket);
    console.log(this.parkingLots);
    const parkingLot = this.parkingLots.get(lotName);
    if (!parkingLot) throw new Error("Invalid parking lot");

    const carTicket = ticketParts.join("-");
    return parkingLot.out(carTicket);
  }
}

module.exports = Attendant;
