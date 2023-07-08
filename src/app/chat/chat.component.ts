import { Component, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent {
  @Input() callObject: any;

  chatForm = this.formBuilder.group({
    message: "",
  });

  constructor(private formBuilder: FormBuilder) {}

  chatIsOpen = false;

  toggleChatView() {
    this.chatIsOpen = !this.chatIsOpen;
  }

  onKeyDown(event: any) {
    if (event.key === "Enter") {
      // Prevent a carriage return
      event.preventDefault();
      this.onSubmit();
    }
  }

  onSubmit() {
    console.log(this.chatForm.value.message);
    const message = this.chatForm.value.message?.trim();
    if (!message) return;
    // this.callObject.sendAppMessage()
    this.chatForm.reset();
  }
}
