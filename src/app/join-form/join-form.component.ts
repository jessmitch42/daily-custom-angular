import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-join-form',
  templateUrl: './join-form.component.html',
  styleUrls: ['./join-form.component.css'],
})
export class JoinFormComponent {
  user = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
  });

  ngOnInit() {}
  submitJoinForm() {
    console.log(this.user.value);
  }
}
