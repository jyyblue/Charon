import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reg-confirmation',
  templateUrl: './reg-confirmation.component.html',
  styleUrls: ['./reg-confirmation.component.scss']
})
export class RegConfirmationComponent implements OnInit {
  @Output() valueChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onBack() {
    const data = {
      page: '0',
      direction: 'forward',
      form: {},
    }
    console.log(data);
    this.valueChange.emit(data);
  }
}
