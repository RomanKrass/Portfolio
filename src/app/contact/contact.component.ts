import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  message = '';

  onSubmit() {
    const email = 'roman.krass@students.bfh.ch';
    const subject = 'Contact from roman-krass.github.io';
    const body = `Message: ${this.message}`;
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }
}
