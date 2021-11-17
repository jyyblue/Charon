import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { common as Const } from '../../../shared/const/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private appService: ApiService,
  ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem(Const.USER));
    const params = {
      username: '@'+user.username,
    };

    this.appService.getUserProfile(params).then((res) => {
      

    }).catch((err) => {
      console.log(err);
    });
  }

}
