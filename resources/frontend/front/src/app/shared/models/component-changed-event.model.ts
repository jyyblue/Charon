export class ComponentChangedEvent {
  public action: string;
  public payload: any;

  constructor( public taskid: string, public field: string, public entity?: any) {}
}
