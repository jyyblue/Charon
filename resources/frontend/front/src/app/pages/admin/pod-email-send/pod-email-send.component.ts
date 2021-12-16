import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pod-email-send',
  templateUrl: './pod-email-send.component.html',
  styles: [
  ],
  styleUrls: [
    '../../../../vendor/libs/quill/typography.scss',
    '../../../../vendor/libs/quill/editor.scss'
  ]
})
export class PodEmailSendComponent implements OnInit {
  taskid;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private appService: AppService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
    ) { 
  }
  templates = [];
  template;
  to = '';

  mailForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.taskid = this.route.snapshot.params['id'];
    this.getTemplate();
    this.mailForm = this.formBuilder.group({
      editorContent: [null, [Validators.required]],
      content:[null, [Validators.required]]
    });
  }

  get f(): any { return this.mailForm.controls; }

  getTemplate() {
    this.appService.showLoading();
    let params = {
      'taskid': this.taskid,
    }
    this.apiService.getPodEmailTemplate(params).then(res => {
      this.appService.hideLoading();
      this.templates = res.templates;
      this.to = res.task.customer.company_email;
    }).catch(err => {

    });
  }

  sendPodMail() {
    this.submitted = true;
    let content = this.f.editorContent.value;
    this.mailForm.patchValue({'content': content});
    console.log('here');
    // stop here if form is invalid
    if (this.mailForm.invalid) {
      return;
    }
    content = this.f.editorContent.value.replace(/<[^>]*>/g, '');
    this.mailForm.patchValue({'content': content});
    if (this.mailForm.invalid) {
      return;
    }
    this.appService.showLoading();
    let params = {
      'to': this.to,
      'taskid': this.taskid,
      'content': this.f.editorContent.value
    }
    this.apiService.sendPodMail(params).then(res => {
      this.appService.hideLoading();
      console.log('true');
      this.toastrService.success("Sent Mail Successfully!", "Success");
    }).catch(err => {
      this.toastrService.error("Error!", "Error");
    });
  }

  changeTemplate(){
    this.mailForm.patchValue({ 'editorContent': this.templates[this.template] });
  }
}
