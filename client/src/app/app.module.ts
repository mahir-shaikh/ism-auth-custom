import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ViewModule } from './views/views.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpWrapperService } from './services/http-wrapper.service';
import { SharedModule } from './shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HttpAuthenticationInterceptor } from './interceptors/authenticate.http.interceptor';
import { CommunicatorService } from './services/communicator.service';
import { AlertService } from './services/alert.service';
import { ProjectGuard } from './guards/project.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    ViewModule,
    SharedModule,
    ModalModule.forRoot()
  ],
  providers: [HttpWrapperService, AuthService, AuthGuard, CommunicatorService, AlertService, ProjectGuard,
    {provide: HTTP_INTERCEPTORS , useClass: HttpAuthenticationInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
