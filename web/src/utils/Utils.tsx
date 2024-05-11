import { ISoftwareProject, SoftwareProjectStatus } from "../types/software-project";


export const getProjectStatus = (project: ISoftwareProject): SoftwareProjectStatus => {
    let status: SoftwareProjectStatus = 'UNKNOWN';

    if (project.last_scan_dispatched_at) {
        status = 'PENDING'
    }

    if (project.last_scan_completed_at) {
        status = 'SUCCEEDED'
    }

    if (project.last_scan_aborted_at) {
        status = 'FAILED'
    }

    return status;
}
