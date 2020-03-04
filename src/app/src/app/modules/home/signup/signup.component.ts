import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from 'src/app/core/services/user/user.service';

// import { UserService } from "../../services/user/user.service";
// import { SpecialistService } from "../../services/specialist/specialist.service";
// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  isSubmited: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({   
      name : ['', [Validators.required, Validators.maxLength(80)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(80)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
    }
    );
  }

  signUp() {
    if (this.signUpForm.invalid) {
      this.isSubmited = true;
      return;
    } else {

      if (this.signUpForm.value.password != this.signUpForm.value.confirmPassword) {
        alert("Password and confirm password doesn't match");
        return;
      }

      this.userService.signUp(this.signUpForm.value).subscribe(res => {
        if (res.code === 200) {
          this.signUpForm.reset();
          this.router.navigate(['dashboard']);
          alert(res.msg);
        }
        else {
          alert(res.msg);
        }
      })

    }

  }

}
