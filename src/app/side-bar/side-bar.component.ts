import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  items!: MenuItem[];

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Practice',
        items: [
          {
            label: 'Practices',
            routerLink: 'practice'
          },
          {
            label: 'Sub Practices',
            routerLink: 'subPractice'
          },
          {
            label: 'Practice Category',
            routerLink: 'practiceCategory'
          },
          {
            label: 'Practice Template',
            routerLink: 'practiceTemplate'
          },
          {
            label: 'Logout',
            routerLink: 'login'
          },
        ]
      }
    ]
  }


  
}
