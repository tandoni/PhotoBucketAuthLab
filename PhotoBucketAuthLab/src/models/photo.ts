
import { FirebaseFlatSnapshot } from "./firebase-flat-snapshot";

export class Photo extends FirebaseFlatSnapshot {

    public url: string;
    public caption: string;
    public uid: string;

    constructor(obj?: any) {
        super(obj);
        this.url = obj && obj.url || '';
        this.caption = obj && obj.caption || '';
        this.uid = obj && obj.uid || '';
    }

}
