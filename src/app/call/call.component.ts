import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-call",
  templateUrl: "./call.component.html",
  styleUrls: ["./call.component.css"],
})
export class CallComponent {
  @Input() callObject: any;
  @Output() callEnded: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    console.log("call, on init");
    if (this.callObject) {
      this.callObject
        .on("joining-meeting", this.handleJoiningMeeting)
        .on("joined-meeting", this.updateParticpants)
        .on("participant-joined", this.updateParticpants)
        .on("participant-updated", this.updateParticpants)
        .on("participant-left", this.updateParticpants)
        .on("error", this.handleError)
        // camera-error = device permissions issue
        .on("camera-error", this.handleDeviceError)
        // app-message handles receiving remote chat messages
        .on("app-message", this.updateMessages);
    }
  }
  ngOnDestroy() {
    console.log("call, on destroy");
    if (this.callObject) {
      this.callObject
        .off("joining-meeting", this.handleJoiningMeeting)
        .off("joined-meeting", this.updateParticpants)
        .off("participant-joined", this.updateParticpants)
        .off("participant-updated", this.updateParticpants)
        .off("participant-left", this.updateParticpants)
        .off("error", this.handleError)
        // camera-error = device permissions issue
        .off("camera-error", this.handleDeviceError)
        // app-message handles receiving remote chat messages
        .off("app-message", this.updateMessages);
    }
  }

  handleJoiningMeeting(e: any) {
    console.log(e);
  }
  updateParticpants(e: any) {
    console.log(e);
  }
  handleError(e: any) {
    console.log(e);
  }
  handleDeviceError(e: any) {
    console.log(e);
  }
  updateMessages(e: any) {
    console.log(e);
  }

  leaveCall() {
    if (!this.callObject) {
      console.log("No call object to leave. :(");
      return;
    }
    console.log("leaving/destroying call object");
    this.callObject.leave().then(() => {
      this.callObject.destroy();
      this.callObject = null;
      this.callEnded.emit();
    });
  }
}
