import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.css'
})
export class ToasterComponent  implements OnInit{
  @Input() message!: string;
  @Input() type: 'success' | 'danger' = 'success';
  ngOnInit(): void {
    
    this.hideMessageAfterDelay(3000);
  }
  hideMessageAfterDelay(delay: number) {
    setTimeout(() => {
      this.message = '';
    }, delay);
  }

}
