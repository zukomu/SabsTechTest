import { Time } from "@angular/common"
import { Point } from "./point"

export class DisplayTicket{
    constructor(ticket: any, leg: any){
        this.departure = new Point(leg.DepStnFull, leg.DepStn, leg.DepTime)
        this.arrival = new Point(leg.ArrStnFull, leg.ArrStn, leg.ArrTime)
        this.ultDestination = leg.sTrnUltimateDest
        this.adultPrice = "£" + ticket.AdtPrice
        this.childPrice = "£" + ticket.ChdPrice
    }
    departure: Point
    arrival: Point
    get travelTime(): Time{
        if (this.departure && this.arrival){
            var hours = this.arrival.time.hours - this.departure.time.hours
            var minutes = this.arrival.time.minutes - this.departure.time.minutes
            if (minutes < 0){
                hours++
                minutes = 60 + minutes
            }
            return { hours: hours, minutes: minutes}
        }
            
        else return { hours: 0, minutes: 0 }
    }
    ultDestination: string
    adultPrice: string
    childPrice: string
}