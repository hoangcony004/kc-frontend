import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../core/custom/constants';

@Component({
    selector: 'ng-btn-save',
    templateUrl: './btn-save.component.html',
})
export class BtnSaveComponent implements OnInit {
    @Input() disabled: boolean | undefined;
    @Input() color: string | undefined;
    @Input() text: string | undefined;

    constructor() {
    }

    ngOnInit(): void {
        this.text = this.text ?? LBL_DISPLAY.add;
        this.disabled  = this.disabled ?? false;
        this.color = this.color ?? 'primary';
    }
}
