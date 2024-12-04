type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private static instance: Logger;
  private isEnabled: boolean = process.env.NODE_ENV !== 'production';

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, context: string, message: string): string {
    return `[${level.toUpperCase()}] [${context}] ${message}`;
  }

  private log(level: LogLevel, context: string, message: string, ...args: any[]) {
    if (!this.isEnabled) return;

    const formattedMessage = this.formatMessage(level, context, message);
    
    switch (level) {
      case 'debug':
        console.debug(formattedMessage, ...args);
        break;
      case 'info':
        console.info(formattedMessage, ...args);
        break;
      case 'warn':
        console.warn(formattedMessage, ...args);
        break;
      case 'error':
        console.error(formattedMessage, ...args);
        break;
    }
  }

  debug(context: string, message: string, ...args: any[]) {
    this.log('debug', context, message, ...args);
  }

  info(context: string, message: string, ...args: any[]) {
    this.log('info', context, message, ...args);
  }

  warn(context: string, message: string, ...args: any[]) {
    this.log('warn', context, message, ...args);
  }

  error(context: string, message: string, ...args: any[]) {
    this.log('error', context, message, ...args);
  }

  // Performance monitoring
  time(context: string, label: string) {
    if (!this.isEnabled) return;
    console.time(`[${context}] ${label}`);
  }

  timeEnd(context: string, label: string) {
    if (!this.isEnabled) return;
    console.timeEnd(`[${context}] ${label}`);
  }
}

export const logger = Logger.getInstance();