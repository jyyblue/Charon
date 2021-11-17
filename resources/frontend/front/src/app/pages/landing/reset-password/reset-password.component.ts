import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../app.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  constructor(
    private appService: AppService,
    private formBuilder: FormBuilder,
  ) {
    this.appService.pageTitle = 'Password reset - Pages';
  }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['test@admin.com', [Validators.required, Validators.email]],
    });
  }
}
