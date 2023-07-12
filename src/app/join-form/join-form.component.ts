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

  onSubmit(e: any): void {
    e.preventDefault();
    const url = this.joinForm.value.url;
    const userName = this.joinForm.value.name;

    this.callObject = DailyIframe.createCallObject();
    console.log("The join form submitted:", this.joinForm.value);

    // Join Daily call
    this.callObject.join({
      url,
      userName,
    });

    // Clear form inputs
    this.joinForm.reset();
    // Emit event to update callObject var in parent component
    this.setCallObject.emit(this.callObject);
  }
}
