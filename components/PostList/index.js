// /components/PostList/index.js

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import ReactMarkdownRenderers from "@utils/ReactMarkdownRenderers";
import {
  formatPublishedDateForDateTime,
  formatPublishedDateForDisplay,
} from "@utils/Date";
import Pagination from "@components/PostList/Pagination";

export default function PostList(props) {

  const { posts, currentPage, totalPages } = props;

  const nextDisabled = parseInt(currentPage, 10) === parseInt(totalPages, 10);
  const prevDisabled = parseInt(currentPage, 10) === 1;

  return (
      <ol>
        {posts.map((post) => (
          <li key={post.sys.id}>
            <article>
              <time dateTime={formatPublishedDateForDateTime(post.date)}>
                {formatPublishedDateForDisplay(post.date)}
              </time>

              <Link href={`blog/${post.slug}`}>
                <a>
                  <h2>{post.title}</h2>
                </a>
              </Link>

              <ul>
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              <ReactMarkdown
                children={post.excerpt}
                renderers={ReactMarkdownRenderers(post.excerpt)}
              />
            </article>
          </li>
        ))}
        <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        nextDisabled={nextDisabled}
        prevDisabled={prevDisabled}
      />
      </ol>
  );
}