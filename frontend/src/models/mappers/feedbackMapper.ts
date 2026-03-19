import { FeedbackDTO } from "../../api/types";
import { FeedbackModel } from "../types";

export default function mapperFeedbacks(rowData?: FeedbackDTO[]): FeedbackModel[] {
    if (!rowData) return [];

    const feedbacks = rowData.map((el) => ({
        id: el.id,
        text: el.text,
        autor: el.autor,
        grade: el.grade,
        isPersonal: el.isPersonal,
    }))

    return feedbacks;
};