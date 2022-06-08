import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ApiService } from "src/app/shared/services/api.service";
declare var $: any;
import { environment } from "src/environments/environment";
@Component({
  selector: "app-dcomponent-business",
  templateUrl: "./dcomponent-business.component.html",
  styles: [".noClick {pointer-events: none;color: #ad9e9e; }"],
  styleUrls: [
    "../../../../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss"
  ],
  encapsulation: ViewEncapsulation.None
})
export class DcomponentBusinessComponent implements OnInit {
  @Input() driver_id = 0;
  documentList = [];
  doc_type_id = 0;
  downloadurl = `${environment.apiUrl}/admin/v1/driver/downloadpdf`;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getDocumentDate();
  }

  getDocumentDate() {
    let params = {
      driver_id: this.driver_id
    };
    this.apiService
      .getDriverDocumentData(params)
      .then(res => {
        let code = res.code;
        if (code == 200) {
          this.documentList = res.documentList;
        }
      })
      .catch(err => {
        let status = err.status;
      });
  }
  uploadDocument(type_id) {
    this.doc_type_id = type_id;
    console.log(type_id);
    $("#uploader").click();
  }
  uploadFile(event) {
    const file: File = event.target.files[0];
    console.log(file);
    if (file) {
      // this.fileName = file.name;
      const params = new FormData();
      params.append("file", file);
      params.append("driver_id", this.driver_id.toString());
      params.append("type", this.doc_type_id.toString());
      this.apiService
        .uploadDriverBusinessDocument(params)
        .then(res => {
          let code = res.code;
          if (code == 200) {
            $("#uploader").val("");
            this.getDocumentDate();
          }
        })
        .catch(err => {
          let status = err.status;
        });
    }
  }
  deleteDocument(type_id) {
    let params = {
      driver_id: this.driver_id,
      type: type_id
    };
    this.apiService
      .deleteDriverBusinessDocument(params)
      .then(res => {
        let code = res.code;
        if (code == 200) {
          $("#uploader").val("");
          this.getDocumentDate();
        }
      })
      .catch(err => {
        let status = err.status;
      });
  }
  viewDocument(path) {
    const win = window.open();
    // GET.getFileArrayBuffer(disk, path).then((response) => {
    //     const blob = new Blob([response.data], { type: 'application/pdf' });
    win.document.write(
      `<iframe src="${path}" allowfullscreen height="100%" width="100%"></iframe>`
    );
    win.document.title = "Pdf Viewer";
  }
}
