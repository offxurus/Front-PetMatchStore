import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-client-logged',
  templateUrl: './client-logged.component.html',
  styleUrls: ['./client-logged.component.scss']
})
export class ClientLoggedComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor() { }

  ngOnInit(): void {
  }
}
