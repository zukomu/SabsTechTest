import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http: HttpClient) { 
    this.getJson(this.url).subscribe(a => {
      this.journeys = a;
      this.journeys.forEach(result => {
        result.Legs.forEach((leg: any) => {
          var legId = this.generateLegCompositeID(leg)
          this.legs.set(legId, leg)
          leg.TKTs.forEach((ticket: any) => {
            if (ticket.TicketCode != null){
              var compositeID = this.generateTicketCompositeID(ticket, leg, result)
              if (!this.tickets.has(compositeID)) {
                this.tickets.set(compositeID, ticket)
              }
            }
          });
        });
      });
    })
  }
  
  private url = "../../../assets/results.json"
  journeys: any[] = []
  legs: Map<string, any> = new Map()
  tickets: Map<string, any> = new Map()
  get numberOfTickets() { 
    var num = 0
    this.legs.forEach((leg: any) => {
      num += leg.TKTs.length
    });
    return num
  }
  getJson(url: string): Observable<any>{
    return this.http.get(url)
  }
  generateLegCompositeID(leg: any): string{
    return `${leg.DepStn}-${leg.ArrStn}-${leg.sTrnUltimateDest}` 
  }
  generateTicketCompositeID(ticket: any, leg: any, journey?: any): string{
    return `${leg.LegDirection}-${journey != undefined ? journey.ErrorStatus : "1"}-${ticket.TicketCode.split("-")[0]}` 
  }
}
