import { Component, Input, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { LayoutService } from '../../services/layout.service';
import { ConfigService } from '../../config/config.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { PopoverService } from '../../components/popover/popover.service';
import { Observable, of } from 'rxjs';
import { UserMenuComponent } from '../../components/user-menu/user-menu.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchModalComponent } from '../../components/search-modal/search-modal.component';
import { ProjectsService } from 'src/app/layout/projects/service/projects.service';

@Component({
  selector: 'vex-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() collapsed: boolean;
  collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
  title$ = this.configService.config$.pipe(map(config => config.sidenav.title));
  imageUrl$ = this.configService.config$.pipe(map(config => config.sidenav.imageUrl));
  showCollapsePin$ = this.configService.config$.pipe(map(config => config.sidenav.showCollapsePin));

  userMenuOpen$: Observable<boolean> = of(false);

  projects$ = this.projectsService.projects$;
  projectsOpen = true;

  constructor(
    private navigationService: NavigationService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private readonly popoverService: PopoverService,
    private readonly dialog: MatDialog,
    private readonly projectsService: ProjectsService
  ) {}

  ngOnInit() {}

  collapseOpenSidenav() {
    this.layoutService.collapseOpenSidenav();
  }

  collapseCloseSidenav() {
    this.layoutService.collapseCloseSidenav();
  }

  toggleCollapse() {
    this.collapsed ? this.layoutService.expandSidenav() : this.layoutService.collapseSidenav();
  }

  openProfileMenu(origin: HTMLDivElement): void {
    this.userMenuOpen$ = of(
      this.popoverService.open({
        content: UserMenuComponent,
        origin,
        offsetY: -8,
        width: origin.clientWidth,
        position: [
          {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom'
          }
        ]
      })
    ).pipe(
      switchMap(popoverRef => popoverRef.afterClosed$.pipe(map(() => false))),
      startWith(true),
    );
  }

  openSearch(): void {
    this.dialog.open(SearchModalComponent, {
      panelClass: 'vex-dialog-glossy',
      width: '100%',
      maxWidth: '600px'
    });
  }
}
