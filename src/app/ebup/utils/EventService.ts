import { Subject } from 'rxjs';
export class EventService {
    private static eventService: EventService = new EventService();

    /**核心 - 获取实例 */
    public static getInstance(): EventService {
        return EventService.eventService;
    }

    private emmitCall = {};

    private messageSu = new Subject<Event>();
    messageObserve = this.messageSu.asObservable();
    constructor() { }
    private setMessage(event: Event) {
        this.messageSu.next(event);
    }
    public emmitEvent(event: Event, callback?: Function) {
        this.setMessage(event);
        if (callback) {
            callback();
        }
    }
    public emitCall(message: any,...param1:any) {
        for (let eventName in this.emmitCall) {
            if(message==eventName){
                for(let func of this.emmitCall[eventName]){
                    func({message,...param1});
                }
                break;
            }
        }
    }
    public on(eventName: string, callback: Function) {
        if (this.emmitCall[eventName] == undefined || this.emmitCall[eventName] == null) {
            this.emmitCall[eventName] = [];
        }
        this.emmitCall[eventName].push(callback);
    }
}