export interface CriminalReport {
  id?:number;
  author_id:number; 
  title:string;
  description:string;
  image_url:string;
  coordinate_x:string;
  coordinate_y:string;
  address:string; 
  category:string;
  crime_date:string;
  created_at?:string;
}