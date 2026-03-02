import { BookDTO } from "../../api/types";
import { BookModel } from "../types";

function editFullName(fullName: string) {
  const s = fullName.trim();

  const m = s.match(/^(\S+)\s+([А-ЯЁA-Z])\.?\s*([А-ЯЁA-Z])\.?$/i);
  if (m) {
    const last = m[1];
    const i1 = m[2].toUpperCase();
    const i2 = m[3].toUpperCase();
    return `${last} ${i1}. ${i2}.`;
  }

  const parts = s.split(/\s+/);
  const last = parts[0] ?? "";
  const firstI = parts[1]?.charAt(0) ?? "";
  const middleI = parts[2]?.charAt(0) ?? "";

  return middleI
    ? `${last} ${firstI}. ${middleI}.`
    : `${last} ${firstI}.`;
}

export default function mapperBook(rowData?: BookDTO[]): BookModel[] {
    if (!rowData) return [];

    const books: BookModel[] = rowData.map((el) => (
        {
            id: el.id,
            name: el.name,
            autors: el.autors.map((el) => editFullName(el)),
        }
    ));

    return books;
}; 