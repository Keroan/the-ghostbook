import { Component, OnInit } from '@angular/core';

import { faGhost } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent {

  faGhost = faGhost;

  constructor() { }

}
