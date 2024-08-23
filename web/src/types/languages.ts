import { ProjectLanguage } from "@/database/schemas";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type ProjectScanLanguageRecord = InferSelectModel<typeof ProjectLanguage>;
export type CreateProjectScanLanguageRecord = InferInsertModel<typeof ProjectLanguage>;
