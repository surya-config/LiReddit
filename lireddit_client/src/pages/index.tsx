import Navbar from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <>
      <Navbar />
      <div>Hello World</div>
      {data
        ? data.posts.map((post) => <div key={post.id}>{post.title}</div>)
        : null}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Index);
