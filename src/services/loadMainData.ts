import axios from "axios";

import { HYG_GQL } from "../const";

export const loadMainData = async () => {
  return axios({
    url: HYG_GQL,
    method: "post",
    data: {
      query: `
        {
          projects(first: 50, orderBy: date_DESC) {
            id
            agency
            brand
            title
            type
            info {
              html
            }
            thumb {
              url(transformation: {document: {output: {format: jpg}}})
              fileName
            }
            view {
              ... on Video {
                width
                height
                type
                video {
                  url
                }
                poster {
                  url(transformation: {document: {output: {format: jpg}}})
                }
              }
              ... on Iframe {
                height
                type
                url
                width
              }
              ... on Gallery {
                width
                type
                height
                gallery {
                  url(transformation: {document: {output: {format: jpg}}})
                }
              }
            }
          }
        }
      `,
    },
  }).then((res) => {
    return res.data;
  });
};
