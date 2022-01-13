// /pages/blog/index.js

import ContentfulApi from "@utils/ContentfulApi";
import { Config } from "@utils/Config";

export default function BlogIndex(props) {
  const { postSummaries, currentPage, totalPages } = props;

  return (
    // We’ll build the post list component later
  );
}

export async function getStaticProps() {
  const postSummaries = await ContentfulApi.getPaginatedPostSummaries(1);
  const totalPages = Math.ceil(postSummaries.total / Config.pagination.pageSize);

  return {
    props: {
      postSummaries: postSummaries.items,
      totalPages,
      currentPage: "1",
    },
  };
}