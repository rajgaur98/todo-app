import { Todo } from './todos/todo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseUrl = 'http://localhost:5000/api/';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  
  getTodos(label){
    let url = baseUrl + 'todos?label=' + label;
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

  updateTodo(todo_id, status){
    let url = baseUrl + 'todo/' + todo_id;
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put(url, {status: status}, {headers: headers});
  }

}
