import { ProfileModel } from 'app/models/profile.model';

export class ProfileLimitsModel {
    user: ProfileModel;
    storageQuota: number;
    storageUsed: number;
}
