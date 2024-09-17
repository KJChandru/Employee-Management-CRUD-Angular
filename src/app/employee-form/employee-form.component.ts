import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../Models/employee';
import { EmployeeService } from '../employee.service';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    id:0,
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    position:''
  }
  isEditing: boolean =false;

  errormessage:string="";
  
  constructor(private employeeService : EmployeeService, private router:Router,
    private route:ActivatedRoute
  ){}
  OnSubmit() : void{
    console.log(this.employee)

    if(this.isEditing){
      this.employeeService.editEmployee(this.employee)
      .subscribe({
        next:(response)=>{
          this.router.navigate(['/']);
            console.log(response)
        },
        error:(error)=>{
            console.error(error);
            this.errormessage=`Error : ${error.status} - ${error.message}`;
        }
      });
    }
    else{
      //logic to create new employee
      this.employeeService.createEmployee(this.employee)
      .subscribe({
        next:(response)=>{
          this.router.navigate(['/']);
            console.log(response)
        },
        error:(error)=>{
            console.error(error);
            this.errormessage=`Error : ${error.status} - ${error.message}`;
        }
      });
    }
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((result)=>{
      const id=result.get('id');

      if(id){
        this.isEditing=true;
        console.log("Is editing");
        this.employeeService.getEmployeeById(Number(id)).subscribe({
          next:(result)=>{
              this.employee = result;
          },
          error:(err)=>{
              console.error("Error in loading employee");
          }
        })
         }
      
    });
  }

}
