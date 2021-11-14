import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-base-card',
  templateUrl: './base-card.component.html',
  styleUrls: ['./base-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
