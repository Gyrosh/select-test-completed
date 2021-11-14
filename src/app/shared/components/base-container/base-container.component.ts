import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-base-container',
  templateUrl: './base-container.component.html',
  styleUrls: ['./base-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
