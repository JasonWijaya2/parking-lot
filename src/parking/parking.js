class ParkingLot {
  #slot;
  ticketNumber;
  constructor(slot, ticketNumber, name) {
    this.#slot = slot;
    this.ticketNumber = ticketNumber;
    this.listTicket = new Map();
    this.observers = [];
    this.name = name;
  }

  park(car) {
    if (!car) throw new Error("Car is required");

    if (this.#slot <= 0) throw new Error("Parking lot is full");

    for (const ticket of this.listTicket.keys()) {
      if (ticket.startsWith(car)) throw new Error("Car is already parked");
    }

    this.ticketNumber++;
    const ticket = `${car}-${this.ticketNumber}`;
    this.listTicket.set(ticket);
    this.#slot--;

    return ticket;
  }

  unPark(ticket) {
    if (!ticket) throw new Error("Ticket is required");
    if (!this.listTicket.has(ticket)) throw new Error("Ticket is not match");
    this.listTicket.delete(ticket);
    this.#slot--;
    return `${ticket} has been out of Parkir, Thank You!`;
  }

  isLotFull() {
    if (this.#slot === 0) {
      this.notifyObservers();
      return this.#slot === 0;
    }
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notifyObservers() {
    for (const observer of this.observers) {
      observer.notifyFull(this.name);
    }
  }
}

module.exports = ParkingLot;
