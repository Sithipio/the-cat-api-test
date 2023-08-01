import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'cat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer,
  ) {
    this._addCatIcon();
  }

  public ngOnInit(): void {
  }

  private _addCatIcon() {
    this._matIconRegistry.addSvgIcon(
      'cat',
      this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/icons/cat.svg'),
    );
  }
}
