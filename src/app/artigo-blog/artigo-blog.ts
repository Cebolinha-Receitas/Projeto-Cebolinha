import { Component, inject } from '@angular/core';
import { blogItems } from '../mocks/blog.mock';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [CommonModule],
  selector: 'app-artigo-blog',
  styleUrl: './artigo-blog.scss',
  templateUrl: './artigo-blog.html',
})
export class ArtigoBlog {
  private route = inject(ActivatedRoute);
  
}
