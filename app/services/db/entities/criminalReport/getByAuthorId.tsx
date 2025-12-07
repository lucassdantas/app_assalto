import { database } from "@/app/services/db/client";
import { CriminalReport } from "@/app/services/db/entities/criminalReport/interface";

type GetByAuthorIdProps = {
  authorId:string
  order?:string;
  ascending?:boolean;
}
export default async function getByAuthorId({authorId, order='created_at', ascending=false}:GetByAuthorIdProps): Promise<CriminalReport[]> {
  const { data, error } = await database
    .from("criminal_reports")
    .select("*")
    .eq('author_id', authorId)
    .order(order,{ ascending: ascending });

  if (error) {
    console.error(error);
    return [];
  }

  return data as CriminalReport[];
}


