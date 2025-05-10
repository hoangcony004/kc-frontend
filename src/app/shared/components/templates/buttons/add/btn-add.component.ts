import { Component, Input, OnInit } from '@angular/core';
import { LBL_DISPLAY } from '../../../../../core/custom/constants';

@Component({
    selector: 'ngx-btn-add',
    templateUrl: './btn-add.component.html',
    styleUrls: ['./btn-add.component.scss']
})
export class BtnAddComponent implements OnInit {
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
