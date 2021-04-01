import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sketch',
  templateUrl: './sketch.component.html',
  styleUrls: ['./sketch.component.scss']
})
export class SketchComponent implements OnInit {

  @Input() sketch : string;

  constructor() { }

  ngOnInit() {
  }

}
