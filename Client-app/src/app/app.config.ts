import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [  provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),  
     provideAnimationsAsync(),
    provideHttpClient(withInterceptors([loadingInterceptor]))
                        
  ]
 
};