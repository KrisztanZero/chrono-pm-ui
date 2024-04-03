import { Component, inject } from '@angular/core';
import { IAppDetails } from '../interface/appDetails';
import { AppDetailsService } from '../service/app-details.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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
