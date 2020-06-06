import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(todos: any, term: string){
    if(term === undefined) return todos;
    return todos.filter(function(todo){
      return todo.name.toLowerCase().includes(term.toLowerCase()) || todo.date.toLowerCase().includes(term.toLowerCase());
    });
  }

}
