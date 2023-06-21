import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CallComponent } from "./call/call.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "call/:id", component: CallComponent },
  { path: "", component: HomeComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
