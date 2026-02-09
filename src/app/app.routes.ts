import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { HomeComponent } from './home/home';
import { CustomerComponent } from './customer/customer';
import { PolicyComponent } from './policy/policy';
import { PaymentComponent } from './payment/payment';
import { ClaimComponent } from './claim/claim';
import { CustomerPolicyComponent } from './customer-policy/customer-policy';

import { AuthGuard } from './auth/auth-guard';

export const routes: Routes = [

  // Default route
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login (no guard)
  { path: 'login', component: LoginComponent },

  // Protected routes
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
  { path: 'policy', component: PolicyComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'claim', component: ClaimComponent, canActivate: [AuthGuard] },
  { path: 'customer-policy', component: CustomerPolicyComponent, canActivate: [AuthGuard] },

  // Fallback
  { path: '**', redirectTo: 'login' }
];