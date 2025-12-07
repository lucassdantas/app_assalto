import { database } from "@/app/services/db/client";
import { CriminalReport } from "@/app/services/db/entities/criminalReport/interface";

type GetAllProps = {
  order?:string;
  ascending?:boolean;
}
export default async function getAll({order='created_at', ascending=false}:GetAllProps={}): Promise<CriminalReport[]> {
  const { data, error } = await database
    .from("reports")
    .select("*")
    .order(order,{ ascending: ascending });

  if (error) {
    console.error(error);
    return [];
  }

  return data as CriminalReport[];
}


