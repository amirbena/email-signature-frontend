import { Types } from "mongoose";
import { TemplateDocument } from "../../network/dto/models/Template";

export interface TemplateShowingProps {
    selectedTemplateId?: Types.ObjectId;
    template: TemplateDocument;
    selectTemplate: (templateId: Types.ObjectId) => void;
    error: boolean;
}