import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import DailyIframe from "@daily-co/daily-js";

@Component({
  selector: "join-form",
  templateUrl: "./join-form.component.html",
  styleUrls: ["./join-form.component.css"],
})
export class JoinFormComponent {
  @Output() setCallObject: EventEmitter<any> = new EventEmitter();
  callObject: any;

  joinForm = this.formBuilder.group({
    name: "",
    url: "",
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit(): void {
    this.callObject = DailyIframe.createCallObject();
    console.log("The join form submitted:", this.joinForm.value);
    this.callObject
      .join({
        url: this.joinForm.value.url,
        userName: this.joinForm.value.name,
      })
      .then((r: any) => console.log(r));
    this.joinForm.reset();
    this.setCallObject.emit(this.callObject);
  }
}
