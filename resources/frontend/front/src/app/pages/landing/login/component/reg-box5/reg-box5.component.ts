import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-reg-box5',
  templateUrl: './reg-box5.component.html',
  styleUrls: ['./reg-box5.component.scss']
})
export class RegBox5Component implements OnInit {
  communications = [];
  dataForm: FormGroup;
  submitted = false;
  allData: any;
  @Input()
  set data(data) {
    this.allData = data.reg_data;
    this.communications = data.comm;
    this.dataForm = this.formBuilder.group({
      interest_communications: [this.allData.interest_communications, Validators.required],
      agree_terms: [this.allData.agree_terms, Validators.required],
    });

    const interest_communications = this.allData.interest_communications;
    if (interest_communications != undefined && interest_communications != null && interest_communications != '') {
      const arr = interest_communications.split(',');
      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          let val = parseInt(arr[i]);
          let idx = this.communications.findIndex(item => {
            return item.id === val;
          });
          this.communications[idx].checked = true;
        }
      }
    }
  };

  @Output() valueChange = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
  }



  get f(): any { return this.dataForm.controls; }

  onCheckChange(event) {
    const value = event.target.value;

    // Add a new control in the arrayForm
    const idx = this.communications.findIndex(item => {
      return item.id == value;
    });
    /* Selected */
    if (event.target.checked) {
      this.communications[idx].checked = true;
    }
    /* unselected */
    else {
      this.communications[idx].checked = false;
    }
    let temp = [];
    for (let i = 0; i < this.communications.length; i++) {
      const item = this.communications[i];
      if (item.checked) {
        temp.push(item.id);
      }
    };
    let interest_communications = temp.join(',');
    console.log(interest_communications);
    this.f.interest_communications.setValue(interest_communications);
  }

  onAgreeTerms(event) {
    /* Selected */
    if (event.target.checked) {
      this.f.agree_terms.setValue('yes');
    }
    /* unselected */
    else {
      this.f.agree_terms.setValue('');
    }
  }

  onSubmit() {
    console.log('hre');
    this.submitted = true;

    // stop here if form is invalid
    if (this.dataForm.invalid) {
      return;
    }

    const params = {
      interest_communications: this.f.interest_communications.value,
      agree_terms: this.f.agree_terms.value,
    };

    const data = {
      page: '6',
      direction: 'forward',
      form: params,
    }
    this.valueChange.emit(data);
  }

  onBack() {
    const data = {
      page: '4',
      direction: 'back'
    }
    this.valueChange.emit(data);
  }
}
