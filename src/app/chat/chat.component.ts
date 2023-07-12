import { Component, Input } from "@angular/core";
import { FormBuilder } from "@angular/forms";
interface Message {
  name: string;
  message: string;
}

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent {
  @Input() callObject: any;
  messages: Array<Message> = [];

  constructor(private formBuilder: FormBuilder) {}

  chatForm = this.formBuilder.group({
    message: "",
  });

  chatIsOpen = false;

  ngOnInit() {
    console.log("chat, on init");
    if (!this.callObject) return;
    console.log("set app message");
    this.callObject.on("app-message", (e: any) =>
      this.handleNewMessage(e, this.messages)
    );
  }

  ngOnDestroy() {
    console.log("chat, on destroy");
    if (!this.callObject) return;
    this.callObject.off("app-message", (e: any) =>
      this.handleNewMessage(e, this.messages)
    );
    // Reset local var
    this.messages = [];
  }

  // Show/hide chat in UI
  toggleChatView() {
    this.chatIsOpen = !this.chatIsOpen;
  }

  // Add new message to message array to be displayed in UI
  handleNewMessage(e: any, messages: any) {
    console.log(e);
    messages.push({ message: e.data.message, name: e.data.name });
  }

  // Submit chat form if user presses Enter key while the textarea has focus
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

    const name = this.callObject.participants().local.user_name;
    this.callObject.sendAppMessage({ message: message, name });
    // add your message to the chat (the app-message event does not get fired for your own messages, only other participants).
    this.messages.push({ message, name: "Me" });
    // clear the form input for your next message
    this.chatForm.reset();
  }
}
