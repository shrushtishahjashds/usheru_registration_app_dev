// registration.component.ts
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RegisrationService } from '../registration/registration.service';
import { Observable, catchError, debounceTime, distinctUntilChanged, map, merge, of, startWith, switchMap, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  standalone: true,
  imports: [MatIconModule,
    MatToolbarModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, CommonModule,
    FormsModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule,NgbAlertModule],
})
export class RegistrationComponent implements OnInit {
  countries: any;
  checkingUsername = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private regisrationService: RegisrationService) { }

  registrationForm = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ],),
    country: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.loadCountries();
  }

  initForm() {
  }

  checkUsernameAvailabilityFunc(username: any): void {
    this.checkingUsername = true; // Set loading indicator to true
    // Check if the username is a valid string
    if (typeof username === 'string') {
      // Call your API service to check if the username is available
      this.regisrationService.checkUsernameAvailability(username).subscribe(
        (isAvailable: boolean) => {
          // Set the validation error if the username is not available
          if (isAvailable) {
            this.registrationForm.controls['username'].setErrors({ isUsernameAvailable: true });
          } else {
            // Clear the validation error if the username is available
            this.registrationForm.controls['username'].setErrors(null);
          }
          this.checkingUsername = false; // Set loading indicator to false
        },
        (error) => {
          console.error('Error checking username availability', error);
          this.checkingUsername = false; // Set loading indicator to false
        }
      );
    }
    console.log(this.registrationForm.controls)
  }

  loadCountries() {
    this.regisrationService.getCountries().subscribe((contriesData: any) => {
      this.countries = contriesData;
    })
  }

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective) {
    if (this.registrationForm.valid) {
      // Perform API requests and additional validations here
      let username = this.registrationForm.controls['username'].value
      let selectedCountry = this.registrationForm.controls['country'].value
      console.log('Entered Values are', `${username} ${selectedCountry}`);
      // Prepare the data for the POST request
      const postData = {
        username: username,
        country: selectedCountry,
      };
      this.regisrationService.registerUser(postData).pipe(
        switchMap((response) => {
          console.log('Registration successful. API response:', response);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          // Handle successful registration response if needed
          // Return an observable if there's another asynchronous operation to perform
          return of(response);
        }),
        tap(
          
          () => console.log('Registration successful. Side effect.'),
          (error) => { this.errorMessage = error.message;
            this.isSignUpFailed = true;
            console.error('Error during registration. API error:', error)}
          
          
        )
      )
        .subscribe();
    }
  }
}
