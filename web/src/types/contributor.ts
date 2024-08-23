import { ProjectScanContributor } from "@/database/schemas";
import { InferSelectModel } from "drizzle-orm";

export type ProjectScanContributorRecord = InferSelectModel<typeof ProjectScanContributor>;
