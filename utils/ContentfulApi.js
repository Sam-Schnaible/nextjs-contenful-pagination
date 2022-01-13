// /utils/ContentfulApi.js
import { Config } from "./Config";


export default class ContentfulApi {

  static async callContentful(query) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json(),
      );
      return data;
    } catch (error) {
      throw new Error("Could not fetch data from Contentful!");
    }
  }

  static async getTotalPostsNumber() {
    // Build the query
    const query = `
      {
        blogPostCollection {
          total
        }
      }
    `;

    // Call out to the API
    const response = await this.callContentful(query);
    const totalPosts = response.data.blogPostCollection.total
      ? response.data.blogPostCollection.total
      : 0;

    return totalPosts;
  }

  static async getPaginatedPostSummaries(page) {
    const skipMultiplier = page === 1 ? 0 : page - 1;
    const skip =
      skipMultiplier > 0 ? Config.pagination.pageSize * skipMultiplier : 0;

    const query = `{
        blogPostCollection(limit: ${Config.pagination.pageSize}, skip: ${skip}, order: date_DESC) {
          total
          items {
            sys {
              id
            }
            date
            title
            slug
            excerpt
            tags
          }
        }
      }`;

    // Call out to the API
    const response = await this.callContentful(query);

    const paginatedPostSummaries = response.data.blogPostCollection
      ? response.data.blogPostCollection
      : { total: 0, items: [] };

    return paginatedPostSummaries;
  }
}