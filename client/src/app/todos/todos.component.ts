import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  constructor(private service: ServicesService) { }

  todos: Todo[];
  term = "";

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.service.getTodos().subscribe(
      (data) => {
        for(let i=0; i<data.length; i++){
          let date = data[i].date;
          date = date.toString().substring(0, 10);
          let formattedDate = date.substring(8, 10) + "-" + date.substring(5, 7) + "-" + date.substring(0, 4);
          data[i].date = formattedDate;
        }
        this.todos = data;
      }
    )
  }

  addTodo(){
    this.service.addTodo(this.form.value).subscribe(
      (data) => {
        this.form.reset();
        if(data.response !== 'Todo creation failed'){
          console.log(data.response);
          this.todos.push(data.response);
          this.service.getTodos().subscribe(
            (data) => {
              for(let i=0; i<data.length; i++){
                let date = data[i].date;
                date = date.toString().substring(0, 10);
                let formattedDate = date.substring(8, 10) + "-" + date.substring(5, 7) + "-" + date.substring(0, 4);
                data[i].date = formattedDate;
              }
              this.todos = data;
            }
          )
        }
      }
    );
  }

  deleteTodo(todo_id){
    this.service.deleteTodo(todo_id).subscribe(
      (data) => {
        if(data.response === 'Todo deleted'){
          for(let i=0; i<this.todos.length; i++){
            if(this.todos[i]._id === todo_id){
              this.todos.splice(i, 1);
            }
          }
        }
      }
    )
  }

}
