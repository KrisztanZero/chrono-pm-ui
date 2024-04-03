import { Injectable } from '@angular/core';
import { IIssue } from '../interface/issue';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  url = 'http://localhost:5221/api/issue';
  token = '';

  async getAllIssues(): Promise<IIssue[]> {
    try {
      const data = await fetch(this.url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      if (!data.ok) {
        throw new Error(`Failed to fetch issues: ${data.statusText}`);
      }
      return (await data.json()) ?? [];
    } catch (error) {
      console.error('Error fetching issues:', error);
      return [];
    }
  }
  async getIssueById(id: string): Promise<IIssue | undefined> {
    const data = await fetch(`${this.url}/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return (await data.json()) ?? {};
  }

  async getIssueTitleById(id: string): Promise<string>{
    const issue = await this.getIssueById(id);
    return issue?.title ?? '';
  }
}
