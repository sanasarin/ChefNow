import { useState, useEffect } from "react";
import axios from "axios";
import { RECIPE_COMMENTS_ENDPOINT } from "../../config/constants";
import CustomCard from "../shared/CustomCard";
import CommentsPost from "./CommentsPost";
import CommentsView from "./CommentsView";
import { Button } from "primereact/button";

// note created_after means created_before, but im too lazy to change it
function Comments({ recipe_id }) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastFetchedCommentTimestamp, setLastFetchedCommentTimestamp] =
    useState(null);

  const fetchComments = async (page, created_after = null) => {
    setLoading(true);
    try {
      let url = `${RECIPE_COMMENTS_ENDPOINT(recipe_id)}?page=${page}`;
      if (created_after) {
        url += `&created_after=${encodeURIComponent(created_after)}`;
      }
      const response = await axios.get(url);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(1).then((data) => {
      if (data) {
        setComments(data);
        if (data.results.length > 0 && lastFetchedCommentTimestamp === null) {
          setLastFetchedCommentTimestamp(data.results.slice(0)[0].date_created);
        }
      }
    });
  }, [recipe_id]);

  const loadMore = async () => {
    const nextPage = page + 1;
    const response = await fetchComments(nextPage, lastFetchedCommentTimestamp);
    if (response && response.results) {
      setComments((prevComments) => ({
        ...response,
        results: [...prevComments.results, ...response.results],
      }));
      setPage(nextPage);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (comments && comments.results.length === 0) {
    return (
      <CustomCard>
        <CommentsPost
          setComments={setComments}
          recipe_id={recipe_id}
          comments={comments}
        />
        <p className="text-center">No comments yet.</p>
      </CustomCard>
    );
  }

  return (
    <CustomCard>
      <>
        <CommentsPost
          setComments={setComments}
          recipe_id={recipe_id}
          comments={comments}
        />
        <CommentsView comments={comments} setComments={setComments} />
        {comments && comments.next && (
          <Button className="d-block m-auto mb-4 force-font" onClick={loadMore}>
            Load more
          </Button>
        )}
      </>
    </CustomCard>
  );
}

export default Comments;
