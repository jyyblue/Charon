import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MailTemplate } from 'src/app/shared/models/mailtemplate.model';

declare var $: any;

@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styles: [
  ]
})
export class TemplateEditComponent implements OnInit {
  template_id: string;
  template = new MailTemplate();
  content;
  suggestItems = [];
  editor;
  dataForm: FormGroup;
  loading = false;
  submitted = false;
  typeList = [];

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
  ) {
    this.appService.pageTitle = 'Create Mail Template';
  }
  ngOnInit(): void {
    this.template_id = this.route.snapshot.params['id'];

    this.loadData();
    this.dataForm = this.formBuilder.group({
      subject: [null, Validators.required],
      type: [null, Validators.required],
      active: [null]
    });
  }


  get f(): any { return this.dataForm.controls; }

  loadData() {
    let params = {
      id: this.template_id
    };
    this.appService.showLoading();
    this.apiService.getTemplate(params).then((res) => {
      this.appService.hideLoading();
      console.log(res);
      this.typeList = res.type;
      this.suggestItems = res.suggestItems;
      this.initSummernote();

      this.template = res.template;
      this.content = this.template.content;
      this.dataForm = this.formBuilder.group({
        subject: [this.template.subject, Validators.required],
        type: [this.template.type_slug, Validators.required],
        active: [this.template.active]
      });
    }).catch((err) => {
      this.appService.hideLoading();
    });
  }

  initSummernote() {
    let self = this;
    let search = function (keyword) {
      var result = [];
      for (let id = 0; id < self.suggestItems.length; id++) {
        let item = self.suggestItems[id];
        if (item.match(new RegExp(keyword))) {
          result.push(item);
        }
      }
      return result;
    }

    this.editor = $("#summernote-content").summernote({
      height: 200,
      callbacks: {
        onInit: function () {
          console.log('Summernote is launched');
        },
        onChange: function (contents, $editable) {
          console.log('onChange:', contents, $editable);
          $('#summernote-error').css('display', 'none');
        }
      }
    });
    this.editor.summernote('autoComplete.setDataSrc', function (keyword, callback) {
      callback(search(keyword));
    }, "{");
    this.editor.summernote('autoComplete.on', 'insertSuggestion', function (suggestion) {
      console.log("The uesr has get the suggestion:" + suggestion);
    })
  }

  onSubmit() {
    this.submitted = true;
    let summernote_valid = false;
    if (this.editor != undefined) {
      let summernote_content = this.editor.summernote('code');
      let text = $(summernote_content).text();
      summernote_valid = summernote_content.length > 0 ? true : false;
    }
    if (summernote_valid == false) {
      $('#summernote-error').css('display', 'inline-block');
      return;
    }
    if (this.dataForm.invalid) {
      return;
    }
    let params = {
      id: this.template_id,
      subject: this.f.subject.value,
      type: this.f.type.value,
      content: this.content,
      active: this.f.active.value == true ? 1 : 0
    };
    this.appService.showLoading();
    this.apiService.updateTemplate(params).then((res) => {
      this.appService.hideLoading();
      let code = res.code;
      if (code == 200) {
        this.router.navigate(['admin/mail-manager/template/list']);
      } else {
        let message = res.message;
        this.toastrService.error(message, 'Error', {
          timeOut: 2000,
        })
      }
    }).catch(err => {

    })
  }
}
