import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-reg-box2',
  templateUrl: './reg-box2.component.html',
  styleUrls: ['./reg-box2.component.scss']
})
export class RegBox2Component implements OnInit {
  services = [];
  book_class = [];
  dataForm: FormGroup;
  other: boolean;
  otherIsValid = true;
  submitted = false;
  @Input() 
  set data(data){
    let allData = data.reg_data;
    this.services = data.services;
    this.book_class = data.book_class;
    this.other = allData.other;
    this.dataForm = this.formBuilder.group({
      interest_services: [allData.interest_services, Validators.required],
      book_class: [allData.book_class, Validators.required],
      has_account: [allData.has_account, Validators.required],
      other_title: [allData.other_title],
    });

    this.checkService();

    const interest_services = allData.interest_services;
    if(interest_services != undefined && interest_services != null && interest_services != '') {
      const arr = interest_services.split(',');
      if(arr.length > 0) {
        for(let i=0; i < arr.length; i++) {
          let val =parseInt(arr[i]);
          let idx = this.services.findIndex(item => {
            return item.id === val;
          });
          this.services[idx].checked = true;
        }
      }
    }

    const bc = parseInt(allData.book_class);
    if(bc) {
      let idx = this.book_class.findIndex(item => {
        return item.id === bc;
      });
      this.book_class[idx].checked = true;
    }
  };

  @Output() valueChange = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }
  get f(): any { return this.dataForm.controls; }

  onCheckChange(event) {
    const value = event.target.value;

    // Add a new control in the arrayForm
    const idx = this.services.findIndex(item => {
      return item.id == value;
    });
    /* Selected */
    if(event.target.checked){
      this.services[idx].checked = true;
    }
    /* unselected */
    else{
      this.services[idx].checked = false;
    }
    let temp = [];
    for(let i=0; i < this.services.length; i++) {
      const item = this.services[i];
      if(item.checked) {
        temp.push(item.id);
      }
    };
    let interest_services = temp.join(',');
    console.log(interest_services);
    this.f.interest_services.setValue(interest_services);
  }

  onCheckOther(event) {
    if(event.target.checked){
      this.other = true;
    }
    else{
      this.other = false;
    }
    this.checkService();
  }

  checkService() {
    // const other_title = this.f.other_title.value;
    // if(this.other === false) {
    //   this.otherIsValid = true;
    //   return;
    // }
    // if(other_title === '' && this.other === true) {
    //   this.otherIsValid = false;
    //   return;
    // }
    // let params = {
    //   title: other_title,
    // }
    // console.log(params);
    // this.authService.registerCheckService(params).then((res) => {
    //   const code = res.code;
    //   if (code === 200) {
    //     const data = res.data;
    //     this.otherIsValid = true;
    //   } else {
    //     const message = res.message;
    //     this.toastrService.error(message, 'Info', {
    //       timeOut: 1500,
    //     });
    //     this.otherIsValid = false;
    //   }
    // }).catch((err) => {
    //   console.log(err);
    // });
  }
  onBookClass(val) {
    console.log(val);
    const idx = this.book_class.findIndex(item => {
      return item.id === val;
    });
    if(idx > -1) {
      for(let i=0; i < this.book_class.length; i++) {
        this.book_class[i].checked = false;
      }
      this.book_class[idx].checked = true;
      this.f.book_class.setValue(val);
    };

    console.log(this.book_class);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dataForm.invalid || this.otherIsValid === false) {
      return;
    }

    const params = {
      interest_services: this.f.interest_services.value,
      book_class: this.f.book_class.value,
      has_account: this.f.has_account.value,
      other: this.other,
      other_title: this.f.other_title.value,
    };

    const data = {
      page: '3',
      direction: 'forward',
      form: params,
    }
    this.valueChange.emit(data);
  }
  onBack() {
    const data = {
      page: '1',
      direction: 'back'
    }
    this.valueChange.emit(data);
  }
}
