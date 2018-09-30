export class Category {

    constructor(id: string) {
        this.id = id;
    }
    public id: string;
    public description: string;
    public subCategories: Subcategory[];
}
export class Subcategory {
    public id: string;
    public description: string;
}
