import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { JoinFormComponent } from "./join-form/join-form.component";
import { SharedModule } from "./shared/shared.module";
import { DailyContainerComponent } from "./daily-container/daily-container.component";
import { VideoTileComponent } from "./video-tile/video-tile.component";
import { CallComponent } from "./call/call.component";

@NgModule({
  declarations: [
    AppComponent,
    JoinFormComponent,
    DailyContainerComponent,
    VideoTileComponent,
    CallComponent,
    VideoTileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
