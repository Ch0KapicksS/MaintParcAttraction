import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataService } from './data.service';
import { ReviewInterface } from '../Interface/review.interface';
import { MessageInterface } from '../Interface/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {

  constructor(private dataService: DataService) {

  }

  public getAllReview() : Observable<ReviewInterface[]> {
    const url = "http://127.0.0.1:5000/review"
    const data = this.dataService.getData(url);
    return data as Observable<ReviewInterface[]>;
  }

  public postReview(review: ReviewInterface): Observable<MessageInterface> {
    const url = "http://127.0.0.1:5000/review";
    const data = this.dataService.postData(url, review);
    return data as Observable<MessageInterface>;
  }
}