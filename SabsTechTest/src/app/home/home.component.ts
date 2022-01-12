import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DisplayTicket } from '../model/displayTickets';
import { TicketsService } from '../services/ticketsService/tickets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _ticketsService: TicketsService) { }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this._ticketsService.journeys)
      console.log(this._ticketsService.legs)
      console.log(this._ticketsService.tickets)
      console.log(this._ticketsService.numberOfTickets)
      this.getDisplayTickets()
    }, 0);
  }
  
  displayTickets: DisplayTicket[] = []
  getDisplayTickets(){
    this._ticketsService.legs.forEach(leg => {
      leg.TKTs.forEach((ticket: any) => {
        if (ticket.TicketCode == null){
          this.displayTickets.push(new DisplayTicket(this._ticketsService.tickets.get(ticket.ForRouteLEGTicket), leg))
        }
        else this.displayTickets.push(new DisplayTicket(ticket, leg))
      });
    });
    this.sortedTickets.data = this.getSortedTickets()
  }

  sortByTime: boolean = true
  switchSort(){ 
    this.sortByTime = !this.sortByTime
    this.sortedTickets.data = this.getSortedTickets()
   }

  sortedTickets: MatTableDataSource<DisplayTicket> = new MatTableDataSource

  getSortedTickets(){
    if (this.sortByTime)
      return this.displayTickets.sort((a, b) => this.getTotalMinutes(a.departure.time) - this.getTotalMinutes(b.departure.time))
    else return this.displayTickets.sort((a, b) => 
      +a.adultPrice.substring(1) - +b.adultPrice.substring(1))
  }

  getTotalMinutes(time: Time){
    return time.hours * 60 + time.minutes
  }
  getTimeString(time: Time){
    var string = time.hours+":"+time.minutes
    var split = string.split(":")
    if (split[0].length < 2) split[0] = split[0].padStart(2, "0")
    if (split[1].length < 2) split[1] = split[1].padStart(2, "0")
    return split[0] +":" +split[1]
  }

  columns: string [] = ["depTime", "depSttn", "arrTime", "arrSttn", 
                          "price", "travelTime", "ultDest"]
}
