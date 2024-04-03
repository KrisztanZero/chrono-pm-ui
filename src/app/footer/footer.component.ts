import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { IAppDetails } from '../interface/appDetails';
import { AppDetailsService } from '../service/app-details.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  appDetails: IAppDetails | undefined;
  appDetailsService: AppDetailsService = inject(AppDetailsService);


  constructor() {
    this.appDetailsService
      .getAllAppDetails()
      .then((appDetailsList: IAppDetails[]) => {
        appDetailsList.sort((a, b) => {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        });

        this.appDetails = appDetailsList[0];
      });
  }
}
