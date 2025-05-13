import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../core/custom/constants';

@Component({
    selector: 'ng-btn-close',
    templateUrl: './btn-close.component.html',
})
export class BtnCloseComponent implements OnInit {
    @Input() disabled: boolean | undefined;
    @Input() color: string | undefined;
    @Input() text: string | undefined;

    constructor() {
    }

    ngOnInit(): void {
        this.text = this.text ?? LBL_DISPLAY.close;
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'primary';
    }
}
