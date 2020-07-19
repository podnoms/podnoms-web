export interface Subscription {
    previouslySubscribed: boolean;
    subscriptionValid: boolean;
    subscriptionType: string;
    subscriptionExpires: Date;
}
