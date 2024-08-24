import { ProjectScanContributor } from "@/database/schemas";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type ProjectScanContributorRecord = InferSelectModel<typeof ProjectScanContributor>;
export type CreateProjectScanContributorRecord = InferInsertModel<typeof ProjectScanContributor>;
