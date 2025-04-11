class ParkingLot {
  constructor(slot, ticketNumber) {
    this.slot = slot;
    this.ticketNumber = ticketNumber;
    this.listTicket = new Map();
  }

  park(car) {
    if (this.slot === 0) return "Slot not available";
    if (!car) throw new Error("Car is required");

    this.slot--;
    this.ticketNumber++;
    const ticket = `${car}-${this.ticketNumber}`;
    this.listTicket.set(ticket);
    console.log(this.listTicket);
    return ticket;
  }

  out(ticket) {
    if (!this.listTicket.has(ticket)) {
      throw new Error("Ticket is not match");
    }
    this.listTicket.delete(ticket);
    this.slot++;
    return `${ticket} has been out of Parkir, Thank You!`;
  }
}

module.exports = ParkingLot;
