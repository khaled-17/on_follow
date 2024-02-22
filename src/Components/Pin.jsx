import React, { useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { AiTwotoneDelete } from "react-icons/ai";

import { fetchUser } from "../utils/fetchUser";

import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { client } from "../client";

export default function Pin({ pin }) {

  // console.log("🚀 ~ Pin ~ pin:", pin)
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  const userInfo = fetchUser();
  // console.log("🚀 ~ Pin ~ userInfo:", userInfo);

  let alreadySaved = pin?.save?.filter(
    (item) => item?.postedBy?._id === userInfo?.id
  );

  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  const savePin = (id) => {
    // console.log("🚀 ~ savePin ~ id:", id);
    if (alreadySaved?.length === 0) {
      setSavingPost(true);

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: userInfo?.id,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo?.id,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  const deletePin = (id) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className=" m-2 ">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`pin-details/${pin?._id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-2xl rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <img src={pin?.image.asset.url} alt="" />

        {postHovered && (
          <div
              className="absolute  top-0 w-full h-full flex flex-col justify-between p-1 p4-2 z-5 border "
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${pin?.image.asset.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-xl opacity-75 hover:opacity-100 hover:shadow-md "
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(pin?._id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  {pin?.save?.length} {savingPost ? "Saving" : "Save"}
                </button>
              )}
            </div>


          
            <div className=" flex justify-between items-center gap-2 w-full">
              {pin.destination?.slice(8).length > 0 ? (
                <a
                  href={pin.destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  {' '}
                  <BsFillArrowUpRightCircleFill />
                  {pin.destination?.slice(8, 17)}...
                </a>
              ) : undefined}
              {
           pin.postedBy?._id === userInfo?.id && (


            <button
             type="button"
             onClick={(e) => {
               e.stopPropagation();
               deletePin(pin._id);
             }}
             className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
           >
             <AiTwotoneDelete />
           </button>

            )
        }
            </div>




          </div>
            
        )}
      </div>

      <Link
        to={`/user-profile/${pin?.postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover  hover:rounded-lg"
          src={pin?.postedBy?.image}
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{pin?.postedBy?.userName}</p>
      </Link>
    </div>
  );
}
