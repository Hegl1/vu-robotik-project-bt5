import { Subscription } from 'rxjs';

export const LoggerColor = {
  red: '#d10000',
  blue: '#21f',
  lightblue: '#0068ad',
  orange: '#c97600',
  green: '#009100',
};

/**
 * Provides styled logging functions
 */
export const Logger = {
  log: (name: string, color: string, ...message: any[]) => {
    Logger.out('log', name, color, ...message);
  },
  info: (name: string, color: string, ...message: any[]) => {
    Logger.out('info', name, color, ...message);
  },
  warn: (name: string, color: string, ...message: any[]) => {
    Logger.out('warn', name, color, ...message);
  },
  error: (name: string, color: string, ...message: any[]) => {
    Logger.out('error', name, color, ...message);
  },
  out: (type: 'log' | 'info' | 'warn' | 'error', name: string, color: string, ...message: any[]) => {
    console[type](`%c ${name} `, `color: #fff; background: ${color}; border-radius: 2px`, ...message);
  },
};

/**
 * Helper class to deal with subscriptions
 */
export class SubSink {
  private subscriptions: Subscription[] = [];

  push(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  clear() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
