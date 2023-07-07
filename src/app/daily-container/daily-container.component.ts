import { Component } from "@angular/core";

@Component({
  selector: "app-daily-container",
  templateUrl: "./daily-container.component.html",
  styleUrls: ["./daily-container.component.css"],
})
export class DailyContainerComponent {
  // Store callObject in this parent container.
  // Most callObject logic in CallComponent.
  callObject: any;

  setCallObject(co: any) {
    // Event is emitted from CallComponent
    this.callObject = co;
  }

  callEnded() {
    // Event is emitted from CallComponent
    console.log("resetting call object in container");
    // Truthy value will show the CallComponent; otherwise, the JoinFormComponent is shown.
    this.callObject = null;
  }
}
