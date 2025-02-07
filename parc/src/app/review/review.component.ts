import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ReviewInterface } from '../Interface/review.interface';
import { ReviewService } from '../Service/review.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatButtonModule, MatCardModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {

  public formulaireReviews: FormGroup[] = [];

  constructor(public reviewService: ReviewService, public formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }

  public reviews: Observable<ReviewInterface[]> = this.reviewService.getAllReview().pipe(tap((reviews: ReviewInterface[]) => {
    reviews.forEach(review => {
      this.formulaireReviews.push(
        new FormGroup({
          review_id: new FormControl(review.review_id),
          nom: new FormControl(review.nom, [Validators.required]),
          prenom: new FormControl(review.prenom, [Validators.required]),
          texte: new FormControl(review.texte, [Validators.required]),
          note: new FormControl(review.note),
          visible: new FormControl(review.isAnonym)
        })
      );
    });
  }));

  public formulaireDisabled: { [key: number]: boolean } = {};

  public onSubmit(reviewFormulaire: FormGroup, index: number): void {
    console.log(reviewFormulaire);
    this.reviewService.postReview(reviewFormulaire.getRawValue()).subscribe(result => {
      reviewFormulaire.patchValue({ review_id: result.result });
      this._snackBar.open(result.message, undefined, {
        duration: 1000
      });
      reviewFormulaire.disable();
      this.formulaireDisabled[index] = true;
    }, error => {
      this._snackBar.open("Erreur lors de l'enregistrement de la critique", undefined, { duration: 2000 });
    });
  }


  public addReview() {
    this.formulaireReviews.push(
      new FormGroup({
        review_id: new FormControl(),
        nom: new FormControl("", [Validators.required]),
        prenom: new FormControl("", [Validators.required]),
        texte: new FormControl("", [Validators.required]),
        note: new FormControl(),
        isAnonym: new FormControl(true)
      })
    );
  }
}
