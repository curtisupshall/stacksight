import type { DbConnection } from "../database/db";
import { BaseService } from "./base-service";
import { SoftwareOwnerRepository } from "../repositories/software-owner-repository";

export class SoftwareOwnerService {
    softwareOwnerRepository: SoftwareOwnerRepository;

    constructor(connection: DbConnection) {
        super(connection);

        this.softwareOwnerRepository = new SoftwareOwnerRepository(connection);
    }

    async listOwners() {
        return this.softwareOwnerRepository.listOwners();
    }
}
