import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  constructor() { }

  countTotalUserStatus(ativeUsers: string[], inactiveUsers: string[])
  {
    console.log('Number of Active Users: '+ativeUsers.length);
    console.log('Number of Inactive Users:'+inactiveUsers.length);
  }



}
