import axios from "axios";
import RedMark from "./RedMark";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { FC, useEffect, useState } from "react";

type props = {
  setIsPopupOpen: any;
  id: string | undefined;
  setComments: any;
  comments: any;
};

const CommentPopup: FC<props> = ({
  setIsPopupOpen,
  id,
  setComments,
}) => {
  const { toast } = useToast();

  const [rating, setRating] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 4000);
  }, [error]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name) {
      setError("Error: Please enter your name");
      return;
    }
    if (!rating) {
      setError("Error: Rating is required");
      return;
    }
    if (!comment) {
      setError("Error: Please give comment");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/post-comment/${id}`,
        { name, comment, rating }
      );
      toast({
        style: { backgroundColor: "#4CAF50", color: "#fff" },
        description:
          "Thank you for your feedback! Your comment has been successfully submitted.",
      });
      setIsPopupOpen(false);
      if (response.data && response.data.comment) {
        setComments((prevComments: any) => [
          ...prevComments,
          response.data.comment,
        ]);
      }
    } catch (err: any) {
      if (err.response) {
        setError(err?.response.data.message || "An error occurred");
      } else {
        setError(err.message || "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[50]">
      <div className="fixed inset-0 flex justify-center items-center bg-[#0000004d] z-[51]">
        <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-md w-full z-[52]">
          <button
            className="absolute text-[red] font-[600] text-[30px] mr-4 top-2 right-2 hover:text-[#ed7979]"
            onClick={() => setIsPopupOpen(false)}
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold mb-4">Leave a Comment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex justify-center flex-col">
              <label className=" text-gray-700 font-bold mb-2">
                Rating:
                <RedMark />
              </label>
              <Rating rating={rating} onRatingChange={handleRatingChange} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-bold">
                Username:
                <RedMark />
              </label>
              <input
                type="text"
                value={name}
                placeholder="Enter you name ..."
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="font-bold block text-gray-700 mb-2">
                Comment:
                <RedMark />
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                rows={4}
                required
                placeholder="Share your thoughts ... "
              ></textarea>
            </div>
            <div className="text-[red] h-[25px] font-bold w-full flex mb-2 justify-center">
              {error && error}
            </div>
            <div className="flex justify-center">
              {loading ? (
                <Button disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-blue-500  text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const Rating = ({
  rating,
  onRatingChange,
}: {
  rating: any;
  onRatingChange: any;
}) => {
  const handleClick = (index: any) => {
    onRatingChange(index + 1);
  };

  return (
    <div className="flex justify-center">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleClick(index)}
          className={`cursor-pointer text-[70px] h-[60px] flex justify-center items-center mx-1 ${
            index < rating
              ? "bg-clip-text text-transparent bg-gradient-to-r from-[#ef7b4d] via-yellow-300 to-[yellow]"
              : "text-gray-300"
          } `}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default CommentPopup;
