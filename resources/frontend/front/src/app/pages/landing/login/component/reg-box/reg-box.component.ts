import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reg-box',
  templateUrl: './reg-box.component.html',
  styleUrls: ['./reg-box.component.scss']
})
export class RegBoxComponent implements OnInit {
  @Output() valueChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('submit');
    const data = {
      page: '1',
      direction: 'forward',
    }
    this.valueChange.emit(data);
  }
}
