export interface ListEventsFilter {
  type : 'upcoming' | 'past' | 'highlighted'| 'all';
  page : number;               // 1-based
  perPage: number;             // 20
}