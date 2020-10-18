import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FeedbackFormat } from '../feedbackformat';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private infoservice: InfoService) { }

  feedbackFormat: FeedbackFormat;

  ngOnInit(): void {
    this.getFeedback();
  }

  getFeedback(): void {
    this.infoservice.getFeedback().subscribe(data => this.feedbackFormat = {
      name: (data as any).name,
      email: (data as any).email,
      feedback: (data as any).feedback,
      comment: (data as any).comment
    });
  }

  feedbackForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    feedback: new FormControl(),
    comment: new FormControl(),
  })

  onSubmit(): void {
    this.infoservice.postFeedback(this.feedbackFormat).subscribe(data => this.feedbackFormat = {
	  name: (data as any).name,
      email: (data as any).email,
      feedback: (data as any).feedback,
	  comment: (data as any).comment,
	});
  }

}
