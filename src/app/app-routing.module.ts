import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ScorecardComponent } from './components/scorecard/scorecard.component';
import { AddPlayerComponent } from './components/add-player/add-player.component';
import { CourseSelectedGuard } from './guards/course-selected.guard';


const routes: Routes = [
  { path: '', redirectTo: 'course-select', pathMatch: 'full' },
  { path: 'course-select', component: HomeComponent },
  { path: 'scorecard', component: ScorecardComponent, canActivate: [CourseSelectedGuard] },
  { path: 'add-player', component: AddPlayerComponent },
  { path: '**', redirectTo: 'course-select' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
