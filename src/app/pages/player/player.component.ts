import { Component, OnInit } from '@angular/core';
import { AudioService } from "../../services/audio.service";
import { CloudService } from "../../services/cloud.service";
import { StreamState } from "../../interfaces/stream-state";


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor( public audioService: AudioService, public cloudService: CloudService) { 
    
    cloudService.getFiles().subscribe(files => {
      this.files = files;
    });

    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit(): void {
  }

    files: Array<any> = [
      { name: "First Song", artist: "Inder" },
      { name: "Second Song", artist: "You" }
    ];

    state: StreamState = {
      playing: false,
      readableCurrentTime: "",
      readableDuration: "1000",
      duration: undefined,
      currentTime: undefined,
      canplay: true,
      error: false
    };


    currentFile: any = {};
  
    // isFirstPlaying() {
    //   return false;
    // }

    // isLastPlaying() {
    //   return true;
    // }


    playStream(url) {
      this.audioService.playStream(url).subscribe(events => {
        // listening for fun here
      });
    }

    openFile(file, index) {
      this.currentFile = { index, file };
      this.audioService.stop();
      this.playStream(file.url);
    }

    pause() {
      this.audioService.pause();
    }

    play() {
      this.audioService.play();
    }

    stop() {
      this.audioService.stop();
    }

    next() {
      const index = this.currentFile.index + 1;
      const file = this.files[index];
      this.openFile(file, index);
    }

    // ...constructor and other methods ...
    previous() {
      const index = this.currentFile.index - 1;
      const file = this.files[index];
      this.openFile(file, index);
    }


    isFirstPlaying() {
      return this.currentFile.index === 0;
    }

    isLastPlaying() {
      return this.currentFile.index === this.files.length - 1;
    }

    onSliderChangeEnd(change) {
      this.audioService.seekTo(change.value);
    }


}
