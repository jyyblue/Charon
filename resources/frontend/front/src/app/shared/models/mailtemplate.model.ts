export class MailTemplate {
    public id: number;
    public content: string;

    public active: number;
    public subject: string;
    public type_slug: string;
    public receiver: string;

    constructor(){
        this.id = 0;
        this.content = '';
        this.subject = '';
        this.type_slug = '';
        this.receiver = '';
        this.active = 0;
    }
}
