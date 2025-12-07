import { database } from "@/app/services/db/client";
import { CriminalReport } from "@/app/services/db/entities/criminalReport/interface";

export default async function insertCriminalReport(data: CriminalReport) {
  const { error } = await database.from("criminal_reports").insert({
    title: data.title,
    address: data.address,
    description: data.description,
    image_url: data.image_url,
    author_id: data.author_id,
    category: data.category,
    crime_date: data.crime_date,
    coordinate_x: data.coordinate_x ?? null,
    coordinate_y: data.coordinate_y ?? null,
  });

  if (error) throw error;
}
