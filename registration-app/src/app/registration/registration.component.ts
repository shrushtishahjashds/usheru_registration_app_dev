// registration.component.ts
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ApiService } from '../registration/registration.service';
import { Observable, catchError, debounceTime, distinctUntilChanged, map, merge, of, startWith, switchMap, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
   standalone: true,
   imports: [MatIconModule,
    MatToolbarModule,MatFormFieldModule,
     MatInputModule, MatSelectModule,CommonModule,
     FormsModule,ReactiveFormsModule,MatCardModule,MatButtonModule],
})
export class RegistrationComponent implements OnInit {
  countries: any;

   constructor(private apiService: ApiService) {}

   registrationForm = new FormGroup({
    username: new FormControl('', [
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
  validateUsername(control: AbstractControl): Observable<any | null> {
    console.log('Entered validateUsername method', control.value);

    const valueChanges$ = control.valueChanges.pipe(
      startWith(control.value), // Include the initial value
      debounceTime(300),
      distinctUntilChanged()
    );

    return merge(of(null), valueChanges$).pipe(
      switchMap(() => {
        const currentValue = control.value;
        console.log('SwitchMap triggered, calling checkUsernameExists with value:', currentValue);
        return this.apiService.checkUsernameExists(currentValue);
      }),
      tap(() => {
        console.log('Tap: marking control as touched');
        control.markAsTouched();
      }),
      map((data) => {
        console.log('Mapping data:', data);
        //return data.exist ? { userExist: true } : null;
      })
    );
  
  }
  
  loadCountries() {
    this.apiService.getCountries().subscribe((contriesData) => {
      this.countries = contriesData;
    })
  }

 

  onSubmit(formData: FormGroup, formDirective: FormGroupDirective) {
    if (this.registrationForm.valid) {
      // Perform API requests and additional validations here
      let username = this.registrationForm.controls['username'].value
      let selectedCountry = this.registrationForm.controls['country'].value
      console.log('Entered Values are', `${username} ${selectedCountry}`);

    }
  }
}
