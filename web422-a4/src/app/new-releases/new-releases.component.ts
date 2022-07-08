import { Component, OnInit } from '@angular/core';

import data from '../data/new-releases.json';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
