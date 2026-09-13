import { toast } from 'sonner';

const recentToasts = new Map();
const DEBOUNCE_TIME = 2500;

const defaultMessages = {
  generic: 'Something went wrong. Please try again.',
  network: 'Unable to connect to the server. Please check your network connection.',
  unauthorized: 'Session expired or invalid credentials. Please log in again.',
  forbidden: 'You do not have permission to perform this action.',
  notFound: 'The requested record was not found.',
  validation: 'Please check your inputs and try again.',
  server: 'Server is temporarily unavailable. Please try again later.',
};

let _messages = { ...defaultMessages };

/**
 * Configure custom error messages (supports i18n integration).
 * @param {Object} messages - Override default messages
 */
export function configureErrorMessages(messages = {}) {
  _messages = { ...defaultMessages, ...messages };
}

export function getGenericErrorMessage(error, customFallback) {
  if (!error) return customFallback || _messages.generic;

  const rawMessage =
    typeof error === 'string'
      ? error
      : error?.response?.data?.message ||
        error?.response?.data?.errors?.join(', ') ||
        error?.message ||
        '';

  const lowerMsg = String(rawMessage).toLowerCase();

  if (
    lowerMsg.includes('network error') ||
    lowerMsg.includes('econnrefused') ||
    lowerMsg.includes('etimedout') ||
    lowerMsg.includes('err_network') ||
    lowerMsg.includes('err_connection') ||
    lowerMsg.includes('failed to fetch')
  ) return _messages.network;

  if (
    lowerMsg.includes('401') ||
    lowerMsg.includes('unauthorized') ||
    lowerMsg.includes('jwt') ||
    lowerMsg.includes('token expired') ||
    lowerMsg.includes('invalid credentials')
  ) return _messages.unauthorized;

  if (
    lowerMsg.includes('403') ||
    lowerMsg.includes('forbidden') ||
    lowerMsg.includes('permission denied')
  ) return _messages.forbidden;

  if (lowerMsg.includes('404') || lowerMsg.includes('not found')) return _messages.notFound;

  if (
    lowerMsg.includes('schema validation') ||
    lowerMsg.includes('validation error') ||
    lowerMsg.includes('zod') ||
    lowerMsg.includes('prisma') ||
    lowerMsg.includes('foreign key') ||
    lowerMsg.includes('unique constraint') ||
    lowerMsg.includes('sql') ||
    lowerMsg.includes('syntaxerror') ||
    lowerMsg.includes('typeerror') ||
    lowerMsg.includes('referenceerror') ||
    lowerMsg.includes('internal server error') ||
    lowerMsg.includes('500') ||
    lowerMsg.includes('exception') ||
    lowerMsg.includes('stack') ||
    lowerMsg.includes('undefined') ||
    lowerMsg.includes('null') ||
    lowerMsg.includes('[object object]') ||
    lowerMsg.includes('p2002') ||
    lowerMsg.includes('p2025') ||
    lowerMsg.includes('findunique') ||
    lowerMsg.includes('findmany') ||
    /[{}[\]\\]/.test(rawMessage)
  ) {
    if (lowerMsg.includes('validation') || lowerMsg.includes('schema') || lowerMsg.includes('invalid')) {
      return _messages.validation;
    }
    return _messages.server;
  }

  if (rawMessage && rawMessage.length > 0 && rawMessage.length < 120) return rawMessage;
  return customFallback || _messages.generic;
}

export function getApiErrorMessage(error, customFallback) {
  return getGenericErrorMessage(error, customFallback);
}

export function handleGlobalError(error, customFallback) {
  const safeMessage = getGenericErrorMessage(error, customFallback);
  const now = Date.now();
  const lastTime = recentToasts.get(safeMessage) || 0;
  if (now - lastTime < DEBOUNCE_TIME) return safeMessage;

  recentToasts.set(safeMessage, now);
  if (recentToasts.size > 20) {
    for (const [k, v] of recentToasts.entries()) {
      if (now - v > 10000) recentToasts.delete(k);
    }
  }

  toast.error(safeMessage, { id: safeMessage });
  return safeMessage;
}

export default handleGlobalError;
