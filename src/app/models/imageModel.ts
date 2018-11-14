import { Categories } from '../enums/categories';

export class ImageFE {

  constructor (
    public id: string,
    public imageOrder: number,
    public imageName: string,
    public imageDesc: string,
    // public imageCat: Categories,
    public imageCat: string,
    public imageUrl: string,
    public thumbnailUrl?: string

  ) {}


}
