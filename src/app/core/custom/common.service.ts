import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { HEIGHT_DIALOG, WIDTH_DIALOG } from './constants';

@Injectable({ providedIn: 'root' })
export class CommonService {

  configDialog(
    widthDialog: string,
    data: any,
  ): MatDialogConfig {
    const DIALOG_CONFIG = new MatDialogConfig();
    // DIALOG_CONFIG.disableClose = true;
    DIALOG_CONFIG.width = widthDialog;
    DIALOG_CONFIG.height = 'auto';
    DIALOG_CONFIG.maxWidth = WIDTH_DIALOG;
    DIALOG_CONFIG.maxHeight = HEIGHT_DIALOG;
    DIALOG_CONFIG.data = data;
    return DIALOG_CONFIG;
  }
}
