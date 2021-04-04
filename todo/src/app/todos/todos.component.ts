import { Component, OnInit } from '@angular/core';
import { Todos } from '../mock-todos';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos = Todos;
  constructor() { }

  ngOnInit(): void {
  }

}
