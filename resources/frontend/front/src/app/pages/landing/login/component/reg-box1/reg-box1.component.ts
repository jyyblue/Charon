import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-reg-box1',
  templateUrl: './reg-box1.component.html',
  styleUrls: ['./reg-box1.component.scss']
})
export class RegBox1Component implements OnInit {
  dataForm: FormGroup;
  submitted = false;
  emailIsValid = false;
  @Input() 
  set data(data){
    console.log(data);
    this.dataForm = this.formBuilder.group({
      first_name: [data.first_name, Validators.required],
      last_name: [data.last_name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      home_phone: [data.home_phone, Validators.required],
      mobile_phone: [data.mobile_phone, Validators.required],
      primary_account: [data.primary_account , Validators.required],
      s_first_name: [data.s_first_name, Validators.required],
      s_last_name: [data.s_last_name, Validators.required],
      s_email: [data.s_email, [Validators.required, Validators.email]],
      s_home_phone: [data.s_home_phone, Validators.required],
    });
  };

  @Output() valueChange = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  checkEmail() {
    // let email = this.f.email.value;
    // if(email === '' || email == undefined || email === null) {
    //   this.emailIsValid = false;
    //   return;
    // }
    // let params = {
    //   email: this.f.email.value,
    // }
    // console.log(params);
    // this.authService.registerCheckEmail(params).then((res) => {
    //   const code = res.code;
    //   if (code === 200) {
    //     this.emailIsValid = true;
    //   } else {
    //     this.emailIsValid = false;
    //     const message = res.message;
    //     this.toastrService.error(message, 'Info', {
    //       timeOut: 1500,
    //     });
    //   }
    // }).catch((err) => {
    //   console.log(err);
    // });
  }
  get f(): any { return this.dataForm.controls; }

  onSubmit() {
    console.log('hre');
    console.log(this.f.email.value);
    this.submitted = true;

    if(this.f.primary_account.value === 'yes') {
      this.f.s_first_name.patchValue('y');
      this.f.s_last_name.setValue('y');
      this.f.s_email.setValue('3@g.com');
      this.f.s_home_phone.setValue('1');
    }
    // stop here if form is invalid
    if (this.dataForm.invalid || this.emailIsValid === false) {
      return;
    }

    const params = {
      first_name: this.f.first_name.value,
      last_name: this.f.last_name.value,
      email: this.f.email.value,
      home_phone: this.f.home_phone.value,
      mobile_phone: this.f.mobile_phone.value,
      primary_account: this.f.primary_account.value,
      s_first_name: '',
      s_last_name: '',
      s_email: '',
      s_home_phone: '',
    };

    if(this.f.primary_account.value === 'no') {
      params.s_first_name = this.f.s_first_name.value;
      params.s_last_name = this.f.s_last_name.value;
      params.s_email = this.f.s_email.value;
      params.s_home_phone = this.f.s_home_phone.value;
    }

    const data = {
      page: '2',
      direction: 'forward',
      form: params,
    }
    this.valueChange.emit(data);
  }

  onBack() {
    const data = {
      page: '0',
      direction: 'back'
    }
    this.valueChange.emit(data);
  }
}
