import {
  ButtonHTMLAttributes,
  ChangeEvent,
  FormEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { RxAvatar } from "react-icons/rx";
import router from "next/router";
import { AiFillLike } from "react-icons/ai";
import { FaReply } from "react-icons/fa";
import LoadingSuspense from "@components/Loading/Loading";
import { fetchReviews } from "@utils/fetch";

const Comment = (props) => {
  const [comments, setComments] = useState([])
  const commentSum = comments.length
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  const handleCancle = () => {
    setIsFocused(false);
    setInputValue("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Comment Posted!");
    setIsFocused(false);
    setInputValue("");
  };

  const currentDateRef = useRef(new Date());
  const [currentDate, setCurrentDate] = useState(0);
  useEffect(() =>{
    const getReviews = async () =>{
      const res = await fetchReviews(props.id)
      setComments(await res.results)
    }
    getReviews()
  }, [props.id])
  useEffect(() => {
    const intervalId = setInterval(() => {
      currentDateRef.current = new Date();
      // setCurrentDate(currentDateRef.current.getHours());
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentDateRef.current.getSeconds()]);
  console.log(comments)
  console.log(currentDateRef.current);
  const getGapDate = (created_at: string) => {
    const arrDate = created_at.split("T");
    const yearModified = arrDate[0];
    const timeModified = arrDate[1].split(".")[0];
  };
  
  return (
    <>
      <div className="w-full m-auto p-8">
        <div>
          <div>
            <div className="text-white font-semibold text-lg my-8">
              <p>{commentSum} Comments</p>
            </div>
            <div className="w-full flex gap-4">
              <div className="flex-none w-12 h-12 rounded-full overflow-hidden">
                <RxAvatar style={{ width: "100%", height: "100%" }} />
              </div>
              <div className="flex-1 space-y-2 group" onClick={handleFocus}>
                <form onSubmit={handleSubmit} id="commentForm">
                  <textarea
                    onChange={handleInputChange}
                    value={inputValue}
                    itemType="text"
                    name="post"
                    placeholder="Add a comment..."
                    rows={2}
                    className="resize-none hover:resize-y w-full rounded-lg bg-white text-black p-2"
                  />
                </form>
                {isFocused ? (
                  <div className="float-right space-x-2 group-focus:block">
                    <button
                      form="commentForm"
                      onClick={handleCancle}
                      className="rounded-lg px-4 py-1 border border-white"
                    >
                      Cancel
                    </button>
                    <button
                      form="commentForm"
                      type="submit"
                      className="rounded-lg bg-white px-4 py-1 text-black hover:opacity-75"
                    >
                      Post
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div>
              <div className="my-8 space-y-8 divide-y">
                {comments.map((comment, index) => (
                  <div key={index}>
                    <div className="w-full pt-4 flex gap-4">
                      <div className="flex-none w-12 h-12 rounded-full overflow-hidden">
                        {comment.author_details.avatar_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/original${comment.author_details.avatar_path}`}
                            alt=""
                          />
                        ) : (
                          <RxAvatar style={{ width: "100%", height: "100%" }} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="space-y-2">
                          <div>
                            <h1 className="font-semibold">
                              {comment.author} <span> -{currentDateRef.current.getSeconds()}</span>
                            </h1>
                          </div>
                          <div>
                            <p className="opacity-75 line-clamp-4">
                              {comment.content}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button className="flex gap-2 items-center">
                              <AiFillLike />
                              <p>Like</p>
                            </button>
                            <button className="flex gap-2 items-center">
                              <FaReply />
                              <p>Reply</p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
