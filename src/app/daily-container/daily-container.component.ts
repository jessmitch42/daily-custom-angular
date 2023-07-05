import { Component } from "@angular/core";

@Component({
  selector: "app-daily-container",
  templateUrl: "./daily-container.component.html",
  styleUrls: ["./daily-container.component.css"],
})
export class DailyContainerComponent {
  callObject: any;

  ngOnChanges(i: any, c: any) {
    console.log("app, on changes");
    console.log(i, c);
  }

  setCallObject(co: any) {
    console.log(co);
    this.callObject = co;
  }

  callEnded() {
    console.log("resetting call object in container");
    this.callObject = null;
  }
}
