import { Todo } from './todos/todo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:5000/api/';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  
  getTodos(){
    let url = baseUrl + 'todos';
    return this.http.get<Todo[]>(url); 
  }

  addTodo(newTodo){
    let url = baseUrl + 'todo';
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(url, newTodo, {headers: headers});
  }

  deleteTodo(todo_id){
    let url = baseUrl + 'todo/' + todo_id;
    return this.http.delete<any>(url); 
  }

}
