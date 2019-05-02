export class Profile {
    id?: string;
    slug: string;
    email: string;
    name: string;
    description?: string;
    profileImage?: string;
    apiKey: string;
    firstName: string;
    lastName: string;

    hasSubscribed: boolean;
    subscriptionType: string;
    subscriptionValidUntil: Date;
}
export class ProfileLimits {
    user: Profile;
    storageQuota: number;
    storageUsed: number;
}
