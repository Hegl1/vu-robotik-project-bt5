import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubSink } from '../functions';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService implements OnDestroy {
  private subSink = new SubSink();

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Opens a snackbar
   *
   * @param message The message (or message-key if translate is true)
   * @param duration The duration to show the snackbar (or undefined if infinite)
   * @param warn Whether to show the action-button in the warn-color
   */
  private open(message: string, duration: number | undefined, warn = false) {
    this.snackBar.open(message, 'OK', {
      panelClass: warn ? 'action-warn' : undefined,
      duration,
    });
  }

  /**
   * Opens a snackbar with an action attached
   *
   * @param message The message (or message-key if translate is true)
   * @param action The action-callback that is executed if the action-button is clicked
   * @param actionText The action's text (or the key if translate is true)
   * @param duration The duration to show the snackbar (or undefined if infinite)
   * @param warn Whether to show the action-button in the warn-color
   */
  action(
    message: string,
    action: () => void,
    actionText: string = 'OK',
    duration: number | undefined = 5000,
    warn = false
  ) {
    this.subSink.push(
      this.snackBar
        .open(message, actionText, {
          panelClass: warn ? 'action-warn' : undefined,
          duration,
        })
        .onAction()
        .subscribe(() => {
          action();
        })
    );
  }

  /**
   * Opens an info snackbar
   *
   * @param message The message (or message-key if translate is true)
   * @param duration The duration to show the snackbar (or undefined if infinite)
   */
  info(message: string, duration: number | undefined = 5000) {
    this.open(message, duration, false);
  }

  /**
   * Opens a warn snackbar
   *
   * @param message The message (or message-key if translate is true)
   * @param duration The duration to show the snackbar (or undefined if infinite)
   */
  warn(message: string, duration: number | undefined = 10000) {
    this.open(message, duration, true);
  }

  /**
   * Opens an error snackbar
   *
   * @param message The message (or message-key if translate is true)
   * @param duration The duration to show the snackbar (or undefined if infinite)
   */
  error(message: string, duration: number | undefined = undefined) {
    this.open(message, duration, true);
  }

  ngOnDestroy() {
    this.subSink.clear();
  }
}
