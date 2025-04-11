class ParkingLot {
  #slot;
  ticketNumber;
  constructor(slot, ticketNumber) {
    this.#slot = slot;
    this.ticketNumber = ticketNumber;
    this.listTicket = new Map();
  }

  park(car) {
    if (this.#slot === 0) return "Slot not available";
    if (!car) throw new Error("Car is required");

    for (const ticket of this.listTicket.keys()) {
      if (ticket.startsWith(car)) throw new Error("Car is already parked");
    }

    this.ticketNumber++;
    const ticket = `${car}-${this.ticketNumber}`;
    this.listTicket.set(ticket);
    this.#slot = this.listTicket.length;
    return ticket;
  }

  out(ticket) {
    if (!ticket) throw new Error("Ticket is required");
    if (!this.listTicket.has(ticket)) throw new Error("Ticket is not match");
    this.listTicket.delete(ticket);
    this.#slot = this.listTicket.length;
    return `${ticket} has been out of Parkir, Thank You!`;
  }

  isLotFull() {
    return this.#slot <= 0;
  }
}

module.exports = ParkingLot;
