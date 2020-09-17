/* eslint no-console: 0 */
import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import { CaptureConsole, Vue as VueIntegration } from '@sentry/integrations';

declare global {
    namespace NodeJS {
        interface Process {
            $sentry: typeof Sentry;
        }
    }
}

export interface LoggerOptions {
    appEnv?: string;
    dsn?: string;
    env?: string;
    forceConsole?: boolean;
    isProd?: boolean;
    logLevels?: LogLevels;
    release?: string;
    request?: GenericObject;
}

interface GenericObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

interface LogLevels {
    [Sentry.Severity.Debug]: boolean;
    [Sentry.Severity.Error]: boolean;
    [Sentry.Severity.Info]: boolean;
    [Sentry.Severity.Warning]: boolean;
}

interface LogFunctions {
    [Sentry.Severity.Debug]: typeof console.debug;
    [Sentry.Severity.Error]: typeof console.error;
    [Sentry.Severity.Info]: typeof console.info;
    [Sentry.Severity.Warning]: typeof console.warn;
}

export default class Logger {
    private _config: LoggerOptions;
    private _service: typeof Sentry;
    private _defaultLogLevels: LogLevels = {
        [Sentry.Severity.Debug]: true,
        [Sentry.Severity.Error]: true,
        [Sentry.Severity.Info]: true,
        [Sentry.Severity.Warning]: true,
    };
    private _logFunctions: LogFunctions = {
        [Sentry.Severity.Debug]: console.debug,
        [Sentry.Severity.Error]: console.error,
        [Sentry.Severity.Info]: console.info,
        [Sentry.Severity.Warning]: console.warn,
    };

    public constructor(options: LoggerOptions = {}) {
        // Defaults are different for production, so we need to know the env up front
        const env = options.env || process.env.NODE_ENV;
        const appEnv = process.env.VUE_APP_ENV || 'local';
        const isProd = env === 'production' || appEnv === 'production';

        if (isProd) {
            this._defaultLogLevels[Sentry.Severity.Debug] = false;
            this._defaultLogLevels[Sentry.Severity.Error] = true;
            this._defaultLogLevels[Sentry.Severity.Info] = false;
            this._defaultLogLevels[Sentry.Severity.Warning] = false;
        }

        // setting the dsn to null disables Sentry
        let dsn = null;
        if (isProd || process.env.VUE_APP_ERROR_LOGGING_FORCE_ENABLE === 'true') {
            dsn = options.dsn || process.env.VUE_APP_SENTRY_DSN;
        }

        const defaultConfig: LoggerOptions = {
            isProd,
            dsn,
            appEnv: options.appEnv || appEnv,
            release: options.release || process.env.VUE_APP_VERSION,
            forceConsole: false,
            logLevels: { ...this._defaultLogLevels },
        };

        // eslint-disable-next-line no-param-reassign
        options.request = options.request || null;

        this._config = {
            ...defaultConfig,
            ...options,
        };

        this._service = null;

        if (this._config.dsn && isProd) {
            if (process.server) {
                this._service = process.$sentry;
            } else {
                Sentry.init({
                    dsn: this._config.dsn,
                    environment: this._config.appEnv,
                    release: this._config.release,
                    integrations: [
                        new CaptureConsole({ levels: ['error', 'warn'] }),
                        new VueIntegration({ Vue, attachProps: true }),
                    ],
                });
                this._service = Sentry;
            }
        }

        // Assign the window.onerror handler for when all else fails, but bind to this
        // execution context so we have access to "this" (for this._config etc.)
        if (typeof window !== 'undefined') {
            window.onerror = this._onErrorHandler.bind(this);
        }
    }

    public warn(message: string | Error) {
        this._performLogging(message, Sentry.Severity.Warning);
    }

    public info(message: string | Error) {
        this._performLogging(message, Sentry.Severity.Info);
    }

    public debug(message: string | Error) {
        this._performLogging(message, Sentry.Severity.Debug);
    }

    public error(message: string | Error) {
        this._performLogging(message, Sentry.Severity.Error);
    }

    private _performLogging(message: string | Error, level: Sentry.Severity) {
        if (Object.keys(this._config.logLevels).indexOf(level) === -1) {
            // eslint-disable-next-line no-param-reassign
            level = Sentry.Severity.Error;
        }

        if (this._config.logLevels[level] === false && !this._config.forceConsole) {
            return;
        }

        const captureContext: {
            level: Sentry.Severity;
            extra: GenericObject;
        } = {
            level,
            extra: {
                request: this._config.request,
            },
        };

        if (this._service && this._config.logLevels[level]) {
            if (message instanceof Error) {
                this._service.captureException(message, captureContext);
            } else {
                this._service.captureMessage(message, captureContext);
            }
        }

        if (!this._service || this._config.forceConsole === true) {
            this._logFunctions[level](message, captureContext);
        }
    }

    private _onErrorHandler(
        message: string,
        sourceUrl: string,
        lineNumber: number,
        columnNumber: number,
        error: Error,
    ) {
        // Use the _service when available and in production
        const useService = this._service && this._config.isProd;

        if (useService) {
            this._service.captureMessage(
                `${message}\n${sourceUrl}\nLine: ${lineNumber}, Col: ${columnNumber}\n${error.message}`,
                {
                    level: Sentry.Severity.Critical,
                },
            );
        } else {
            console.error(
                `[CRITICAL] ${message}\n${sourceUrl}\nLine: ${lineNumber}, Col: ${columnNumber}\n${error.message}`,
            );
        }
    }
}
