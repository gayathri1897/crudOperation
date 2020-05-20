import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormService } from './form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedFile:File = null;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private formService: FormService){}

  registrationForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    uploadFile: [''],
    address: this.formBuilder.group({
      city: [''],
      state: [''],
      postalCode: ['']
    })
  });
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('http://localhost:3000/upload',fd)
    .subscribe(res=>{
      console.log(res);
    });
  }
  onSubmit(){
    console.log(this.registrationForm.value);
    this.formService.register(this.registrationForm.value)
    .subscribe(response => console.log('Success!', response));
  }
}

