import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-call",
  templateUrl: "./call.component.html",
  styleUrls: ["./call.component.css"],
})
export class CallComponent {
  @Input() callObject: any;
  @Output() callEnded: EventEmitter<any> = new EventEmitter();
  error: any = "";
  participants = [];

  ngOnInit() {
    console.log("call, on init");
    if (!this.callObject) return;
    // Add event listeners for Daily events
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
      .on("participant-left", (e: any) => this.handleParticipantLeft(e))
      .on("error", (e: any) => this.handleError(e))
      // camera-error = device permissions issue
      .on("camera-error", this.handleDeviceError);
  }
  ngOnDestroy() {
    console.log("call, on destroy");
    if (!this.callObject) return;
    // Remove event listeners for Daily events
    this.callObject
      .off("joining-meeting", this.handleJoiningMeeting)
      .off("joined-meeting", this.handleJoinedMeeting)
      .off("participant-joined", this.participantJoined)
      .off("participant-updated", this.updateParticipants)
      .off("participant-left", this.updateParticipants)
      .off("error", this.handleError)
      .off("camera-error", this.handleDeviceError);
  }

  handleJoiningMeeting(e: any) {
    // No action needed
    console.log(e.action);
  }

  handleJoinedMeeting(e: any, participants: any) {
    console.log(e.action);
    // Add local participants to participants list used to display video tiles
    participants.push(e.participants.local);
  }

  participantJoined(e: any, participants: any) {
    console.log(e.action);
    // Add remote participants to participants list used to display video tiles
    participants.push(e.participant);
  }

  updateParticipants(e: any, participants: any) {
    // This event is triggered often.
    console.log(e.action);
    // Replace participant object with updated version.
    // In more performance-concerned apps, you can check if the change is relevant before replacing it.
    const index = participants.findIndex(
      (p: any) => p.session_id === e.participant.session_id
    );
    participants[index] = e.participant;
  }

  handleParticipantLeft(e: any) {
    console.log(e.action);
    // Remove the participant who left the call from the UI.
    const index = this.participants.findIndex(
      (p: any) => p.session_id === e.participant.session_id
    );
    this.participants.splice(index, 1);
  }

  handleError(e: any) {
    console.log(e);
    // Update local error message displayed in UI.
    this.error = e.errorMsg;
  }

  handleDeviceError(e: any) {
    console.log(e);
  }

  leaveCall() {
    if (!this.callObject) {
      console.log("No call object to leave. :(");
      return;
    }
    console.log("leaving/destroying call object");
    // Leave call and reset UI to show the join form again.
    this.callObject.leave().then(() => {
      this.callObject.destroy();
      this.callObject = null;
      this.callEnded.emit();
    });
  }

  toggleLocalVideo() {
    // Event is emitted from VideoTileComponent
    console.log("toggle video");
    const videoOn = this.callObject.localVideo();
    this.callObject.setLocalVideo(!videoOn);
  }

  toggleLocalAudio() {
    // Event is emitted from VideoTileComponent
    console.log("toggle audio");
    const audioOn = this.callObject.localAudio();
    this.callObject.setLocalAudio(!audioOn);
  }
}
