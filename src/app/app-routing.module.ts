import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventFormComponent } from 'src/app/events/views/event-form/event-form.component';
import { SuccessComponent } from 'src/app/events/views/success/success.component';

const routes: Routes = [
  {
    path: 'event-form',
    component: EventFormComponent
  },
  {
    path: 'success',
    component: SuccessComponent
  },
  {
    path: '**',
    redirectTo: 'event-form',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
