import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-call",
  templateUrl: "./call.component.html",
  styleUrls: ["./call.component.css"],
})
export class CallComponent {
  @Input() callObject: any;
  @Output() callEnded: EventEmitter<any> = new EventEmitter();
  participants = [];

  ngOnInit() {
    console.log("call, on init");
    console.log(this.participants);
    if (this.callObject) {
      this.callObject
        .on("joining-meeting", this.handleJoiningMeeting)
        .on("joined-meeting", (e: any) =>
          this.handleJoinedMeeting(e, this.participants)
        )
        .on("participant-joined", (e: any) =>
          this.participantJoined(e, this.participants)
        )
        .on("participant-updated", (e: any) =>
          this.updateParticipants(e, this.participants)
        )
        .on("participant-left", (e: any) =>
          this.updateParticipants(e, this.participants)
        )
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
        .off("joined-meeting", this.handleJoinedMeeting)
        .off("participant-joined", this.participantJoined)
        .off("participant-updated", this.updateParticipants)
        .off("participant-left", this.updateParticipants)
        .off("error", this.handleError)
        // camera-error = device permissions issue
        .off("camera-error", this.handleDeviceError)
        // app-message handles receiving remote chat messages
        .off("app-message", this.updateMessages);
    }
  }

  handleJoiningMeeting(e: any) {
    console.log(e.action);
  }

  handleJoinedMeeting(e: any, participants: any) {
    console.log(e.action);
    participants.push(e.participants.local);
  }

  participantJoined(e: any, participants: any) {
    console.log(e.action);
    participants.push(e.participant);
  }

  updateParticipants(e: any, participants: any) {
    console.log(e.action);

    participants = participants.map((p: any) => {
      return p.session_id === e.participant.session_id ? e.participant : p;
    });
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
  toggleLocalVideo() {
    console.log("toggle video");
    const videoOn = this.callObject.localVideo();
    this.callObject.setLocalVideo(!videoOn);
  }
  toggleLocalAudio() {
    console.log("toggle audio");
    const audioOn = this.callObject.localAudio();
    this.callObject.setLocalAudio(!audioOn);
  }
}
