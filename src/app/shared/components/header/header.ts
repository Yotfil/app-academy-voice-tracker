import { Component, HostBinding, inject, effect } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { NAV_LINKS } from '../../../core/constants/navigation';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  /** Desktop: colapsado por defecto, se expande con hover */
  collapsed = true;
  /** Mobile: drawer abierto/cerrado con el botón */
  menuOpen = false;

  isMobile = toSignal(
    this.breakpointObserver.observe([Breakpoints.Handset]).pipe(map((state) => state.matches)),
    { initialValue: false }
  );

  private navEnd = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ),
    { initialValue: null }
  );

  navigationLinks = NAV_LINKS;

  @HostBinding('class.sidenav-collapsed') get isCollapsed(): boolean {
    return this.collapsed;
  }

  @HostBinding('class.is-mobile') get isMobileClass(): boolean {
    return this.isMobile() ?? false;
  }

  constructor() {
    effect(() => {
      if (!this.isMobile() || this.navEnd() !== null) {
        this.menuOpen = false;
      }
    });
  }

  onSidenavMouseEnter(): void {
    if (!this.isMobile()) {
      this.collapsed = false;
    }
  }

  onSidenavMouseLeave(): void {
    if (!this.isMobile()) {
      this.collapsed = true;
    }
  }

  toggleMobileMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMobileMenu(): void {
    this.menuOpen = false;
  }

  /** Mostrar texto de ítems: en desktop cuando expandido, en mobile cuando drawer abierto */
  get showNavLabels(): boolean {
    return this.isMobile() ? this.menuOpen : !this.collapsed;
  }
}
