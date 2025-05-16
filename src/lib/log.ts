import * as logPlugin from '@tauri-apps/plugin-log';

type Log = 'debug' | 'warn' | 'error';

export function log(type: Log, ...args: Array<unknown>) {
	const nativeLogger = logPlugin[type];
	const consoleLogger = console[type];

	consoleLogger(...args);
	nativeLogger(args.join(' '));
}
