import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models';
import { Sessione } from '../_models/sessione';
import { AuthenticationService, AlertService } from '../_services';
import { TombolaService } from '../_services/tombola.service';

@Component({
  selector: 'app-sessione',
  templateUrl: './sessione.component.html',
  styleUrls: ['./sessione.component.css']
})
export class SessioneComponent implements OnInit {
  currentUser: User;
  sessioneForm: FormGroup = this.formBuilder.group({
    costoCartella: ['', Validators.required],
  });
  loading = false;
  submitted = false;
  sessions: Sessione[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private tombolaService: TombolaService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  get f() { return this.sessioneForm.controls; }

  getCartelleLink(sessione:Sessione) {
    if (sessione.userId == this.currentUser.id) {
      return "/cartellone";
    }
    return "/cartelle";
  }

  getSessions() {
    this.tombolaService.listSessions().subscribe(
      data => {
        console.log(data);
        this.sessions = data;
      },
      error => {
        this.alertService.error(error);
      });
  }

  createSession() {
    this.tombolaService.newSession(new Sessione(this.currentUser.id, this.f.costoCartella.value))
      .subscribe(
        data => {
          //console.log(data)
          this.alertService.success("Saved "+data.id, true);
          /*
          if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/cartellone']);
          }
          */
         this.getSessions();
        },
        error => {
          this.alertService.error(error);
        });
  }

  ngOnInit(): void {
    this.getSessions();
  }

}
