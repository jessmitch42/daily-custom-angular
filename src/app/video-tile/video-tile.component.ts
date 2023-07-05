import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from "@angular/core";

@Component({
  selector: "video-tile",
  templateUrl: "./video-tile.component.html",
  styleUrls: ["./video-tile.component.css"],
})
export class VideoTileComponent {
  @Input() participant: any;
  videoTrack: any;
  audioTrack: any;
  @Output() leaveCallClick: EventEmitter<any> = new EventEmitter();
  @Output() toggleVideoClick: EventEmitter<any> = new EventEmitter();
  @Output() toggleAudioClick: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    console.log("video tile init");
    this.addTracks(this.participant);
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (!this.videoTrack)
    console.log("video tile changes");
    if (!changes["participant"].previousValue) {
      this.addTracks(changes["participant"].currentValue);
    }
  }

  addTracks(p: any) {
    if (p.tracks.video.persistentTrack) {
      this.videoTrack = new MediaStream([p.tracks.video.persistentTrack]);
    }
    if (p.tracks.audio.persistentTrack) {
      this.audioTrack = new MediaStream([p.tracks.audio.persistentTrack]);
    }
  }

  toggleVideo() {
    this.toggleVideoClick.emit();
  }
  toggleAudio() {
    this.toggleAudioClick.emit();
  }
  handleLeaveCallClick() {
    this.leaveCallClick.emit();
  }
}
