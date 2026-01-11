import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Only attach token for API calls
  const apiBaseUrl = environment.apiBaseUrl.replace(/\/$/, '');
  const isApiCall = (() => {
    // Absolute URLs (e.g. https://localhost:7028/api/...)
    if (req.url.startsWith('http://') || req.url.startsWith('https://')) {
      try {
        const url = new URL(req.url);
        return url.pathname === '/api' || url.pathname.startsWith('/api/');
      } catch {
        // Fall through to string checks
      }
    }

    // Relative URLs (e.g. /api/...)
    return (
      req.url === '/api' ||
      req.url.startsWith('/api/') ||
      req.url.startsWith(apiBaseUrl)
    );
  })();
  if (!token || !isApiCall) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};
