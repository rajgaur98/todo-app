import { ServicesService } from './../services.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  constructor(private service: ServicesService, private router: Router, private route: ActivatedRoute) { 
    
  }

  todos: Todo[];
  term = "";
  activeTab: number;
  labels = ['all', 'personal', 'work', 'shopping', 'others'];
  label = 'all';

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    label: new FormControl('')
  });

  ngOnInit(): void {
    var url = this.router.url.split('/');
    this.label = url.length == 3? url[2]: 'all';
    this.activeTab = this.labels.indexOf(this.label);
    this.router.events.subscribe((val) => {
      this.label = this.router.url.split('/')[2];
      this.activeTab = this.labels.indexOf(this.label);
      this.service.getTodos(this.label).subscribe(
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
    });
    this.service.getTodos(this.label).subscribe(
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
          this.todos.push(data.response);
          this.service.getTodos(this.label).subscribe(
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
              this.service.getTodos(this.label).subscribe(
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
        }
      }
    )
  }


  switchLabel(index: number){
    this.activeTab = index;
    this.router.navigate([this.labels[index]], {relativeTo: this.route});
  }

  updateStatus(todo_id, event){
    this.service.updateTodo(todo_id, event.target.value).subscribe(
      (data) => {
        for(let i=0; i<this.todos.length; i++){
          if(this.todos[i]._id === todo_id)
            this.todos[i].status = event.target.value;
        }
      }
    );
  }

}
