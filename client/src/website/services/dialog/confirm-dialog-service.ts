import {Injectable} from '@wizardoc/injector';

import {ConfirmDialog} from '../../components';

import {DialogService, DialogRef} from './dialog-service';

export interface ConfirmDialogRes {}

export interface ConfirmDialogOptions {
  cancelText: string;
  sureText: string;
}

export interface ConfirmDialogConfig {
  title?: string;
  content: string;
  options?: ConfirmDialogOptions;
  onSureClick?(): void;
  onCancelClick?(): void;
}

@Injectable()
export class ConfirmDialogService extends DialogService {
  /** confirm dialog */
  confirm({
    options,
    title = '提醒',
    content,
    onCancelClick,
    onSureClick,
  }: ConfirmDialogConfig): Promise<DialogRef> {
    const {sureText, cancelText} = this.parseConfirmOptions(options);

    return this.open(ConfirmDialog, {
      title,
      componentProps: {
        content,
        onCancelClick,
        onSureClick,
        sureText,
        cancelText,
      },
    });
  }

  private parseConfirmOptions(
    options?: Partial<ConfirmDialogOptions>,
  ): ConfirmDialogOptions {
    return {
      cancelText: '我再想想',
      sureText: '好',
      ...(options ?? {}),
    };
  }
}
