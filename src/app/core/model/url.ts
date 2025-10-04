import { v4 as uuid } from "uuid";

export class Url {

      id!: string;
      originalUrl!: string;
      shortenedUrl!: string;

      constructor(data: any) {

            if(data) {
                  this.id = data.id;
                  this.originalUrl = data.originalUrl;
                  this.shortenedUrl = data.shortenedUrl;
            }
      }
}