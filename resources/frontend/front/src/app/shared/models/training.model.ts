export class Training {
    public id: number;
    public title: string;
    public description: string;
    public video: string;
    public thumb: string;
    public gender: string;
    public free: number;
    public price: number;
    public enabled: number;
    public deleted_at: Date;
    public created_at: Date;
    public updated_at: Date;

    constructor() {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.video = '';
        this.thumb = '';
        this.gender = '';
        this.free = 0;
        this.price = 0;
        this.enabled = 0;
    }
}
