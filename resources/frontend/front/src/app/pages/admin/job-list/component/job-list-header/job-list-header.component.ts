import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ComponentChangedEvent } from '../../../../../shared/models/component-changed-event.model';

@Component({
  selector: '[app-job-list-header]',
  templateUrl: './job-list-header.component.html',
  styles: [
  ],
  styleUrls: [
    '../../job-list.component.scss'
  ]
})
export class JobListHeaderComponent implements OnInit {
  @Input()
  filterStatus;

  @Input()
  intermediate;

  @Input()
  checkAll;

  @Input()
  sortBy;
  
  @Input()
  sortDesc;

  @Output()
  componentChange: EventEmitter<ComponentChangedEvent> = new EventEmitter();

  constructor(

  ) { }

  ngOnInit(): void {
  }

  onSelectAll(e) {
    let checked = 'false';
    if (e.target.checked) {
      checked = 'true';
    }
    const compChgEvent = new ComponentChangedEvent(null, checked, null);
    compChgEvent.action = 'check_all';
    this.componentChange.emit(compChgEvent);
  }

  setSort(key){
    const compChgEvent = new ComponentChangedEvent(null, key, null);
    compChgEvent.action = 'setSort';
    this.componentChange.emit(compChgEvent);
    console.log('set sort hader');
  }

  updateJobList(task) {
    const compChgEvent = new ComponentChangedEvent(null, null, task);
    compChgEvent.action = 'update';
    this.componentChange.emit(compChgEvent);
  }
}
