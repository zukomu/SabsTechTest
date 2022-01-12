import { Time } from "@angular/common"

export class Point{
    constructor(name: string, code: string, time: string){
        this.name = name
        this.code = code
        this.time = {hours: +time.substring(0, 2), minutes: +time.substring(2) }
    }
    name: string
    code: string
    time: Time
}