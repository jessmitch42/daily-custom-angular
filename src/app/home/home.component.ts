import { Component, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import DailyIframe from "@daily-co/daily-js";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  callObject: any = null;

  ngOnInit() {
    this.createCallObject();
  }

  ngOnDestroy() {
    if (this.callObject) {
      console.log("destroying call objects");
      this.callObject.leave();
      this.callObject.destroy();
      this.callObject = null;
    }
  }

  createCallObject() {
    console.log("creating call object");
    this.callObject = DailyIframe.createCallObject();
  }

  joinForm = this.formBuilder.group({
    name: "",
    url: "",
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit(): void {
    console.log("The join form submitted:", this.joinForm.value);
    this.callObject
      .join({
        url: this.joinForm.value.url,
        userName: this.joinForm.value.name,
      })
      .then((r: any) => console.log(r));
    this.joinForm.reset();
  }
}
