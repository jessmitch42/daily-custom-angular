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
    if (this.participant.tracks.video.persistentTrack) {
      this.videoTrack = new MediaStream([
        this.participant.tracks.video.persistentTrack,
      ]);
    }
    if (this.participant.tracks.audio.persistentTrack) {
      this.audioTrack = new MediaStream([
        this.participant.tracks.audio.persistentTrack,
      ]);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (!this.videoTrack)
    console.log("video tile changes");
    console.log(changes);
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
