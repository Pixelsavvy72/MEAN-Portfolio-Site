import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = true;
  private authStatusSubscription: Subscription;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private authService: AuthService

            ) { }


    ngOnInit() {

      this.isLoggedIn = this.authService.getIsAuthenticated();
      this.authStatusSubscription = this.authService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.isLoggedIn = isAuthenticated;
        })
  }

  onAddImage() {
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onResetCategory() {
    this.categoryService.categorySelected.next('');
  }

  onLogout() {
    this.authService.logout();
  }

}
