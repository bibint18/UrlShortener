// export interface Url{
//   id:string
//   originalUrl:string
//   shortId:string
//   clicks:number
//   createdAt:string
// }


export interface Url {
  id: string;
  originalUrl: string;
  shortId: string;
  clicks: number;
  createdAt: string;
}

export interface ShortenUrlRequest {
  originalUrl: string;
}

export interface ShortenUrlResponse {
  success: boolean;
  data: Url;
}

export interface GetUserUrlsResponse {
  success: boolean;
  data: Url[];
}

export interface RedirectUrlResponse {
  success: boolean;
  data: Url;
}