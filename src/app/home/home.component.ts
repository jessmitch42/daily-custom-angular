import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import DailyIframe from "@daily-co/daily-js";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {

 joinForm = this.formBuilder.group({
    name: '',
    url: ''
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.joinForm.value);
    this.joinForm.reset();
  }
  
  handleButtonClick() {
    alert("hi");
  }
}
