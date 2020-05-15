export class Profile {
    id?: string;
    slug: string;
    email: string;
    name: string;
    description?: string;
    twitterHandle?: string;
    profileImageUrl?: string;
    thumbnailImageUrl?: string;
    apiKey: string;
    firstName: string;
    lastName: string;
    emailNotificationOptions: number;
    hasSubscribed: boolean;
    subscriptionType: string;
    subscriptionValidUntil: Date;
    roles: string[];
    isFluent: boolean;
}
export class ProfileLimits {
    user: Profile;
    storageQuota: number;
    storageUsed: number;
}
