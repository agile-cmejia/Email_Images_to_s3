import { Image } from './Image';

// Port interface for image storage
export interface ImageStorage {
  store(image: Image): Promise<string>;
}